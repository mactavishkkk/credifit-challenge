import React, { useEffect, useState } from 'react';

const Worker = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        // const fetchWorkers = async () => {
        //     try {
        //         const response = await axios.get('/workers');
        //         setWorkers(response.data);
        //     } catch (error) {
        //         console.error('Error fetching workers', error);
        //     }
        // };
        // fetchWorkers();
    }, []);

    return (
        <div>
            <h2>Workers</h2>
            {/* <ul>
                {workers.map(worker => (
                    <li key={worker.id}>{worker.name} - {worker.cpf}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default Worker;
