#language: ru
Функционал: Крестики нолики

    Сценарий: Ход игрока
        Дано пустое поле
        И ходит игрок 1
        Если игрок ходит в клетку 1, 1
        То поле становится "100/000/000"
        Если игрок ходит в клетку 2, 2
        То поле становится "100/020/000"
        Если игрок ходит в клетку 3, 1
        То поле становится "101/020/000"

    Сценарий: Ход игрока в заполненную клетку
        Дано поле "100/200/102"
        И ходит игрок 1
        Если игрок ходит в клетку 1, 2
        То возвращается ошибка
        И поле становится "100/200/102"
        Если игрок ходит в клетку 2, 2
        То поле становится "100/210/102"

    Сценарий: определение победителя по вертикали
        Дано поле "102/120/002"
        И ходит игрок 1
        Если игрок ходит в клетку 1, 3
        То поле становится "102/120/102"
        И победил игрок 1

    Сценарий: определение победителя по горизонтали
        Дано поле "110/120/102"
        И ходит игрок 1
        Если игрок ходит в клетку 3, 1
        То поле становится "111/120/102"
        И победил игрок 1

    Сценарий: определение победителя по диагонали
        Дано поле "002/120/002"
        И ходит игрок 2
        Если игрок ходит в клетку 1, 1
        То поле становится "202/120/002"
        И победил игрок 2

  Структура сценария: играем
    Дано поле <старт>
    И ходит игрок <игрок>
    Если игрок ходит в клетку <x>, <y>
    То поле становится <стало>
    И победил игрок <победитель>

  Примеры:
  | старт       | игрок | x | y | стало         | победитель|
  |"002/120/002"| 2     | 1 | 1 | "202/120/002" | 2         |