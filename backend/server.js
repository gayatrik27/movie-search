const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ✅ FIXED fetch (works on Render)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ SEARCH ROUTE
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json({ error: "No search query provided" });
    }

    const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ PORT FIX (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});