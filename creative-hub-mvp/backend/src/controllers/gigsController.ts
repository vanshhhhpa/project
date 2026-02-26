import { Request, Response } from 'express';
import Gig from '../models/gig';

// Get all gigs
export const getGigs = async (req: Request, res: Response) => {
    try {
        const gigs = await Gig.find();
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gigs', error });
    }
};

// Create a new gig
export const createGig = async (req: Request, res: Response) => {
    const newGig = new Gig(req.body);
    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (error) {
        res.status(500).json({ message: 'Error creating gig', error });
    }
};

// Get a gig by ID
export const getGigById = async (req: Request, res: Response) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) {
            return res.status(404).json({ message: 'Gig not found' });
        }
        res.status(200).json(gig);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gig', error });
    }
};