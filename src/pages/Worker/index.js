import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './index.css'
import WorkerCard from '../../components/WorkerCard/WorkerCard';

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
            <h2 className='title'>Workers</h2>
            <div className='container'>
                {workers.map(worker => (
                    <WorkerCard key={worker.id} worker={worker} />
                ))}
            </div>
        </div>
    );
};

export default Worker;
