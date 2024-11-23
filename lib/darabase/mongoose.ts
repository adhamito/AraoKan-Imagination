import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Environment variable MONGODB_URL is not defined");
}

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Declare globally scoped `mongoose` variable
declare global {
  // Use `var` for global declarations to avoid block scope issues in TypeScript
  // This is acceptable in this context as `var` is required for globals
  var mongoose: MongooseConnection | undefined;
}

// Use `const` for values that are not reassigned
const cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

// Assign the cached value back to global scope
global.mongoose = cached;

// Async function to connect to the database
export const connectionToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "AraOkan",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
