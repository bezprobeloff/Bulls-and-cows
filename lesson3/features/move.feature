#language: ru
Функционал: Крестики нолики

  Сценарий: Успешная регистрация нового пользователя user1
    Дано база по умолчанию
    И регистрация с использованием "user1" и "pass1"
    То успешная регистрация
    И "user1" присутствует в базе пользоателей

  Сценарий: Успешная авторизация пользователя ранее созданного user1
    Дано база по умолчанию
    И авторизация с использованием "user1" и "pass1"
    То успешная авторизация

  Сценарий: Успешная регистрация нового пользователя user2
    Дано база по умолчанию
    И регистрация с использованием "user2" и "pass2"
    То успешная регистрация
    И "user2" присутствует в базе пользоателей

  Сценарий: Успешная авторизация пользователя ранее созданного user2
    Дано база по умолчанию
    И авторизация с использованием "user2" и "pass2"
    То успешная авторизация

  Сценарий: User1 создает игру
    Дано новая игра
    И создателем игры становится 'user1'
    И вторым игроком становится 'user2'

  Сценарий: создание новой игры
    Дано пользователь "denis"
    Когда создает новую игру
    То в базе создается игра созданная пользователем "denis"

  Сценарий: просмотр существующих игр
    Дано пользователь "denis"
    Когда запрашивает список игр
    То возвращается список "games"

  Сценарий: подключение к игре
    Дано пользователь "denis"
    И игра "1"
    Когда пользователь подключается к игре
    То в игре "1" "player2" становится "denis"

  Сценарий: Ход игрока
    Дано пустое поле
    И ходит игрок 'user1'
    Если игрок ходит в клетку 1, 1
    То поле становится "100|000|000"
    Если игрок ходит в клетку 2, 2
    То поле становится "100|020|000"
    Если игрок ходит в клетку 3, 1
    То поле становится "101|020|000"

  Сценарий: Ход игрока в заполненную клетку
    Дано поле "100|200|102"
    И ходит игрок 'user1'
    Если игрок ходит в клетку 1, 2
    То возвращается ошибка
    И поле становится "100|200|102"
    Если игрок ходит в клетку 2, 2
    То поле становится "100|210|102"

  Сценарий: определение победителя по вертикали
    Дано поле "102|120|002"
    И ходит игрок 'user1'
    Если игрок ходит в клетку 1, 3
    То поле становится "102|120|102"
    И победил игрок 'user1'

  Сценарий: определение победителя по горизонтали
    Дано поле "110|120|102"
    И ходит игрок 'user1'
    Если игрок ходит в клетку 3, 1
    То поле становится "111|120|102"
    И победил игрок 'user1'

  Сценарий: определение победителя по диагонали
    Дано поле "002|120|002"
    И ходит игрок 'user2'
    Если игрок ходит в клетку 1, 1
    То поле становится "202|120|002"
    И победил игрок 'user2'


