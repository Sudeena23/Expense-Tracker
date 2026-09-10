import mongoose from "mongoose"

export const connectDB = async()=> {
 try {
   console.log("connecting to databasee......")
 const connection = await mongoose.connect(process.env.MANGO_URL)
console.log("successfully connected to database")
 }
 catch (error) {
  console.error (error)
 }
 finally {
  console.log("final statement")
 }
}
