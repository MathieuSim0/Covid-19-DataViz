const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Service pour extraire et traiter les données COVID-19 par pays
 */
class CountryDataService {
  constructor() {
    this.basePath = path.resolve(__dirname, '../../../../COVID-19-master/archived_data/archived_time_series');
    this.confirmedPath = path.join(this.basePath, 'time_series_19-covid-Confirmed_archived_0325.csv');
    this.deathsPath = path.join(this.basePath, 'time_series_19-covid-Deaths_archived_0325.csv');
    this.recoveredPath = path.join(this.basePath, 'time_series_19-covid-Recovered_archived_0325.csv');
    
    this.cachedData = {
      confirmed: null,
      deaths: null,
      recovered: null
    };
  }

  /**
   * Charge les données d'un fichier CSV
   * @param {string} filePath - Chemin vers le fichier CSV
   * @returns {Promise<Array>} Données du CSV
   */
  loadDataFromFile(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  /**
   * Charge et met en cache toutes les données CSV pour les cas confirmés, décès et récupérés
   * @returns {Promise<Object>} Toutes les données du CSV par type
   */
  async loadAllData() {
    // Si les données sont déjà en cache, les retourner
    if (this.cachedData.confirmed && this.cachedData.deaths && this.cachedData.recovered) {
      return this.cachedData;
    }

    try {
      // Charger les données en parallèle pour une meilleure performance
      const [confirmedData, deathsData, recoveredData] = await Promise.all([
        this.cachedData.confirmed || this.loadDataFromFile(this.confirmedPath),
        this.cachedData.deaths || this.loadDataFromFile(this.deathsPath),
        this.cachedData.recovered || this.loadDataFromFile(this.recoveredPath)
      ]);

      // Mettre en cache les données
      this.cachedData = {
        confirmed: confirmedData,
        deaths: deathsData,
        recovered: recoveredData
      };

      return this.cachedData;
    } catch (error) {
      console.error('Error loading COVID data:', error);
      throw error;
    }
  }

  /**
   * Obtient les données pour un pays spécifique
   * @param {string} country - Nom du pays à filtrer
   * @returns {Promise<Object>} Données formatées pour le pays
   */
  async getCountryData(country) {
    try {
      const allData = await this.loadAllData();
      
      // Cas spécial pour les données globales
      if (country === 'Global') {
        return this.calculateGlobalData(allData);
      }

      // Filtrer les données pour le pays spécifié dans chaque jeu de données
      const confirmedData = allData.confirmed.filter(row => row['Country/Region'] === country);
      const deathsData = allData.deaths.filter(row => row['Country/Region'] === country);
      const recoveredData = allData.recovered.filter(row => row['Country/Region'] === country);
      
      if (confirmedData.length === 0) {
        throw new Error(`No data found for country: ${country}`);
      }

      // Traiter les données pour obtenir les totaux et l'évolution
      return this.processCountryData(country, confirmedData, deathsData, recoveredData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Calcule les données globales en agrégeant tous les pays
   * @param {Object} allData - Toutes les données du CSV (confirmed, deaths, recovered)
   * @returns {Object} Données globales formatées
   */
  calculateGlobalData(allData) {
    // Obtenir les données globales pour chaque type de données
    const confirmedGlobal = this.aggregateGlobalData(allData.confirmed);
    const deathsGlobal = this.aggregateGlobalData(allData.deaths);
    const recoveredGlobal = this.aggregateGlobalData(allData.recovered);
    
    // Calculer les cas actifs (confirmés - (décès + récupérés))
    const activeGlobal = {
      latest: confirmedGlobal.latest - (deathsGlobal.latest + recoveredGlobal.latest),
      newCases: confirmedGlobal.newCases - (deathsGlobal.newCases + recoveredGlobal.newCases)
    };
    
    return {
      name: 'Global',
      confirmed: confirmedGlobal.latest,
      newConfirmed: confirmedGlobal.newCases,
      deaths: deathsGlobal.latest,
      newDeaths: deathsGlobal.newCases,
      recovered: recoveredGlobal.latest,
      newRecovered: recoveredGlobal.newCases,
      active: activeGlobal.latest,
      newActive: activeGlobal.newCases,
      timeseries: {
        confirmed: confirmedGlobal.timeseries,
        deaths: deathsGlobal.timeseries,
        recovered: recoveredGlobal.timeseries
      }
    };
  }

  /**
   * Agrège les données globales pour un type spécifique (confirmés, décès, récupérés)
   * @param {Array} data - Données à agréger
   * @returns {Object} Données agrégées
   */
  aggregateGlobalData(data) {
    // Obtenir les dates (colonnes) à partir des en-têtes
    const headers = Object.keys(data[0]);
    const dateCols = headers.filter(header => 
      /\d+\/\d+\/\d+/.test(header)  // Filtrer les colonnes qui sont des dates (format MM/DD/YY)
    );
    
    // Initialiser les compteurs pour chaque date
    const dailyTotals = {};
    dateCols.forEach(date => {
      dailyTotals[date] = 0;
    });
    
    // Additionner les cas pour chaque date
    data.forEach(row => {
      dateCols.forEach(date => {
        dailyTotals[date] += parseInt(row[date] || 0, 10);
      });
    });
    
    // Convertir en format de série temporelle
    const timeseriesData = dateCols.map(date => ({
      date: this.formatDate(date),
      value: dailyTotals[date]
    }));
    
    // Calculer les métriques actuelles
    const lastDate = dateCols[dateCols.length - 1];
    const prevDate = dateCols[dateCols.length - 2];
    
    return {
      latest: dailyTotals[lastDate],
      newCases: dailyTotals[lastDate] - dailyTotals[prevDate],
      timeseries: timeseriesData
    };
  }

  /**
   * Traite les données d'un pays pour obtenir les métriques
   * @param {string} country - Nom du pays
   * @param {Array} confirmedData - Données de cas confirmés pour le pays
   * @param {Array} deathsData - Données de décès pour le pays
   * @param {Array} recoveredData - Données de cas récupérés pour le pays
   * @returns {Object} Données formatées du pays
   */
  processCountryData(country, confirmedData, deathsData, recoveredData) {
    // Traiter chaque type de données séparément
    const confirmed = this.aggregateCountryData(confirmedData);
    const deaths = this.aggregateCountryData(deathsData);
    const recovered = this.aggregateCountryData(recoveredData);
    
    // Calculer les cas actifs (confirmés - (décès + récupérés))
    const active = {
      latest: confirmed.latest - (deaths.latest + recovered.latest),
      newCases: confirmed.newCases - (deaths.newCases + recovered.newCases)
    };
    
    return {
      name: country,
      confirmed: confirmed.latest,
      newConfirmed: confirmed.newCases,
      deaths: deaths.latest,
      newDeaths: deaths.newCases,
      recovered: recovered.latest,
      newRecovered: recovered.newCases,
      active: active.latest,
      newActive: active.newCases,
      timeseries: {
        confirmed: confirmed.timeseries,
        deaths: deaths.timeseries,
        recovered: recovered.timeseries
      }
    };
  }

  /**
   * Agrège les données d'un pays pour un type spécifique (confirmés, décès, récupérés)
   * @param {Array} countryData - Données filtrées pour un pays
   * @returns {Object} Données agrégées
   */
  aggregateCountryData(countryData) {
    // Si pas de données, retourner des valeurs par défaut
    if (!countryData || countryData.length === 0) {
      return { latest: 0, newCases: 0, timeseries: [] };
    }
    
    // Obtenir les colonnes de dates
    const headers = Object.keys(countryData[0]);
    const dateCols = headers.filter(header => 
      /\d+\/\d+\/\d+/.test(header)
    );
    
    // Pour les pays avec plusieurs provinces/états, nous devons les additionner
    const dailyTotals = {};
    dateCols.forEach(date => {
      dailyTotals[date] = 0;
    });
    
    // Additionner les cas pour chaque date et province
    countryData.forEach(row => {
      dateCols.forEach(date => {
        dailyTotals[date] += parseInt(row[date] || 0, 10);
      });
    });
    
    // Convertir en format de série temporelle
    const timeseriesData = dateCols.map(date => ({
      date: this.formatDate(date),
      value: dailyTotals[date]
    }));
    
    // Calculer les métriques actuelles
    const lastDate = dateCols[dateCols.length - 1];
    const prevDate = dateCols[dateCols.length - 2] || lastDate;
    
    return {
      latest: dailyTotals[lastDate],
      newCases: dailyTotals[lastDate] - dailyTotals[prevDate],
      timeseries: timeseriesData
    };
  }

  /**
   * Formate une date du format MM/DD/YY en YYYY-MM-DD
   * @param {string} dateStr - Date au format MM/DD/YY
   * @returns {string} Date au format YYYY-MM-DD
   */
  formatDate(dateStr) {
    const [month, day, yearShort] = dateStr.split('/');
    const year = parseInt(yearShort) < 50 ? `20${yearShort}` : `19${yearShort}`;
    
    // Ajouter des zéros au début si nécessaire
    const monthPadded = month.padStart(2, '0');
    const dayPadded = day.padStart(2, '0');
    
    return `${year}-${monthPadded}-${dayPadded}`;
  }
}

module.exports = new CountryDataService();