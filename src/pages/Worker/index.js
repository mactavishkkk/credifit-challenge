import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import WorkerCard from '../../components/WorkerCard/WorkerCard';
import './index.css'

const Worker = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get('/workers');
                setWorkers(response.data);
            } catch (error) {
                console.error('Error fetching workers', error);
            }
        };
        fetchWorkers();
    }, []);

    return (
        <div>
            <div className='bread-crumbs-container'>
                <p className='bread-crumbs'>Home / Funcionários</p>
                <p className='title'>Funcionários</p>
            </div>
            <div className='container'>
                {workers.map(worker => (
                    <WorkerCard key={worker.id} worker={worker} />
                ))}
            </div>
        </div>
    );
};

export default Worker;
