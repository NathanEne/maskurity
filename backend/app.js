require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mountRoutes = require("./routes");

const app = express();

app.use(bodyParser.json({ limit: "200mb" }));
// app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

mountRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
