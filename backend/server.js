require("dotenv").config();
const express=require("express");
const cors = require("cors");
const app=express();
const { generateTripPlan } = require("./ai");
const port=3000;
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello my server is working");
})
app.post("/api/generate-trip", async (req, res) => {
  const { destination, days, budget, style } = req.body;
  try {
    const tripPlan = await generateTripPlan(destination, days, budget, style);
    res.json(tripPlan);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to generate trip" });
  }
});
app.listen(port,()=>{
    console.log("we are continously listenign to port request");
})
