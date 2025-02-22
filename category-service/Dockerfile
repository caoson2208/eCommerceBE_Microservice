FROM node:18-alpine 

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 4002

# Chạy server
CMD ["yarn", "start"]
