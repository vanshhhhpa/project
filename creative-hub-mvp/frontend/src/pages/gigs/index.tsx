import React, { useEffect, useState } from 'react';
import GigList from '../../components/GigList';
import { fetchGigs } from '../../services/api';

const GigsPage = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGigs = async () => {
            try {
                const data = await fetchGigs();
                setGigs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getGigs();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Available Gigs</h1>
            <GigList gigs={gigs} />
        </div>
    );
};

export default GigsPage;