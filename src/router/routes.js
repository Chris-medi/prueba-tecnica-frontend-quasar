const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/displayFilesLayout.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('pages/FilesPage.vue'),
    children: [
      {
        path: '',
        name: 'Display',
        components: {
          files: () => import('layouts/displayFilesLayout.vue')
        }
      },
      {
        path: '/create',
        name: 'Create',
        components: {
          files: () => import('layouts/createLayout.vue')
        }
      },
      {
        path: '/update/:id',
        name: 'Update',
        components: {
          files: () => import('layouts/UpdateFileLayout.vue')
        }
      }
    ]
  }
  // ,
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue')
  // }
]

export default routes
