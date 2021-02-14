require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mountRoutes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "200mb" }));

const allowedOrigins = ["http://localhost:3000", "https://maskurity.herokuapp.com"];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests from allowedOrigins, 
    // and requests with no origin such as REST tools or server-to-server requests
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin "${origin}" denied by CORS policy`));
    }
  },
};

app.use(cors(corsOptions));

// HTTP request logger
app.use(
  morgan(
    ":date[web] :method :url :status :res[content-length] - :response-time ms"
  )
);

mountRoutes(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
