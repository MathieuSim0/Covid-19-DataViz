import Navbar from './Navbar';
import MainContainer from './MainContainer';

function Layout({ children }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f7fafc',
      backgroundImage: `
        radial-gradient(circle at 25% 10%, rgba(0, 120, 180, 0.05) 0%, transparent 20%),
        radial-gradient(circle at 75% 30%, rgba(25, 169, 157, 0.05) 0%, transparent 20%),
        radial-gradient(circle at 50% 60%, rgba(208, 49, 73, 0.05) 0%, transparent 30%)
      `,
    }}>
      {/* Decorative virus particles */}
      <div style={{ 
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: 'rgba(208, 49, 73, 0.03)',
        zIndex: 0,
      }} />
      <div style={{ 
        position: 'absolute',
        bottom: '15%',
        left: '8%',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 120, 180, 0.03)',
        zIndex: 0,
      }} />
      
      <Navbar />
      <MainContainer>{children}</MainContainer>
      
      <footer style={{
        backgroundColor: 'white',
        borderTop: '1px solid var(--neutral-light-color)',
        padding: '1rem 0',
        textAlign: 'center',
        color: 'var(--neutral-color)',
        fontSize: '0.875rem',
      }}>
        <div className="container-app">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <div>
              &copy; {new Date().getFullYear()} COVID-19 Data Visualization Dashboard
            </div>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
            }}>
              <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Data Sources</a>
              <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;