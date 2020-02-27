const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      "name": "Удар когтистой лапой",
      "physicalDmg": 3, // физический урон
      "magicDmg": 0,    // магический урон
      "physicArmorPercents": 20, // физическая броня
      "magicArmorPercents": 20,  // магическая броня
      "cooldown": 0     // ходов на восстановление
    },
    {
      "name": "Огненное дыхание",
      "physicalDmg": 0,
      "magicDmg": 4,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 3
    },
    {
      "name": "Удар хвостом",
      "physicalDmg": 2,
      "magicDmg": 0,
      "physicArmorPercents": 50,
      "magicArmorPercents": 0,
      "cooldown": 2
    },
  ]
}

const wizard = {
  maxHealth: 10,
  name: "Евстафий",
  moves: [
    {
      "name": "Удар боевым кадилом",
      "physicalDmg": 2,
      "magicDmg": 0,
      "physicArmorPercents": 0,
      "magicArmorPercents": 50,
      "cooldown": 0
    },
    {
      "name": "Вертушка левой пяткой",
      "physicalDmg": 4,
      "magicDmg": 0,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 4
    },
    {
      "name": "Каноничный фаербол",
      "physicalDmg": 0,
      "magicDmg": 5,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 3
    },
    {
      "name": "Магический блок",
      "physicalDmg": 0,
      "magicDmg": 0,
      "physicArmorPercents": 100,
      "magicArmorPercents": 100,
      "cooldown": 4
    },
  ]
}

const readlineSync = require(`readline-sync`);

function randomAction() {
  return monster.moves[Math.round(Math.random() * (monster.moves.length - 1))];
}

function actionMonster() {
  monster.action = randomAction().name;
  console.log(`Лютый использует ` + monster.action);
  resultAction(monster, wizard);
}

function actionWizard() {
  let numberAction = readlineSync.question(`Enter a number action (0 - `
    + (wizard.moves.length - 1) + `): `);
  wizard.action = wizard.moves[numberAction].name;
  console.log(`Евстафий использует ` + wizard.action);
  resultAction(wizard, monster);
}

function resultAction(player1, player2) {
  if ((`action` in player1) && (`action` in player2)) {
    let actionPlayer1 = player1.moves.find(item => item.name === player1.action);
    let actionPlayer2 = player2.moves.find(item => item.name === player2.action);
    let physicalDmg = actionPlayer2.physicalDmg
      - Math.round(actionPlayer2.physicalDmg * actionPlayer1.physicArmorPercents / 100);
    let magicDmg = actionPlayer2.magicDmg
      - Math.round(actionPlayer2.magicDmg * actionPlayer1.magicArmorPercents / 100);
    player1.maxHealth -= physicalDmg + magicDmg;
  }
}

function play() {
  wizard.maxHealth = readlineSync.question(`Enter a maxHealth: `);
  while (true) {
    actionMonster();
    actionWizard();
    console.log(wizard.maxHealth + `  ` + monster.maxHealth);
    if (wizard.maxHealth <= 0) {
      console.log(`Вы проиграли`);
      return;
    }
    if (monster.maxHealth <= 0) {
      console.log(`Вы победили`);
      return;
    }
  }
}

play();
