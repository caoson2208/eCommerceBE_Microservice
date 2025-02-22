import commonUserRouter from './common-user.router'
import commonAuthRouter from './common-auth.router'


const commonRoutes = {
  prefix: '/api/',
  routes: [
    {
      path: '',
      route: commonUserRouter,
    },
    {
      path: '',
      route: commonAuthRouter,
    }
  ],
}

export default commonRoutes
