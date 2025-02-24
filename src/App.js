import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPages/UserPage';
import PackagePage from './Pages/PackagePage/packagePage';
import Header from './Components/Header/Header';
import { Col, Row } from 'react-bootstrap';

function App() {
  return (
    <Router> {/* Asegura que todo esté dentro de Router */}
      <div className="App">
        <Header/> {/* Ahora está dentro de Router */}
        <Row>
          <Col>
            <div className='pages'>
              <Routes>
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/UserPage" element={<UserPage />} />
                <Route path="/PackagePage" element={<PackagePage />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
