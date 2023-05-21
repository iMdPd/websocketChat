const express = require("express");
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");
const { messages, users } = require("./db/db");

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

  socket.on("join", (newUser) => {
    console.log(`${newUser} has joined the conversation!`);

    users.push({ name: newUser, id: socket.id });

    socket.broadcast.emit("message", {
      author: "Chat Bot",
      content: `${newUser} has joined the conversation!`,
    });
  });

  socket.on("message", (message) => {
    console.log(`Oh, I've got something from ${socket.id}`);

    messages.push(message);

    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Oh, socket ${socket.id} has left`);

    const removeUser = users.find((user) => user.id === socket.id);

    if (removeUser)
      socket.broadcast.emit("message", {
        author: "Chat Bot",
        content: `${removeUser.name} has left the conversation... :(`,
      });

    users.splice(users.indexOf(removeUser), 1);
  });

  console.log("I've added a listener on message event \n");
});
