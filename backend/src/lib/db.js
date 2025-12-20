import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async () => {
    try {
        if(!ENV.DB_URL){
            throw new error("DB URL is not define in environment variable") //validation check
        }
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("✅ Connected to MongoDB:", conn.connection.host)
    }
    catch (error) {
        console.log("❌Error connecting to mongoDB", error)
        process.exit(1) //0 means success and 1 means failure
    }
}
