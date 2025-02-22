import adminUserRouter from './admin-user.route'
import adminAuthRouter from './admin-auth.router'
import adminProductRouter from './admin-user.route'

const adminRoutes = {
  prefix: '/api/admin/',
  routes: [
    {
      path: 'users',
      route: adminUserRouter,
    },
    {
      path: 'products',
      route: adminProductRouter,
    },
    {
      path: '',
      route: adminAuthRouter,
    },
  ],
}

export default adminRoutes
