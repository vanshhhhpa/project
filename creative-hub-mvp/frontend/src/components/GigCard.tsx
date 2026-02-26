import React from 'react';

interface GigCardProps {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const GigCard: React.FC<GigCardProps> = ({ title, description, price, imageUrl }) => {
    return (
        <div className="gig-card">
            <img src={imageUrl} alt={title} className="gig-card-image" />
            <h3 className="gig-card-title">{title}</h3>
            <p className="gig-card-description">{description}</p>
            <p className="gig-card-price">${price.toFixed(2)}</p>
            <button className="gig-card-button">Hire Now</button>
        </div>
    );
};

export default GigCard;