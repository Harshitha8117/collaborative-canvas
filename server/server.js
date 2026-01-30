const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { addStroke, undoStroke, getStrokes } = require("./state-manager");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client"));

const colors = ["blue", "red", "green", "purple", "orange"];
let colorIndex = 0;
let userCount = 1;

const users = {};

io.on("connection", socket => {
  const color = colors[colorIndex++ % colors.length];
  const username = `User-${userCount++}`;

  socket.color = color;
  socket.username = username;

  users[socket.id] = { color, username };

  socket.emit("init", getStrokes());
  io.emit("users", users);

  socket.on("draw", stroke => {
    addStroke(stroke);
    socket.broadcast.emit("draw", stroke);
  });

  socket.on("undo", userId => {
    undoStroke(userId);
    io.emit("reset", getStrokes());
  });

  socket.on("cursor", pos => {
    socket.broadcast.emit("cursor", {
      ...pos,
      color: socket.color
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", users);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
