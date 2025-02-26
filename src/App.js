import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import UserPage from './Pages/UserPage/UserPage';
import HistoryPage from './Pages/HistoryPage/HistoryPage';
import PackagesPage from './Pages/PackagesPage/PackagesPage';
import Header from './Components/Header/Header';
import LogIn from './Pages/LogIn/LogIn';
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
                <Route path="/" element={<LogIn/>}/>
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/UserPage" element={<UserPage />} />
                <Route path="/PackagePage" element={<PackagesPage />} />
                <Route path="/HistoryPage" element={<HistoryPage />} />

              </Routes>
            </div>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
