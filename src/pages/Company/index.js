import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './index.css'
import CompanyCard from '../../components/CompanyCard/CompanyCard';

const Company = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('/companies');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies', error);
            }
        };
        fetchCompanies();
    }, []);

    return (
        <div>
            <h2 className='title'>Empresas</h2>
            <div className='container'>
                {companies.map(company => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>
        </div>
    );
};

export default Company;
