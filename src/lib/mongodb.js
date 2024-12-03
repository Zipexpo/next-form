import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in your .env.local");
}

/**
 * Global is used to maintain a cached connection in development.
 * This avoids creating multiple connections during HMR (Hot Module Replacement).
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    console.log("Connecting");
    if (process.env.NODE_ENV === "development") {
        if (cached.conn) {
            return cached.conn;
        }

        if (!cached.promise) {
            cached.promise = mongoose
            .connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => mongoose).catch(e=>console.log(e));
        }
        console.log("Promise wait...");
        cached.conn = await cached.promise;
        console.log("Connected develop");
        return cached.conn;
    }else{
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => mongoose).catch(e=>console.log(e));
        cached.conn = await cached.promise;
        console.log("Connected production");
        return cached.conn;
    }
}

export default dbConnect;
