import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use `let` or `const` appropriately
let cached: MongooseConnection = (
  global as unknown as { mongoose?: MongooseConnection }
).mongoose || {
  conn: null,
  promise: null,
};

if (!cached.conn) {
  cached = (global as unknown as { mongoose: MongooseConnection }).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  const promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "AraOkan",
      bufferCommands: false,
    });

  cached.promise = promise;
  cached.conn = await promise;

  return cached.conn;
};
