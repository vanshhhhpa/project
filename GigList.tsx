import React from 'react';
import GigCard from './GigCard';
import { Gig } from '../types';

interface GigListProps {
  gigs: Gig[];
}

const GigList: React.FC<GigListProps> = ({ gigs }) => {
  return (
    <div className="gig-list">
      {gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig} />
      ))}
    </div>
  );
};

export default GigList;