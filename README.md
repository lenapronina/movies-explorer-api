# movies-explorer-api

Бэкенд проекта movies-explorer

![Project preview](https://previews.dropbox.com/p/thumb/ABHkkHMDUnHeTwMX5MHeaLDqOCGWCA_o4icHFJA9vGeNl7N331xfQoF8zXjdhCRP7-01P2fPT1yu1fZUz7fcNMX5DAXfyxkrK5obPAvpzIVqTyKgfKpn8Q_jSWJJTwH4VfVgQEInxhmB0dFhd7UGeeDFcV5IlLkc3WwyLq7Jum89LPAp_OiqcMpL5ej9PKAZcJ67yrr2bzsl15r3hZd_72ZI8NUjA7yjHIKOu_xd6pC0nYX2rUwZCj9PVSG-bQBXYsiX-EFwlr2WjhxvUklgZIu-1M2lt_eCj4l7Qai_FxxT56O-rhUBB6BXnv5K40WqVC6UQgoxuIeNyxop6WIMg5v676jxck0UVO5rAhzGBucXbA/p.png?fv_content=true&size_mode=5)

- Публичный IP-адрес сервера: **178.154.254.122**
- Домен api:  **api.dontbeatfilm.students.nomoredomains.work**

### Начать работу

1. Склонируйте репозиторий:
    
  ```
  # по https
  git clone https://github.com/lenapronina/movies-explorer-api.git
  
  # по ssh
  git@github.com:lenapronina/movies-explorer-api.git 
  ```

2. Установите нужные модули из package.json

  ```
  npm install
  ```

3. Запустите сервер mongo

  ```
  mongod
  ```

4. Запустите приложение
  
  ```
  # запуск в production режиме
  npm run start
  
  # запуск в dev режиме, c функцией hot-reload
  npm run dev
  ```

### Доступная функциональность
  1. Регистрация и авторизация пользователя:
  ```
  # создание пользователя
  POST /signup
  # вход в систему
  POST /signin 
  ```
  2. Работа с данными пользователя:
  ```
  # получение данных
  GET /users/me
  
  # обновление информации
  PUT /users/me
  
  ```
  3. Работа с данными о фильмах:
  
  ```
  # получение сохраненных фильмов
  GET /movies
  
  # добавление нового фильма
  POST /movies
  
  # удаление фильма
  DELETE /movies/movieId 
  ```

### **Используемые технологии**

git · npm · JS · Node JS · Express JS · MongoDB · Nginx · YandexCloud