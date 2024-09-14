import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup router")
})

router.get("/login", (req, res) => {
  res.send("login router")
})

router.get("/logout", (req, res) => {
  res.send("logout router")
})

router.get("/forgot-password", (req, res) => {
  res.send("Forgot password router")
})


export default router;
