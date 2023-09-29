const express = require("express");
const cors = require("cors");
const knex = require("knex");

const app = express();
const port = 3000;

const config = require("./knexfile");
const database = knex(config);
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const Items = require("./routes/product");
app.use("/api", Items);

// ... Other code ...

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
