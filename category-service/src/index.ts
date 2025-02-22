import { responseError } from '../src/utils/response'
import { connectMongoDB } from './database/database'
import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import helmet from 'helmet'
import categoryRoutes from './routes/category.route'

require('dotenv').config()

const app: express.Application = express()

// Kết nối MongoDB
connectMongoDB()
app.use(helmet()) // Bảo mật cho ứng dụng
app.use(cors()) // Cho phép cross-origin request
app.use(express.json()) // Xử lý dữ liệu JSON trong body của request
app.use(express.urlencoded({ extended: true })) // Xử lý dữ liệu URL-encoded

app.get('/', (req, res) => {
  res.send('Category service is running!')
})

app.use('/api/categories', categoryRoutes)

// Để xử lý các lỗi nếu có
app.use(function (err: any, req: any, res: any, next: any) {
  responseError(res, err)
})

// Bắt đầu server
app.listen(process.env.PORT, function () {
  console.log(chalk.greenBright(`API listening on port ${process.env.PORT}!`))
})
