# Задание для лекции "Типизация: Практика"

В течении практики мы писали дашборд для админа, что бы менять по заданной логике существующих юзеров.
Давайте попробуем расширить наше приложение добавив страничку логина для заданных пользователей, так, что бы:

1. Клиент не мог зайти на страницу [`Dashboard`](https://github.com/JSMonk/typing-practice/blob/homework-task/src/pages/dashboard/index.tsx).
2. Mодератор не мог повышать себя и других модераторов до админа.
3. Модератор не мог понижать админов до модераторов.

Вам дан репозиторий с уже написанной страницей [`Login`](https://github.com/JSMonk/typing-practice/blob/homework-task/src/pages/login/index.tsx) - Ваша задача написать [`LoginService`](https://github.com/JSMonk/typing-practice/blob/homework-task/src/services/login-service.ts), который будет реализовывать логику для этой страницы и поменять [`UserService#getAvailableOperations`](https://github.com/JSMonk/typing-practice/blob/homework-task/src/services/user-service.ts#L37) , что бы не все пользователи имели одинаковый доступ.
