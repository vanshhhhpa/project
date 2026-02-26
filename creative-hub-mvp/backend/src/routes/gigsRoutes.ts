import { Router } from 'express';
import { getGigs, createGig } from '../controllers/gigsController';

const router = Router();

// Route to get all gigs
router.get('/', getGigs);

// Route to create a new gig
router.post('/', createGig);

export default router;