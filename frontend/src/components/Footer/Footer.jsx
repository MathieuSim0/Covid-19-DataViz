import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{ position: 'relative' }}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>COVID-19 DataViz</h4>
            <p>Visualisation des données mondiales sur la pandémie COVID-19</p>
          </div>
          <div className="footer-section">
            <h4>Sources de données</h4>
            <ul>
              <li><a href="https://github.com/CSSEGISandData/COVID-19" target="_blank" rel="noopener noreferrer">John Hopkins University CSSE</a></li>
              <li><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports" target="_blank" rel="noopener noreferrer">WHO Reports</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Liens rapides</h4>
            <ul>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/countries">Pays</a></li>
              <li><a href="/about">À propos</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} COVID-19 DataViz. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;