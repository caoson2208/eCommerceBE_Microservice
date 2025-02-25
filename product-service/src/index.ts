import { responseError } from './utils/response'
import { FOLDERS, FOLDER_UPLOAD, ROUTE_IMAGE } from './constants/config'
import { connectMongoDB } from './database/database'
import { isProduction } from './utils/helper'
import path from 'path'
import axios from 'axios'
import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import helmet from 'helmet'
import productRoutes from './routes/product.route'
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
  res.send('Product service is running!')
})

const dirNameWithEnv = isProduction ? path.dirname(__dirname) : __dirname
const handlerImage: any = Object.values(FOLDERS).reduce(
  (result: any, current: any) => {
    return [
      ...result,
      express.static(path.join(dirNameWithEnv, `/${FOLDER_UPLOAD}/${current}`)),
    ]
  },
  [express.static(path.join(dirNameWithEnv, `/${FOLDER_UPLOAD}`))]
)
app.use(`/${ROUTE_IMAGE}`, ...handlerImage)

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

// Để xử lý các lỗi nếu có
app.use(function (err: any, req: any, res: any, next: any) {
  responseError(res, err)
})

// Bắt đầu server
app.listen(process.env.PORT, function () {
  console.log(chalk.greenBright(`API listening on port ${process.env.PORT}!`))
})
