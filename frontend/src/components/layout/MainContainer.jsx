function MainContainer({ children }) {
  return (
    <main className="flex-1 container-app py-8">
      <div style={{
        backgroundColor: 'var(--bg-light)',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        padding: '1.5rem',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0))',
        backdropFilter: 'blur(10px)',
      }}>
        <div className="covid-stats-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--neutral-light-color)',
          paddingBottom: '1.5rem'
        }}>
          <h2 style={{ 
            color: 'var(--primary-color)', 
            margin: 0, 
            fontWeight: '600',
            fontSize: '1.5rem'
          }}>
            Global COVID-19 Data
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: 'var(--neutral-color)'
          }}>
            <span style={{ fontWeight: '500' }}>Last updated:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

export default MainContainer;