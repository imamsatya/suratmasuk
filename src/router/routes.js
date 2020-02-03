
const routes = [
  {
    path: '/',
    name: 'loginnya',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-Login.vue')
    }]

  },
  {
    path: '/home',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Index.vue')
    }]
  },
  {
    path: '/disposisi',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-Disposisi.vue')
    }]
  },
  {
    path: '/about',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-About.vue')
    }]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
