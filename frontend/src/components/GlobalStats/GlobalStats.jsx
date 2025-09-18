import { useState, useEffect } from 'react';
import Papa from 'papaparse';

/**
 * GlobalStats component for COVID-19 dashboard
 * Aggregates global statistics from multiple CSV data files
 * Displays confirmed cases, deaths, recoveries, and active cases
 */
function GlobalStats() {
  const [stats, setStats] = useState({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    active: 0,
    loading: true,
    error: null,
    lastUpdated: null
  });

  useEffect(() => {
    // Paths to CSV files relative to public directory
    const confirmedPath = '/COVID-19-master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
    const deathsPath = '/COVID-19-master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
    const recoveredPath = '/COVID-19-master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

    // Function to parse CSV file and get the latest global totals
    const parseCSV = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const csvData = await response.text();
        
        return new Promise((resolve, reject) => {
          Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              if (result.errors.length > 0) {
                reject(result.errors);
                return;
              }
              
              // Get the most recent date column (last column in the dataset)
              const dateColumns = Object.keys(result.data[0]).filter(key => 
                !['Province/State', 'Country/Region', 'Lat', 'Long'].includes(key)
              );
              
              const lastDateColumn = dateColumns[dateColumns.length - 1];
              
              // Sum up values from the most recent date
              const total = result.data.reduce((acc, row) => {
                const value = parseFloat(row[lastDateColumn]) || 0;
                return acc + value;
              }, 0);
              
              resolve({
                total,
                lastUpdated: lastDateColumn
              });
            },
            error: (error) => {
              reject(error);
            }
          });
        });
      } catch (error) {
        throw new Error(`Error fetching ${filePath}: ${error.message}`);
      }
    };

    // Fetch and process all datasets
    const fetchData = async () => {
      try {
        setStats(prevStats => ({ ...prevStats, loading: true }));
        
        const confirmedData = await parseCSV(confirmedPath);
        const deathsData = await parseCSV(deathsPath);
        const recoveredData = await parseCSV(recoveredPath);
        
        // Calculate active cases
        const active = confirmedData.total - deathsData.total - recoveredData.total;
        
        // Update state with the aggregated data
        setStats({
          confirmed: confirmedData.total,
          deaths: deathsData.total,
          recovered: recoveredData.total,
          active: active > 0 ? active : 0, // Prevent negative active cases
          loading: false,
          error: null,
          lastUpdated: confirmedData.lastUpdated
        });
      } catch (error) {
        setStats(prevStats => ({
          ...prevStats,
          loading: false,
          error: `Error loading data: ${error.message}`
        }));
        console.error('Error fetching COVID-19 data:', error);
      }
    };

    fetchData();
  }, []);

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(Math.round(num));
  };

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Convert from M/D/YY format to a proper date string
    const parts = dateString.split('/');
    if (parts.length !== 3) return dateString;
    
    const month = parseInt(parts[0]);
    const day = parseInt(parts[1]);
    const year = parseInt(`20${parts[2]}`); // Assuming 20xx for YY
    
    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="global-stats">
      {stats.loading ? (
        <div className="loading-indicator">
          <p>Loading global statistics...</p>
        </div>
      ) : stats.error ? (
        <div className="error-message">
          <p>{stats.error}</p>
        </div>
      ) : (
        <div>
          <div className="stats-header">
            <h2>Global COVID-19 Statistics</h2>
            {stats.lastUpdated && (
              <p className="last-updated">
                Last updated: {formatDate(stats.lastUpdated)}
              </p>
            )}
          </div>
          
          <div className="stats-grid">
            <div className="stat-card confirmed">
              <h3>Confirmed Cases</h3>
              <p className="stat-value">{formatNumber(stats.confirmed)}</p>
            </div>
            
            <div className="stat-card active">
              <h3>Active Cases</h3>
              <p className="stat-value">{formatNumber(stats.active)}</p>
            </div>
            
            <div className="stat-card recovered">
              <h3>Recovered</h3>
              <p className="stat-value">{formatNumber(stats.recovered)}</p>
            </div>
            
            <div className="stat-card deaths">
              <h3>Deaths</h3>
              <p className="stat-value">{formatNumber(stats.deaths)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalStats;