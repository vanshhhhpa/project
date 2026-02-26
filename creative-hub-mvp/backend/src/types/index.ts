export interface Gig {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateGigInput {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface UpdateGigInput {
    title?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
}

export interface PaymentResponse {
    id: string;
    amount: number;
    currency: string;
    status: string;
}