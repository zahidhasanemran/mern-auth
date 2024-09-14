import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js"

const app = express();
dotenv.config();

app.get("/", (req,res)=>{
  res.send("Hello world")
})



app.listen(4000, ()=>{
  connectDB();
  console.log('Server is running in 4000')
});
