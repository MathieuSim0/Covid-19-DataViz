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
        <h1 className="page-title" style={{ 
          marginBottom: '2rem', 
          color: 'var(--primary-color)',
          fontSize: '2rem',
          fontWeight: '700'
        }}>COVID-19 Global Dashboard</h1>
        
        <GlobalStats />
        
        {/* Country selector */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <h3 style={{ margin: 0, color: 'var(--neutral-color)' }}>Select Region:</h3>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}>
              {countries.map(country => (
                <button 
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: country === selectedCountry ? 'var(--primary-color)' : 'var(--neutral-light-color)',
                    color: country === selectedCountry ? 'white' : 'var(--neutral-color)',
                    cursor: 'pointer',
                    fontWeight: country === selectedCountry ? '600' : '400',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Stats cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div className="card confirmed" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--confirmed-color)', margin: '0 0 0.5rem 0' }}>Confirmed</h3>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              margin: '1rem 0',
              color: 'var(--neutral-color)'
            }}>
              {formatNumber(covidData.confirmed)}
            </div>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--confirmed-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5H7z"/>
              </svg>
              <span>+124,578 today</span>
            </div>
          </div>
          
          <div className="card active" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--active-color)', margin: '0 0 0.5rem 0' }}>Active</h3>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              margin: '1rem 0',
              color: 'var(--neutral-color)'
            }}>
              {formatNumber(covidData.active)}
            </div>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--active-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5H7z"/>
              </svg>
              <span>+52,487 today</span>
            </div>
          </div>
          
          <div className="card recovered" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--recovered-color)', margin: '0 0 0.5rem 0' }}>Recovered</h3>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              margin: '1rem 0',
              color: 'var(--neutral-color)'
            }}>
              {formatNumber(covidData.recovered)}
            </div>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--recovered-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
              <span>+98,234 today</span>
            </div>
          </div>
          
          <div className="card deaths" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--deaths-color)', margin: '0 0 0.5rem 0' }}>Deaths</h3>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              margin: '1rem 0',
              color: 'var(--neutral-color)'
            }}>
              {formatNumber(covidData.deaths)}
            </div>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--deaths-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
              <span>+1,285 today</span>
            </div>
          </div>
        </div>
        
        {/* Chart placeholder */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          marginBottom: '2rem',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--neutral-light-color)',
        }}>
          <div style={{ textAlign: 'center', color: 'var(--neutral-color)' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--primary-color)" style={{ margin: '0 auto 1rem auto', opacity: 0.7 }}>
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <h3>COVID-19 Trend Chart</h3>
            <p style={{ fontSize: '0.875rem' }}>Interactive chart will be displayed here</p>
            <button className="btn-primary" style={{ marginTop: '1rem' }}>
              Load Chart Data
            </button>
          </div>
        </div>
        
        {/* Map placeholder */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          marginBottom: '2rem',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--neutral-light-color)',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          position: 'relative',
        }}>
          <div style={{ textAlign: 'center', color: 'var(--neutral-color)' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--danger-color)" style={{ margin: '0 auto 1rem auto', opacity: 0.7 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <h3>COVID-19 Global Map</h3>
            <p style={{ fontSize: '0.875rem' }}>Interactive map will be displayed here</p>
            <button className="btn-primary" style={{ marginTop: '1rem' }}>
              Load Map Data
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;