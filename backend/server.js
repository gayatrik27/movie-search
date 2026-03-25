const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// fetch (CommonJS)
const fetch = require("node-fetch");

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// ✅ ROOT ROUTE (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// ✅ SEARCH ROUTE
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});