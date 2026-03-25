const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json({ error: "No search query provided" });
    }

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});