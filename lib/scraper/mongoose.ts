import mongoose from "mongoose";
let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.log("MONGODB_URI is not defined");

  if (isConnected) return console.log("=> using existing database connection");

  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected");
    isConnected = true;
  }catch(e){
    console.log("error db");
  }
}
