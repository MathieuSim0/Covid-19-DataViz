import { useState } from 'react';
import './MainContent.css';
import GlobalStats from '../GlobalStats';

function MainContent({ style }) {
  const [covidData, setCovidData] = useState({
    confirmed: 543285647,
    recovered: 471895321,
    deaths: 6738572,
    active: 64651754
  });
  
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const countries = ['Global', 'USA', 'India', 'Brazil', 'UK', 'Russia', 'France', 'Germany', 'Japan', 'China'];
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <main className="main-content" style={style}>
      <div className="main-container">
        {/* Global Stats Component */}
        <h1 className="page-title">COVID-19 Global Dashboard</h1>
        
        <GlobalStats />
        
        {/* Country selector */}
        <div className="country-selector-container">
          <div className="country-selector">
            <h3>Select Region:</h3>
            <div className="country-buttons">
              {countries.map(country => (
                <button 
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`country-button ${country === selectedCountry ? 'active' : 'inactive'}`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="stats-grid">
          <div className="card confirmed">
            <h3>Confirmed</h3>
            <div className="stats-value">
              {formatNumber(covidData.confirmed)}
            </div>
            <div className="stats-change confirmed">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5H7z"/>
              </svg>
              <span>+124,578 today</span>
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
              <span>+52,487 today</span>
            </div>
          </div>
          
          <div className="card recovered">
            <h3>Recovered</h3>
            <div className="stats-value">
              {formatNumber(covidData.recovered)}
            </div>
            <div className="stats-change recovered">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
              <span>+98,234 today</span>
            </div>
          </div>
          
          <div className="card deaths">
            <h3>Deaths</h3>
            <div className="stats-value">
              {formatNumber(covidData.deaths)}
            </div>
            <div className="stats-change deaths">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
              <span>+1,285 today</span>
            </div>
          </div>
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