const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 8000 || process.env.PORT;
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());

app.use(cors());

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

// app.use(express.static("public"));

const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");

app.use("/auth", authRoute);
app.use("/product", productsRoute);

app.use("*", (req, res) => {
  res.send("Sukses");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
