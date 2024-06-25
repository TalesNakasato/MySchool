// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Main.vue'),
      },
    ],
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import('@/components/students.vue'),
  },
  {
    path: '/students/create-students',
    name: 'createStudents',
    component: () => import('@/components/createStudents.vue'),
  },
  {
    path: '/students/edit',
    name: 'editStudent',
    component: () => import('@/components/editStudent.vue')
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: () => import('@/components/teachers.vue'),
  },
  {
    path: '/teachers/create-teacher',
    name: 'createTeacher',
    component: () => import('@/components/createTeacher.vue'),
  },
  {
    path: '/teachers/edit',
    name: 'editTeacher',
    component: () => import('@/components/editTeacher.vue'),
  },
  {
    path: '/classes',
    name: 'Classes',
    component: () => import('@/components/classes.vue'),
  },
  {
    path: '/create-classes',
    name: 'createClasses',
    component: () => import('@/components/createClasses.vue'),
  },
  {
    path: '/students/registrations',
    name: 'studentRegistrations',
    component: () => import('@/components/studentsRegistrations.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
