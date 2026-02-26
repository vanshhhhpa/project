import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

export const fetchGigs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/gigs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching gigs:', error);
        throw error;
    }
};

export const fetchGigById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/gigs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching gig with id ${id}:`, error);
        throw error;
    }
};