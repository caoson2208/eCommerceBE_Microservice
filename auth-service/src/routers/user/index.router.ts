import { userUserRouter } from './user-user.router'

const userRoutes = {
  prefix: '/api/',
  routes: [
    {
      path: 'user',
      route: userUserRouter,
    },
  ],
}

export default userRoutes
