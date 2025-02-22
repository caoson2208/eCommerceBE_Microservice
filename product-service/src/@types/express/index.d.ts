import { JwtPayload } from 'jsonwebtoken'

declare namespace Express {
  export interface Request {
    jwtDecoded?: JwtPayload & { roles?: string[] }
  }
}
