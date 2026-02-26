import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchGigById } from '../../services/api';
import { Gig } from '../../types';

const GigDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [gig, setGig] = useState<Gig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const getGig = async () => {
                try {
                    const fetchedGig = await fetchGigById(id as string);
                    setGig(fetchedGig);
                } catch (err) {
                    setError('Failed to load gig details');
                } finally {
                    setLoading(false);
                }
            };
            getGig();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!gig) return <div>Gig not found</div>;

    return (
        <div>
            <h1>{gig.title}</h1>
            <img src={gig.image} alt={gig.title} />
            <p>{gig.description}</p>
            <p>Price: ${gig.price}</p>
            {/* Add a button to hire the designer or proceed to checkout */}
        </div>
    );
};

export default GigDetail;