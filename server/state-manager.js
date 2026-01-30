let strokes = [];

function addStroke(stroke) {
  strokes.push(stroke);
}

function undoStroke(userId) {
  for (let i = strokes.length - 1; i >= 0; i--) {
    if (strokes[i].userId === userId) {
      strokes.splice(i, 1);
      break;
    }
  }
}

function getStrokes() {
  return strokes;
}

module.exports = {
  addStroke,
  undoStroke,
  getStrokes
};
