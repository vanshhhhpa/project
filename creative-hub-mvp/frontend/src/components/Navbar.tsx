import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav>
            <div className="logo">
                <Link href="/">Creative Hub</Link>
            </div>
            <ul>
                <li>
                    <Link href="/gigs">Browse Gigs</Link>
                </li>
                <li>
                    <Link href="/checkout">Checkout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;