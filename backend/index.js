import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
import authrouter from "./routes/auth.routes.js"

const app = express();
dotenv.config();

app.get("/", (req,res)=>{
  res.send("Hello world")
})

app.use("/api/auth", authrouter)

app.listen(4000, ()=>{
  connectDB();
  console.log('Server is running in 4000')
});
