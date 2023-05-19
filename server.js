const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
PORT = 8000;

const { messages } = require("./db/db");

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

app.use(cors());
app.use(express.static(path.join(__dirname, "/client")));

app.get("*", (res, req) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});
