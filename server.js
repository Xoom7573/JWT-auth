// General Imports
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = 5000;

// JSON Parser Middelware
app.use(express.json());

// Set template engine
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Import & Use API Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/post", require("./routes/api/post"));

// Import & Use View Routes
app.use("/", require("./routes/views/main"));

// App Listen
app.listen(PORT, () => console.log(`listening on ${PORT}...`));
