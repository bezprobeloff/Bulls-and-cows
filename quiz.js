const fs = require(`fs`);
const path = require(`path`);
//путь к своей папке
const rootPath = path.dirname(path.resolve(`quiz.js`));
const numberQuestions = 5;

function play() {
  try {
    const questionsPath = path.join(rootPath, `questions`);
    const isFile = fileName => {
      return fs.lstatSync(fileName).isFile()
    }

    let listFiles = fs.readdirSync(questionsPath)
      .map(fileName => {
        return path.join(questionsPath, fileName);
      })
      .filter(isFile);

    counterQuestions = numberQuestions;
    while (counterQuestions-- && listFiles.length > 0) {
      const data = fs.readFileSync(path.join(questionsPath, `1.txt`)).toString();
      console.log(data.split(`\n`));
    }



  } catch (err) {
    console.error(err);
  }
}

play();


