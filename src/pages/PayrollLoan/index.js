import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import PayrollCard from '../../components/PayrollCard/PayrollCard';
import { useNavigate } from 'react-router-dom';
import './index.css';

const PayrollLoan = () => {
    const [payrolls, setPayrolls] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayrolls = async () => {
            try {
                const response = await axios.get('/payrolls');
                setPayrolls(response.data);
            } catch (error) {
                console.error('Error fetching payrolls', error);
            }
        };
        fetchPayrolls();
    }, []);

    const handleNewLoan = () => {
        navigate('/emprestimo/criar');
    };

    return (
        <div>
            <div className='bread-crumbs-container'>
                <p className='bread-crumbs'>Home / Crédito Consignado</p>
                <p className='title'>Crédito Consignado</p>
            </div>
            <div className='container'>
                {payrolls.map(payroll => (
                    <PayrollCard key={payroll.id} payroll={payroll} />
                ))}
            </div>
            <div className='button-container'>
                <button className='new-loan-button' onClick={handleNewLoan}>Novo empréstimo</button>
            </div>
        </div>
    );
};

export default PayrollLoan;
