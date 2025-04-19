import express from 'express';
import Car from '../models/Car.js';
import { protect, isManager } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Not found' });
  res.json(car);
});

// Manager only
router.post('/', protect, isManager, async (req, res) => {
  const car = await Car.create(req.body);
  res.status(201).json(car);
});

router.put('/:id', protect, isManager, async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(car);
});

router.delete('/:id', protect, isManager, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: 'Car deleted' });
});

export default router;
