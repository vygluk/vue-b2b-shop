import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import GuestLayout from '../components/GuestLayout.vue';
import Home from '../views/Home.vue'
import Makes from '../views/Makes.vue'
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta:
          {
            requiresAuth: true
          }
      },
    ]
  },
  {
    path: '/guest',
    component: GuestLayout
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
