import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import './index.css';

import { maskCpf } from '../../../utils/Masks';
import AssistantMessage from '../../../components/AssistantMessage/AssistantMessage';
import ArrowBack from '../../../assets/icons/arrow-left.svg';

const LoanApplication = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [totalFinanced, setTotalFinanced] = useState('');
    const [installments, setInstallments] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();
    const formattedInstallmentValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(totalFinanced);

    const handleSearch = async () => {
        try {
            const response = await axios.post(`/workers/search?searchTerm=${searchTerm}`);
            const worker = response.data[0];

            if (worker.company === null) {
                setAlertMessage('Funcionário não possui uma empresa vinculada.');
                setSelectedWorker(null);
                return;
            }

            setAlertMessage('');
            setSelectedWorker(worker);
        } catch (error) {
            setAlertMessage('Funcionário não encontrado.');
            console.error('Error fetching worker', error);
        }
    };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleConfirm = async () => {
        try {
            const payrollData = {
                worker: selectedWorker.id,
                company: selectedWorker.company,
                numberInstallments: installments,
                installmentValue: parseFloat(totalFinanced / installments),
                totalFinanced: parseFloat(totalFinanced)
            }
            await axios.post('/payrolls', payrollData);

            alert('Solicitação efetuada com sucesso!');
            navigate('/');
        } catch (error) {
            setAlertMessage("Este trabalhador não pode financiar uma quantia maior que 35% de seu salário");
            console.error('Error creating loan', error);
        }
    };

    return (
        <div className='container'>
            <div className='bread-crumbs-container-loan'>
                <div>
                    <img className="bread-icon" onClick={() => navigate('/')} src={ArrowBack} alt="back icon" />
                </div>
                <div>
                    <p className='bread-crumbs-loan'>Home / Crédito Consignado</p>
                    <p className='bread-title-loan'>Crédito Consignado</p>
                </div>
            </div>
            {currentStep === 1 && (
                <div className='card'>
                    <h3 className='title-card'>Procurar Funcionário</h3>
                    <AssistantMessage message="Primeiro, vamos procurar por um funcionário disponível. Você pode usar o 'Nome' ou o 'CPF' do mesmo." />
                    <input
                        type='text'
                        className='search-input-card'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Digite o CPF ou o Nome'
                    />
                    <button className='back-button' onClick={handleSearch}>Procurar</button>
                    {alertMessage && <div className='alert-message'>{alertMessage}</div>}
                    {selectedWorker && (
                        <div className='payroll-card-row'>
                            <p className='payroll-card-label'>Funcionário encontrado:</p>
                            <p className='payroll-card-label'>Nome:</p>
                            <p className='payroll-card-value'>{selectedWorker.name}</p>
                            <p className='payroll-card-label'>CPF:</p>
                            <p className='payroll-card-value'>{maskCpf(selectedWorker.cpf)}</p>
                        </div>
                    )}
                </div>
            )}
            {currentStep === 2 && (
                <div className='card'>
                    <h3 className='title-card'>Simular Empréstimo</h3>
                    <AssistantMessage message="Você possui saldo para Crédito Consignado pela empresa Seguros Seguradora. Faça uma simulação! Digite quanto você precisa:" />
                    <div className="slider-div">
                        <p className='slider-p'>{formattedInstallmentValue}</p>
                    </div>
                    <div className="slider-div">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={totalFinanced}
                            onChange={(e) => setTotalFinanced(e.target.value)}
                            className="slider"
                        />
                    </div>
                </div>
            )}
            {currentStep === 3 && (
                <div className='card'>
                    <h3 className='title-card'>Simular Empréstimo</h3>
                    <AssistantMessage message="Escolha a opção de parcelamento que melhor funcionar para você:" />
                    <div className="installments-div">
                        <p className='installments-p'>{formattedInstallmentValue}</p>
                    </div>
                    <p style={{ color: '#2A3535' }}>Divididas em:</p>
                    <div className='installments-options'>
                        {[1, 2, 3, 4].map((num) => (
                            <button
                                key={num}
                                className={installments === num ? 'selected' : ''}
                                onClick={() => setInstallments(num)}
                            >
                                <span className='installment-number'>{num}x de</span>
                                <span className='installment-value'>R$ {(totalFinanced / num).toFixed(2)}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {currentStep === 4 && (
                <div className='card'>
                    <h3 className='title-card'>Resumo da simulação</h3>
                    <AssistantMessage message="Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua Conta Credifit! Veja o resumo da simulação!" />
                    {alertMessage && <div className='alert-message'>{alertMessage}</div>}
                    <div className="payroll-card-body">
                        <div className="payroll-card-row">
                            <div className="payroll-card-label">Valor a creditar:</div>
                            <div className="payroll-card-value">{formattedInstallmentValue}</div>
                        </div>
                        <div className="payroll-card-row">
                            <div className="payroll-card-label">Valor a financiar:</div>
                            <div className="payroll-card-value">{formattedInstallmentValue}</div>
                        </div>
                        <div className="payroll-card-row">
                            <div className="payroll-card-label">Parcelamento:</div>
                            <div className="payroll-card-value">{installments}x R$ {totalFinanced / installments}</div>
                        </div>
                    </div>
                </div>
            )}
            <div className='button-container-loan'>
                <button className='back-button' onClick={handlePrevious} disabled={currentStep === 1}>
                    Voltar
                </button>

                {currentStep < 4 ? (
                    <button className='next-button' onClick={handleNext}
                        disabled={installments === 0 || selectedWorker === undefined}                    >
                        Próximo
                    </button>
                ) : null}

                {currentStep === 4 ? (
                    <button className='next-button' onClick={handleConfirm}>Solicitar empréstimo </button>
                ) : null}
            </div>
        </div>
    );
};

export default LoanApplication;
