const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { addStroke, undoStroke, getStrokes } = require("./state-manager");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve client files
app.use(express.static("client"));

// User management
const colors = ["blue", "red", "green", "purple", "orange"];
let colorIndex = 0;
let userCount = 1;
const users = {};

io.on("connection", socket => {
  // Assign user identity
  const color = colors[colorIndex++ % colors.length];
  const username = `User-${userCount++}`;

  socket.color = color;
  socket.username = username;

  users[socket.id] = {
    color,
    username
  };

  // Send initial canvas state
  socket.emit("init", getStrokes());

  // Broadcast updated user list
  io.emit("users", users);

  // Handle drawing
  socket.on("draw", stroke => {
    addStroke(stroke);
    socket.broadcast.emit("draw", stroke);
  });

  // Handle undo
  socket.on("undo", userId => {
    undoStroke(userId);
    io.emit("reset", getStrokes());
  });

  // Handle cursor movement
  socket.on("cursor", pos => {
    socket.broadcast.emit("cursor", {
      ...pos,
      color: socket.color
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", users);
  });
});

// IMPORTANT: use environment port for deployment
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
