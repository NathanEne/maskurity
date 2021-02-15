require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mountRoutes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "200mb" }));

const allowList = ["https://maskurity.herokuapp.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === "development") {
      allowList.push(`http://localhost:${PORT}`);
    }
    // Allow requests from allowList
    if (allowList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin "${origin}" denied by CORS policy`));
    }
  },
};

app.use(cors(corsOptions));

// HTTP request logger
app.use(morgan("combined"));

mountRoutes(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
