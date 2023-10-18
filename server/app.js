if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandling");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`I Love You ${port}`);
});
