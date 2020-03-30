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

//Генерация действия для монстра
function randomAction() {
  const arrAction = monster.moves.filter((item) => {
    if (!(`counterMove` in item))
      return item;
  }).map((item) => item.name);

  return arrAction[Math.round(Math.random() * (arrAction.length - 1))];
}

//Действия монстра
function actionMonster() {
  monster.action = randomAction();
  const monsterMove = monster.moves.find(item => item.name === monster.action);

  console.log(monster.name + ` использует ` + monster.action);
  updateCounterMove(monster.moves);
  addCounterMove(monsterMove);
  resultAction(monster, wizard);
}

//Действия мага
function actionWizard() {
  messageSelectAction();
  const numberAction = readlineSync.question(`Enter a number action: `);
  wizard.action = wizard.moves[numberAction].name;
  const wizardMove = wizard.moves.find(item => item.name === wizard.action);
  console.log(wizard.name + ` использует ` + wizard.action);
  updateCounterMove(wizard.moves);
  addCounterMove(wizardMove);
  resultAction(wizard, monster);
}

//Предлагает возможные варианты действий
function messageSelectAction() {
  const actions = wizard.moves
    //фильтруем массив на разрешенные действия
    .filter((item) => {
      if (!(`counterMove` in item))
        return item;
    })
    //генерим текст доступных действий
    .reduce((action, current, index, array) => {
      let countAction;
      wizard.moves.find((item, index) => {
        if(item.name === current.name) {
          countAction = index;
        }
      });
      if (index === array.length - 1) {
        return action + current.name + ` - ` + countAction;
      } else {
        return action + current.name + ` - ` + countAction + `, `;
      }
    }, ``);

  console.log(`Вам доступны действия: ` + actions);
}

//Добавим счетчик кулдауна
function addCounterMove(playerMove) {
  if (playerMove.cooldown > 0) {
    playerMove.counterMove = playerMove.cooldown;
  }
}

//Обновим счетчик кулдаунов
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

//Результат действия противников
function resultAction(player, attacker) {
  if ((`action` in player) && (`action` in attacker)) {
    const actionPlayer = player.moves.find(item => item.name === player.action);
    const actionAttacker = attacker.moves.find(item => item.name === attacker.action);
    const physicalDmg = actionAttacker.physicalDmg
      - Math.round(actionAttacker.physicalDmg * actionPlayer.physicArmorPercents / 100);
    const magicDmg = actionAttacker.magicDmg
      - Math.round(actionAttacker.magicDmg * actionPlayer.magicArmorPercents / 100);
    player.maxHealth -= (physicalDmg + magicDmg);
  }
  if (monster.maxHealth <= 0 || wizard.maxHealth <= 0) {
    (monster.maxHealth <= 0) ? console.log(`Вы победили`) : console.log(`Вы проиграли`);
  }
}

//Точка входа. Начало игры
function play() {
  wizard.maxHealth = readlineSync.question(`Enter a maxHealth: `);
  while (true) {
    if (monster.maxHealth <= 0 || wizard.maxHealth <= 0) return;
    actionMonster();
    if (monster.maxHealth <= 0 || wizard.maxHealth <= 0) return;
    actionWizard();
  }
}

play();
