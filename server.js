const express = require("express");
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");
const { messages } = require("./db/db");

const app = express();
PORT = 8000;

const server = app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

const io = socket(server);

app.use(cors());
app.use(express.static(path.join(__dirname, "/client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
  socket.on("message", () => {
    console.log("Oh, I've got something from " + socket.id);
  });
  console.log("I've added a listener on message event \n");
});
