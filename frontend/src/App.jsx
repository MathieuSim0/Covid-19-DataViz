import './App.css'
import NavBar from './components/NavBar'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <MainContent style={{ flex: 1, paddingBottom: '0' }} />
      <Footer />
    </div>
  );
}

export default App;