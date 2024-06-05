import React, { useState } from 'react';
import { formatDate } from '../../utils/Masks';
import './PayrollCard.css';

import ArrowUp from '../../assets/icons/arrow-up-black.svg';
import ArrowDown from '../../assets/icons/arrow-down-black.svg';

import ApprovedIcon from '../../assets/icons/approved.svg';
import UnApprovedIcon from '../../assets/icons/unapproved.svg';

const PayrollCard = ({ payroll }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const formattedDate = formatDate(payroll.nextDue);
    const status = payroll.status.id;
    const formattedInstallmentValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(payroll.installmentValue);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    const toggleHideValues = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className="payroll-card">
            <div className="payroll-card-header" onClick={toggleCard}>
                <span className='payroll-card-title'>
                    <img className="status-icon" src={status === 1 ? ApprovedIcon : UnApprovedIcon} alt="status icon" />
                    SOLICITAÇÃO DE EMPRÉSTIMO - #{payroll.id}
                </span>
                <img className="toggle-icon" src={isOpen ? ArrowUp : ArrowDown} alt="toggle icon" />
            </div>
            {isOpen && (
                <>
                    <div className="payroll-card-divider" />
                    <div className="payroll-card-body">
                        <div className="payroll-card-row">
                            <span className={`status-span ${status === 1 ? 'approved' : 'unapproved'}`}>
                                <p className="status-text">
                                    <img className='status-flag-icon' src={status === 1 ? ApprovedIcon : UnApprovedIcon} alt="status icon" />
                                    {'Crédito ' + payroll.status.status + ' '}
                                </p>
                                {payroll.status.id === 3 ? payroll.statusDetails : null}
                            </span>
                        </div>
                        <div className="payroll-card-row">
                            <button className="hide-values-button" onClick={toggleHideValues}>
                                {isHidden ? 'Mostrar' : 'Ocultar'}
                            </button>
                        </div>
                        <div className="payroll-card-row">
                            <div className="payroll-card-label">Empresa</div>
                            <div className="payroll-card-value">{payroll.company.companyName}</div>
                        </div>
                        <div className="payroll-card-row">
                            <div className="payroll-card-label">Próximo Vencimento</div>
                            <div className="payroll-card-value">{formattedDate}</div>
                        </div>
                        <div className="payroll-card-row">
                            <div className="payroll-card-label">Número de Parcelas</div>
                            <div className={`payroll-card-value ${isHidden ? 'hidden' : ''}`}>{payroll.numberInstallments} x</div>
                        </div>
                        <div className="payroll-card-row">
                            <div className="payroll-card-label">Valor da Parcela</div>
                            <div className={`payroll-card-value ${isHidden ? 'hidden' : ''}`}>{formattedInstallmentValue}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PayrollCard;
