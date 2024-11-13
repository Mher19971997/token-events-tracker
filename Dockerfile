# Используем образ Node.js
FROM node:lts-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы в рабочую директорию
COPY . .

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]
