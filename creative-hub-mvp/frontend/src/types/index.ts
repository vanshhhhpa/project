export interface Gig {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
}