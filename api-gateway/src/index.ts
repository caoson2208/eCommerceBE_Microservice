import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL
const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL

app.get('/', (req, res) => {
  res.send('API Gateway is running!')
})

app.use(
  '/api/products',
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/products' },
  })
)

app.use(
  '/api/categories',
  createProxyMiddleware({
    target: CATEGORY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/categories' },
  })
)

app.use(
  '/',
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/' },
  })
)

app.listen(process.env.PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`)
})
