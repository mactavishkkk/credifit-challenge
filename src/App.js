import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Worker from './pages/Worker';
import PayrollLoan from './pages/PayrollLoan';
import Company from './pages/Company';
import Header from './components/Header/Header';
import LoanApplication from './pages/PayrollLoan/LoanApplication';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<PayrollLoan />} />
          <Route path="/funcionarios" element={<Worker />} />
          <Route path="/empresas" element={<Company />} />
          <Route path="/emprestimo/criar" element={<LoanApplication />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
