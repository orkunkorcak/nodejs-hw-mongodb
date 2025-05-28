import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  const user = env('MONGODB_USER');
  const password = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const connectionString = `mongodb+srv://${user}:${password}@${url}/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
