import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './index.css'
import PayrollCard from '../../components/PayrollCard/PayrollCard';

const PayrollLoan = () => {
    const [payrolls, setPayrolls] = useState([]);

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

    return (
        <div>
            <h2 className='title'>Empréstimos</h2>
            <div className='container'>
                {payrolls.map(payroll => (
                    <PayrollCard key={payroll.id} payroll={payroll} />
                ))}
            </div>
        </div>
    );
};

export default PayrollLoan;
