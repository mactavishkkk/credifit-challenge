import React, { useState } from 'react';
import ArrowUp from '../../assets/icons/arrow-up-black.svg';
import ArrowDown from '../../assets/icons/arrow-down-black.svg';
import './WorkerCard.css';
import { maskCnpj, maskCpf } from '../../utils/Masks';

const WorkerCard = ({ worker }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatedCpf = maskCpf(worker.cpf);
    const formatedCnpj = worker.company ? maskCnpj(worker.company.cnpj) : null;

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="worker-card">
            <div className="worker-card-header" onClick={toggleCard}>
                <span>#{worker.id} - {worker.name}</span>
                <img className="toggle-icon" src={isOpen ? ArrowUp : ArrowDown} alt="toggle icon" />
            </div>
            {isOpen && (
                <>
                    <div className="worker-card-divider" />
                    <div className="worker-card-body">
                        <div className="worker-card-row">
                            <div className="worker-card-label">CPF</div>
                            <div className="worker-card-value">{formatedCpf}</div>
                        </div>
                        <div className="worker-card-row">
                            <div className="worker-card-label">Email</div>
                            <div className="worker-card-value">{worker.email}</div>
                        </div>
                        <div className="worker-card-row">
                            <div className="worker-card-label">Salário</div>
                            <div className="worker-card-value">{worker.salary}</div>
                        </div>
                        <div className="worker-card-row">
                            <div className="worker-card-label">Score</div>
                            <div className="worker-card-value">{worker.score}</div>
                        </div>
                        <div className="worker-card-row">
                            <div className="worker-card-label">Empresa Conveniada</div>
                            <div className="worker-card-value">{formatedCnpj ?? 'n/a'}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkerCard;
