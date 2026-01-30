import { drawStroke, clearCanvas, drawCursor } from "./canvas.js";

export const socket = io();
export const userId = Math.random().toString(36).slice(2);

// Initial canvas sync
socket.on("init", strokes => {
  strokes.forEach(drawStroke);
});

// Drawing sync
socket.on("draw", drawStroke);

// Undo reset
socket.on("reset", strokes => {
  clearCanvas();
  strokes.forEach(drawStroke);
});

// Ghost cursors
socket.on("cursor", data => {
  drawCursor(data.x, data.y, data.color);
});

// Online users list
socket.on("users", users => {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  Object.values(users).forEach(user => {
    const li = document.createElement("li");

    const dot = document.createElement("span");
    dot.textContent = "●";
    dot.style.color = user.color;

    const name = document.createElement("span");
    name.textContent = user.username;

    li.appendChild(dot);
    li.appendChild(name);
    list.appendChild(li);
  });
});

export function emitStroke(stroke) {
  socket.emit("draw", stroke);
}

export function undo() {
  socket.emit("undo", userId);
}

export function sendCursor(pos) {
  socket.emit("cursor", pos);
}
