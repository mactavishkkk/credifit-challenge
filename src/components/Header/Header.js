import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/credifit.svg';
import arrow from '../../assets/icons/arrow-down.svg';
import './Header.css';

const Header = () => {
  const username = "John Doe";

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav-links">
        <Link to="/funcionarios">Funcionários</Link>
        <Link to="/empresas">Empresas</Link>
        <Link to="/">Crédito Consignado</Link>
      </nav>
      <div className="user-info" onClick={() => alert('em breve!')}>
        <span>{username}</span>
        <img src={arrow} className='arrow-icon' alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
