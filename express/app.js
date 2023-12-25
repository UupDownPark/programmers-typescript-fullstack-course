const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/test", (req, res) => {
  res.send("Hello cuty boy");
});

app.listen(port, () => {
  console.log(`app listening on port number ${port}`);
});
