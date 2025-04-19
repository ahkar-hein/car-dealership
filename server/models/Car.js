import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  title: String,
  brand: String,
  model: String,
  year: Number,
  mileage: Number,
  price: Number,
  image: String,
  description: String,
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Car', carSchema);
