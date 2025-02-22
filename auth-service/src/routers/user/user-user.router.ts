import { Router } from 'express'
import { wrapAsync } from '../../utils/response'
import helpersMiddleware from '../../middleware/helper.middleware'
import userMiddleware from '../../middleware/user.middleware'
import authMiddleware from '../../middleware/auth.middleware'
import userController from '../../controllers/user.controller'

export const userUserRouter = Router()
userUserRouter.put(
  '',
  userMiddleware.updateMeRules(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  wrapAsync(userController.updateMe)
)
userUserRouter.post(
  '/upload-avatar',
  authMiddleware.verifyAccessToken,
  wrapAsync(userController.uploadAvatar)
)

userUserRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  wrapAsync(userController.getDetailMySelf)
)
