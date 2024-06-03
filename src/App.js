import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Worker from './pages/Worker';
import PayrollLoan from './pages/PayrollLoan';
import Company from './pages/Company';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<PayrollLoan />} />
          <Route path="/workers" element={<Worker />} />
          <Route path="/companies" element={<Company />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
