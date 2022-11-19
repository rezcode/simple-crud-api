const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
// const path = require("path");

app.use(helmet());

app.use(cors());

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "images")));

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
