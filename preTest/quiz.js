const fs = require(`fs`);
const path = require(`path`);
const readlineSync = require(`readline-sync`);
//путь к своей папке
const rootPath = path.dirname(path.resolve(`quiz.js`));
const numberQuestions = 5;
let listFiles = [];

//Генерация выбора вопроса
function randomQuestion() {
  return Math.round(Math.random() * (listFiles.length - 1));
}

function play() {
  try {
    let countTrueAnswer = 0;
    const questionsPath = path.join(rootPath, `questions`);
    const isFile = fileName => {
      return fs.lstatSync(fileName).isFile()
    }

    listFiles = fs.readdirSync(questionsPath)
      .map(fileName => {
        return path.join(questionsPath, fileName);
      })
      .filter(isFile);

    counterQuestions = numberQuestions;
    while (counterQuestions-- && listFiles.length > 0) {
      const question = randomQuestion();
      const data = fs.readFileSync(listFiles[question]).toString();
      listFiles.splice(question, 1);
      let trueAnswer = ``;
      data.split(`\n`).forEach((item, index) => {
        if (index === 0) {
          console.log(item);
        } else if (index === 1) {
          trueAnswer = item;
        } else {
          console.log(item);
        }
      });
      const answerUser = readlineSync.question(`Enter a number answer: `);
      if (trueAnswer === answerUser) {
        countTrueAnswer++;
      }
    }
    console.log(`Количество правильных ответов: ${countTrueAnswer}`);
  } catch (err) {
    console.error(err);
  }
}

play();
