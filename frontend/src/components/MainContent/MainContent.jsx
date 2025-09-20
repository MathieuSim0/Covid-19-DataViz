import { useState, useEffect } from 'react';
import './MainContent.css';
import GlobalStats from '../GlobalStats';
import CountrySelector from '../CountrySelector';
import { fetchCountries, fetchCountryData, formatNumber } from '../../utils/dataUtils';

function MainContent({ style }) {
  const [covidData, setCovidData] = useState({
    confirmed: 0,
    newConfirmed: 0,
    deaths: 0,
    newDeaths: 0,
    recovered: 0,
    newRecovered: 0,
    active: 0,
    newActive: 0
  });
  
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [countries, setCountries] = useState(['Global']);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [chartData, setChartData] = useState(null);
  
  // Charger la liste des pays
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setIsLoading(true);
        const countriesList = await fetchCountries();
        setCountries(countriesList);
        setError(null);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCountries();
  }, []);
  
  // Charger les données du pays sélectionné
  useEffect(() => {
    const loadCountryData = async () => {
      if (!selectedCountry) return;
      
      try {
        setIsDataLoading(true);
        setDataError(null); // Réinitialiser l'erreur à chaque nouvelle requête
        
        const data = await fetchCountryData(selectedCountry);
        
        // Mettre à jour les données avec les valeurs reçues
        setCovidData({
          confirmed: data.confirmed || 0,
          newConfirmed: data.newConfirmed || 0,
          deaths: data.deaths || 0,
          newDeaths: data.newDeaths || 0,
          recovered: data.recovered || 0,
          newRecovered: data.newRecovered || 0,
          active: data.active || 0,
          newActive: data.newActive || 0,
          countryName: data.name || selectedCountry
        });
        
        if (data.timeseries) {
          setChartData(data.timeseries);
        }
      } catch (err) {
        console.error(`Error fetching data for ${selectedCountry}:`, err);
        setDataError(`Failed to load data for ${selectedCountry}. Please try again later.`);
      } finally {
        setIsDataLoading(false);
      }
    };
    
    loadCountryData();
  }, [selectedCountry]);
  
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <main className="main-content" style={style}>
      <div className="main-container">
        {/* Dashboard Title - Updates with selected country */}
        <h1 className="page-title">
          {selectedCountry === 'Global' 
            ? 'COVID-19 Global Dashboard' 
            : `COVID-19 Dashboard: ${selectedCountry}`}
        </h1>
        
        {selectedCountry === 'Global' && <GlobalStats />}
        
        {/* Country selector */}
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={handleCountrySelect}
          isLoading={isLoading}
          error={error}
        />
        
        {/* Stats cards */}
        <div className="stats-grid">
          {dataError && (
            <div className="data-error-message">{dataError}</div>
          )}
          
          {isDataLoading ? (
            <div className="data-loading">Loading country data...</div>
          ) : (
            <>
              <div className="card confirmed">
                <h3>Confirmed</h3>
                <div className="stats-value">
                  {formatNumber(covidData.confirmed)}
                </div>
                <div className="stats-change confirmed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z"/>
                  </svg>
                  <span>+{formatNumber(covidData.newConfirmed)} new</span>
                </div>
              </div>
              
              <div className="card active">
                <h3>Active</h3>
                <div className="stats-value">
                  {formatNumber(covidData.active)}
                </div>
                <div className="stats-change active">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z"/>
                  </svg>
                  <span>+{formatNumber(covidData.newActive)} new</span>
                </div>
              </div>
              
              <div className="card recovered">
                <h3>Recovered</h3>
                <div className="stats-value">
                  {formatNumber(covidData.recovered)}
                </div>
                <div className="stats-change recovered">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z"/>
                  </svg>
                  <span>+{formatNumber(covidData.newRecovered)} new</span>
                </div>
              </div>
              
              <div className="card deaths">
                <h3>Deaths</h3>
                <div className="stats-value">
                  {formatNumber(covidData.deaths)}
                </div>
                <div className="stats-change deaths">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14l5-5 5 5H7z"/>
                  </svg>
                  <span>+{formatNumber(covidData.newDeaths)} new</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Chart placeholder */}
        <div className="placeholder-container chart-placeholder">
          <div className="placeholder-content">
            <svg className="placeholder-icon" width="64" height="64" viewBox="0 0 24 24" fill="var(--primary-color)">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <h3>COVID-19 Trend Chart</h3>
            <p className="placeholder-text">Interactive chart will be displayed here</p>
            <button className="btn-primary">
              Load Chart Data
            </button>
          </div>
        </div>
        
        {/* Map placeholder */}
        <div className="placeholder-container map-placeholder">
          <div className="placeholder-content">
            <svg className="placeholder-icon" width="64" height="64" viewBox="0 0 24 24" fill="var(--danger-color)">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <h3>COVID-19 Global Map</h3>
            <p className="placeholder-text">Interactive map will be displayed here</p>
            <button className="btn-primary">
              Load Map Data
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;