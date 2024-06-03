import React, { useState } from 'react';
import ArrowUp from '../../assets/icons/arrow-up-black.svg';
import ArrowDown from '../../assets/icons/arrow-down-black.svg';
import { maskCnpj } from '../../utils/Masks';
import './CompanyCard.css';

const CompanyCard = ({ company }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatedCnpj = maskCnpj(company.cnpj);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="company-card">
            <div className="company-card-header" onClick={toggleCard}>
                <span>#{company.id} - {company.companyName}</span>
                <img className="toggle-icon" src={isOpen ? ArrowUp : ArrowDown} alt="toggle icon" />
            </div>
            {isOpen && (
                <>
                    <div className="company-card-divider" />
                    <div className="company-card-body">
                        <div className="company-card-row">
                            <div className="company-card-label">CNPJ</div>
                            <div className="company-card-value">{formatedCnpj}</div>
                        </div>
                        <div className="company-card-row">
                            <div className="company-card-label">Email</div>
                            <div className="company-card-value">{company.email}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CompanyCard;
