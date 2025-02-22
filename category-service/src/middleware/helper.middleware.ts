import { Request, Response, NextFunction } from 'express'
import { validationResult, check, body } from 'express-validator'
import { STATUS } from '../constants/status'
import { responseError, ErrorHandler } from '../utils/response'
import { isMongoId } from '../utils/validate'
import { ErrorThrow } from '../@types/response.type'

const idRule = (...id: string[]) => {
  return id.map((item) => {
    return check(item).isMongoId().withMessage(`${item} không đúng định dạng`)
  })
}

const listIdRule = (list_id: string) => {
  return body(list_id)
    .custom((value: string[]) => value.findIndex((item) => !isMongoId(item)))
    .withMessage(`${list_id} không đúng định dạng`)
}

const idValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const error: ErrorThrow = errors
    .array({ onlyFirstError: true })
    .reduce((result: any, item, index) => {
      result[item.param] = item.msg
      return result
    }, {})
  return responseError(
    res as any,
    new ErrorHandler(STATUS.BAD_REQUEST, error.message)
  )
}

function entityValidator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const error: ErrorThrow = errors
    .array({ onlyFirstError: true })
    .reduce((result: any, item, index) => {
      result[item.param] = item.msg
      return result
    }, {})

  return responseError(
    res as any,
    new ErrorHandler(STATUS.BAD_REQUEST, error.message)
  )
}

const helpersMiddleware = {
  idRule,
  idValidator,
  entityValidator,
  listIdRule,
}
export default helpersMiddleware
