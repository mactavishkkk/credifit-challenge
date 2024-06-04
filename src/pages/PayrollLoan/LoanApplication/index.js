import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import './index.css';
import AssistantMessage from '../../../components/AssistantMessage/AssistantMessage';

const LoanApplication = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [totalFinanced, setTotalFinanced] = useState('');
    const [installments, setInstallments] = useState(null);

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.post(`/workers/search?searchTerm=${searchTerm}`);
            setSelectedWorker(response.data[0]);
        } catch (error) {
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
            const response = await axios.post('/payrolls', {
                worker: selectedWorker.id,
                company: selectedWorker.company,
                numberInstallments: installments,
                installmentValue: totalFinanced / installments,
                totalFinanced: totalFinanced
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating loan', error);
        }
    };

    return (
        <div>
            <div className='bread-crumbs-container'>
                <p className='bread-crumbs'>Home / Crédito Consignado</p>
                <p className='title'>Crédito Consignado</p>
            </div>
            {currentStep === 1 && (
                <div className='card'>
                    <h3 className='title-card'>Procurar Funcionário</h3>
                    <AssistantMessage message="Primeiro, vamos procurar por um funcionário disponível. Você pode usar o 'Nome' ou o 'CPF' do mesmo." />
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Digite o CPF ou o Nome'
                    />
                    <button onClick={handleSearch}>Procurar</button>
                    {selectedWorker && (
                        <div>
                            <p>Funcionário encontrado: {selectedWorker.name}</p>
                            <p>Nome: {selectedWorker.name}</p>
                            <p>CPF: {selectedWorker.cpf}</p>
                        </div>
                    )}
                </div>
            )}
            {currentStep === 2 && (
                <div className='card'>
                    <h3 className='title-card'>Simular Empréstimo</h3>
                    <AssistantMessage message="Você possui saldo para Crédito Consignado pela empresa Seguros Seguradora. Faça uma simulação! Digite quanto você precisa:" />
                    <input
                        type='number'
                        value={totalFinanced}
                        onChange={(e) => setTotalFinanced(e.target.value)}
                        placeholder='Digite a quantia desejada'
                    />
                </div>
            )}
            {currentStep === 3 && (
                <div className='card'>
                    <h3 className='title-card'>Simular Empréstimo</h3>
                    <AssistantMessage message="Escolha a opção de parcelamento que melhor funcionar para você:" />
                    <div className='installments-options'>
                        {[1, 2, 3, 4].map((num) => (
                            <button
                                key={num}
                                className={installments === num ? 'selected' : ''}
                                onClick={() => setInstallments(num)}
                            >
                                {num}x de {totalFinanced / num}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {currentStep === 4 && (
                <div className='card'>
                    <h3 className='title-card'>Resumo da simulação</h3>
                    <AssistantMessage message="Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua Conta Credifit! Veja o resumo da simulação!" />
                    <p>Valor a creditar: {totalFinanced}</p>
                    <p>Valor a financiar: R$ {totalFinanced}</p>
                    <p>Parcelamento: {installments}x R$ {totalFinanced / installments}</p>
                </div>
            )}
            <button onClick={handlePrevious}>Voltar</button>
            <button onClick={handleNext}>Próximo</button>
        </div>
    );
};

export default LoanApplication;
