import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import PackagePage from './Pages/PackagePage/PackagePage';
import Header from './Components/Header/Header';
import { Col, Row } from 'react-bootstrap';

function App() {
  return (
    <Router> 
      <div className='App'>
        <Header/> 
        <Row>
          <Col>
            <div>
              <Routes>
                <Route path="/" element={<HomePage/>}/>
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
