# Sử dụng Node.js LTS
FROM node:18-alpine 

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code vào container
COPY . .

# Expose cổng dịch vụ
EXPOSE 4000

# Chạy server
CMD ["yarn", "start"]
