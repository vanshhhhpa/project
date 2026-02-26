import React from 'react';
import GigList from '../components/GigList';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <h1>Welcome to the Creative Hub</h1>
            <p>Browse our creative services and hire talented designers.</p>
            <GigList />
        </div>
    );
};

export default HomePage;