let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let currentPlayer = 1;

function getField() {
  return field;
}

function makeMove(x, y) {
  field[y][x] = 1;
}

function reset() {
  field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function presetField(newField) {
  field = newField;
}

function setCurrentPlayer(i) {
  currentPlayer = i;
}

module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
};
