// Database configuration
import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    console.log('Using cached DB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('MONGODB_URI environment variable is not set');
      console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO') || key.includes('DB')));
      throw new Error('MONGODB_URI environment variable is missing');
    }

    const opts = {
      bufferCommands: false,
    };

    console.log('Connecting to MongoDB...');
    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((mongoose) => {
        console.log('DB Connected successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('DB Connection Error:', err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
