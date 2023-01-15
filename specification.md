# Инструкция по запуску проекта

## Установка зависимостей

### Перейдите в директорию с проектом в терминале и выполните команду: npm i
```
/taskforce

npm i
```

## Переменные окружения

### Сервис Users

#### Создайте файл .users.env в директории /taskforce/environments по примеру /taskforce/environments/.users.env-example

```
MONGO_DB=taskforce-users               - наименование базы данных
MONGO_HOST=localhost                   - хост базы данных
MONGO_PORT=27019                       - порт базы данных
MONGO_USER=admin                       - логин пользователя базы данных
MONGO_PASSWORD=test                    - пароль пользователя базы данных
MONGO_AUTH_BASE=admin                  - администратор базы данных

JWT_ACCESS_SECRET=secret               - секрет для JWT 
JWT_REFRESH_SECRET=secretRefresh       - секрет для refresh JWT 

RABBIT_USER=admin                      - логин пользователя брокера сообщений
RABBIT_PASSWORD=test                   - пароль пользователя брокера сообщений
RABBIT_HOST=localhost                  - хост брокера сообщений
RABBIT_USERS_SERVICE_QUEUE=subscribe   - очередь для брокера сообщений

UPLOAD_DESTINATION='./upload'          - директория для загрузки файлов

PORT=3334                              - номер порта для запуска сервера
HOST=localhost                         - хост сервера
```

### Сервис Tasks

#### Создайте файл .tasks.env в директории /taskforce/environments по примеру /taskforce/environments/.tasks.env-example

```
RABBIT_USER=admin                      - логин пользователя брокера сообщений
RABBIT_PASSWORD=test                   - пароль пользователя брокера сообщений
RABBIT_HOST=localhost                  - хост брокера сообщений
RABBIT_TASKS_SERVICE_QUEUE=tasks       - очередь для брокера сообщений

JWT_ACCESS_SECRET=secret               - секрет для JWT 
JWT_REFRESH_SECRET=secretRefresh       - секрет для refresh JWT 

UPLOAD_DESTINATION='./upload'          - директория для загрузки файлов

PORT=3335                              - номер порта для запуска сервера
HOST=localhost                         - хост сервера
```

### Сервис Notify

#### Создайте файл .notify.env в директории /taskforce/environments по примеру /taskforce/environments/.notify.env-example

```
MAIL_SMTP_HOST=localhost               - хост почтового клиента
MAIL_SMTP_PORT=5025                    - порт почтового клиента
MAIL_USER_NAME=admin                   - логин пользователя почтового клиента
MAIL_USER_PASSWORD=test                - пароль пользователя почтового клиента
MAIL_FROM=<noreply@notify.local>       - email отправителя

MONGO_DB=taskforce-notify              - наименование базы данных
MONGO_HOST=localhost                   - хост базы данных
MONGO_PORT=27018                       - порт базы данных
MONGO_USER=admin                       - логин пользователя базы данных
MONGO_PASSWORD=test                    - пароль пользователя базы данных
MONGO_AUTH_BASE=admin                  - администратор базы данных

RABBIT_USER=admin                      - логин пользователя брокера сообщений
RABBIT_PASSWORD=test                   - пароль пользователя брокера сообщений
RABBIT_HOST=localhost                  - хост брокера сообщений
RABBIT_NOTIFY_SERVICE_QUEUE=subscribe  - очередь для брокера сообщений
RABBIT_TASKS_SERVICE_QUEUE=tasks       - очередь для брокера сообщений

PORT=3333                              - номер порта для запуска сервера
HOST=localhost                         - хост сервера
```



## Запуск Docker


### 1. Запустите десктопное приложение Docker Desktop

### 2. Разверните docker контейнер для сервиса Users:

```
taskforce/apps/users

docker-compose up -d
```

### 3. Разверните docker контейнер для сервиса Tasks:

```
taskforce/apps/tasks

docker-compose up -d
```

### 4. Разверните docker контейнер для сервиса Notify:

```
taskforce/apps/notify

docker-compose up -d
```

## Запуск сервисов

### Для запуска сервисов, введите следующую команду в терминале:

```
nx run-many --target=serve --projects=users,tasks,notify
```