const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const auth = require('../middleware/auth');

// Create gig (designer only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'designer') return res.status(403).json({ message: 'Designers only' });
  const { title, description, price, image } = req.body;
  if (!title || !description || !price) return res.status(400).json({ message: 'Missing fields' });
  try {
    const gig = new Gig({ title, description, price, image, designerId: req.user._id });
    await gig.save();
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all gigs
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.find().populate('designerId', 'name');
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single gig
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('designerId', 'name');
    if (!gig) return res.status(404).json({ message: 'Not found' });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit gig
router.put('/:id', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Not found' });
    if (gig.designerId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    const { title, description, price, image } = req.body;
    gig.title = title || gig.title;
    gig.description = description || gig.description;
    gig.price = price || gig.price;
    gig.image = image || gig.image;
    await gig.save();
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete gig
router.delete('/:id', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Not found' });
    if (gig.designerId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await gig.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get designer's own gigs
router.get('/designer/me', auth, async (req, res) => {
  try {
    const gigs = await Gig.find({ designerId: req.user._id });
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
