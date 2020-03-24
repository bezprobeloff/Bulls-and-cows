let field = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let currentPlayer = 1;

function getField() {
  return field;
}

function makeMove(x, y) {
  if (correctMove(x, y)) {
    field[y - 1][x - 1] = currentPlayer;
    (currentPlayer === 1) ? setCurrentPlayer(2)
      : setCurrentPlayer(1);
  }
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

function correctMove(x, y) {
  if (field[y - 1][x - 1] !== 0) return false;

  return true;
}

// конвертируем массив в текстовый вариант
function convertArrToTxt(arr) {
  return arr
    .map((item) => item.join(''))
    .join('|');
}

// конвертируем текс в массив
function convertTxtToArr(txt) {
  return txt.split('|')
    .map((item) => item.split('')
      .map((itemX) => Number.parseInt(itemX, 10)));
}

function getWinner(box) {
  const arrBox = box.split('/');
  // создаем массив переводим вертикальные строки в горизонтальные
  const arrVertical = ['', '', ''];
  const arrDiagonal = ['', ''];
  arrBox.forEach((item) => {
    item.split('').forEach((char, index) => {
      arrVertical[index] += char;
    });
  });

  arrBox.forEach((item, index) => {
    item.split('').forEach((char, indexChar) => {
      if (index === indexChar) arrDiagonal[0] += char;
      if (indexChar === (item.length - 1) - index) arrDiagonal[1] += char;
    });
  });

  const checkHorizontal = arrBox
    .filter((item) => item.match(/(.)\1{2}/i) !== null);

  const checkVertical = arrVertical
    .filter((item) => item.match(/(.)\1{2}/i) !== null);

  const checkDiagonal = arrDiagonal
    .filter((item) => item.match(/(.)\1{2}/i) !== null);

  if (checkHorizontal.length > 0) return checkHorizontal[0].match(/./i)[0];
  if (checkVertical.length > 0) return checkVertical[0].match(/./i)[0];
  if (checkDiagonal.length > 0) return checkDiagonal[0].match(/./i)[0];
  return 0;
}

module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
  correctMove,
  convertArrToTxt,
  convertTxtToArr,
};
