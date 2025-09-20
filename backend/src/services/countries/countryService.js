const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Service to extract countries from CSV files
 */
class CountryService {
  /**
   * Gets all countries from the COVID-19 CSV data file
   * @returns {Promise<string[]>} Array of unique country names
   */
  async getCountries() {
    const countries = new Set();
    const filePath = path.resolve(__dirname, '../../../../COVID-19-master/archived_data/archived_time_series/time_series_19-covid-Confirmed_archived_0325.csv');
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // The column containing country names is 'Country/Region'
          if (row['Country/Region']) {
            countries.add(row['Country/Region']);
          }
        })
        .on('end', () => {
          // Convert Set to Array and sort alphabetically
          const countryArray = Array.from(countries).sort();
          // Add 'Global' as the first option
          countryArray.unshift('Global');
          resolve(countryArray);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}

module.exports = new CountryService();