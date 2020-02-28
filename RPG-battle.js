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
  const arrAction = monster.moves.filter((item) => {
    if (!(`counterMove` in item))
      return item;
  }).map((item) => item.name);

  return arrAction[Math.round(Math.random() * (arrAction.length - 1))];
}

function actionMonster() {
  let monsterMove;

  monster.action = randomAction();
  monsterMove = monster.moves.find(item => item.name === monster.action);

  console.log(monster.name + ` использует ` + monster.action);
  updateCounterMove(monster.moves);
  addCounterMove(monsterMove);
  resultAction(monster, wizard);
}

function actionWizard() {
  messageSelectAction();
  let numberAction;
  numberAction = readlineSync.question(`Enter a number action (0 - `
    + (wizard.moves.length - 1) + `): `);
  wizard.action = wizard.moves[numberAction].name;
  let wizardMove = wizard.moves.find(item => item.name === wizard.action);
  console.log(wizard.name + ` использует ` + wizard.action);
  updateCounterMove(wizard.moves);
  addCounterMove(wizardMove);
  resultAction(wizard, monster);
}

function selectAction() {

}

function messageSelectAction() {
  let actions = wizard.moves.reduce((action, current, index, array) => {
    if (`counterMove` in current) {
      return action;
    } else if (index === array.length - 1) {
      return action + current.name + ` - ` + index;
    } else {
      return action + current.name + ` - ` + index + `, `;
    }
  }, ``);
  console.log(`Вам доступны действия: ` + actions);
}

function addCounterMove(playerMove) {
  if (playerMove.cooldown > 0) {
    playerMove.counterMove = playerMove.cooldown;
  }
}

function updateCounterMove(playerMoves) {
  playerMoves.forEach((item) => {
    if (`counterMove` in item) {
      if (item.counterMove === 1) {
        delete item[`counterMove`];
      } else if (item.counterMove > 1) {
        item.counterMove--;
      }
    }
  });
}

//Проверка на разрешение хода
function checkSelectMove(playerMove) {
  if (`counterMove` in playerMove) {
    return false;
  }
  return true;
}

function resultAction(player, attacker) {
  if ((`action` in player) && (`action` in attacker)) {
    let actionPlayer = player.moves.find(item => item.name === player.action);
    let actionAttacker = attacker.moves.find(item => item.name === attacker.action);
    let physicalDmg = actionAttacker.physicalDmg
      - Math.round(actionAttacker.physicalDmg * actionPlayer.physicArmorPercents / 100);
    let magicDmg = actionAttacker.magicDmg
      - Math.round(actionAttacker.magicDmg * actionPlayer.magicArmorPercents / 100);
    player.maxHealth -= physicalDmg + magicDmg;
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
