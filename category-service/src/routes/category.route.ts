import { Router } from 'express'
import { wrapAsync } from '../utils/response'
import categoryController from '../controllers/category.controller'
import categoryMiddleware from '../middleware/category.middleware'
import helpersMiddleware from '../middleware/helper.middleware'

const categoryRouter = Router()

categoryRouter.get(
  '/',
  categoryMiddleware.getCategoryRules(),
  helpersMiddleware.entityValidator as any,
  wrapAsync(categoryController.getCategories) as any
)

categoryRouter.get(
  '/:category_id',
  helpersMiddleware.idRule('category_id') as any,
  helpersMiddleware.idValidator as any,
  wrapAsync(categoryController.getCategory) as any
)

export default categoryRouter
