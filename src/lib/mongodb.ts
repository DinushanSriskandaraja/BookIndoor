import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use const since it's never reassigned
const globalWithMongoose = globalThis as unknown as {
  mongoose?: MongooseCache;
};

// Define cached with proper type (no 'any')
const cached: MongooseCache = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

export default async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;
  return cached.conn;
}
