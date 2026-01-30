import { getCanvas, drawStroke } from "./canvas.js";
import { emitStroke, undo, userId, sendCursor } from "./websocket.js";

const canvas = getCanvas();

let drawing = false;
let path = [];
let color = "#000000";
let width = 2;
let erasing = false;

// Toolbar controls
document.getElementById("colorPicker").onchange = e => {
  color = e.target.value;
  erasing = false;
};

document.getElementById("brushSize").oninput = e => {
  width = e.target.value;
};

document.getElementById("eraser").onclick = () => {
  erasing = true;
};

document.getElementById("undo").onclick = undo;

// Drawing logic
canvas.addEventListener("mousedown", e => {
  drawing = true;
  path = [{ x: e.clientX, y: e.clientY }];
});

canvas.addEventListener("mousemove", e => {
  sendCursor({ x: e.clientX, y: e.clientY });

  if (!drawing) return;

  const point = { x: e.clientX, y: e.clientY };
  path.push(point);

  drawStroke({
    path: path.slice(-2),
    color: erasing ? "#ffffff" : color,
    width
  });
});

canvas.addEventListener("mouseup", () => {
  if (!drawing) return;
  drawing = false;

  emitStroke({
    path,
    color: erasing ? "#ffffff" : color,
    width,
    userId
  });

  path = [];
});
