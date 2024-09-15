import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
import authrouter from "./routes/auth.routes.js"

dotenv.config();
const PORT = process.env.PORT || 5001
const app = express();

// allow us to extract parameters form req.body 
app.use(express.json())

app.use("/api/auth", authrouter)

app.listen(PORT, ()=>{
  connectDB();
  console.log(`Server is running in ${PORT}`)
});
