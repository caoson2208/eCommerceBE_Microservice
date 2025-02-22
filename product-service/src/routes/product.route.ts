import { Router } from 'express'
import { wrapAsync } from '../utils/response'
import ProductController from '../controllers/product.controller'
import productMiddleware from '../middleware/product.middleware'
import helpersMiddleware from '../middleware/helper.middleware'

const productRouter = Router()
/**
 * [Get products paginate]
 * @queryParam type: string, page: number, limit: number, category:mongoId, exclude: mongoId product
 * @route products
 * @method get
 */
productRouter.get(
  '/',
  ...productMiddleware.getProductsRules(),
  helpersMiddleware.entityValidator as any,
  wrapAsync(ProductController.getProducts) as any
)

productRouter.get(
  '/:product_id',
  helpersMiddleware.idRule('product_id') as any,
  helpersMiddleware.idValidator as any,
  wrapAsync(ProductController.getProduct) as any
)

productRouter.put(
  '/:product_id',
  helpersMiddleware.idRule('product_id') as any,
  helpersMiddleware.idValidator as any,
  productMiddleware.updateProductRules() as any,
  helpersMiddleware.entityValidator as any,
  wrapAsync(ProductController.updateProduct) as any
)

productRouter.delete(
  '/:product_id',
  helpersMiddleware.idRule('product_id') as any,
  helpersMiddleware.idValidator as any,
  wrapAsync(ProductController.deleteProduct) as any
)

productRouter.get('/search', wrapAsync(ProductController.searchProduct) as any)
export default productRouter
