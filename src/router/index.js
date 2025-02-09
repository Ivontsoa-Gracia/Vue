import { createRouter, createWebHistory } from 'vue-router';

import AdminLogin from '../components/pages/backOffice/AdminLogin.vue';
import AdminSignin from '../components/pages/backOffice/AdminSignin.vue';
import SideBar from '../components/pages/backOffice/SideBar.vue';

import GestionIngredient from '../components/pages/backOffice/ingredient/GestionIngredient.vue';
import GestionPlat from '../components/pages/backOffice/plat/GestionPlat.vue';
import GestionRecette from '../components/pages/backOffice/recette/GestionRecette.vue';
import DashBoard from '../components/pages/backOffice/dashboard/DashBoard.vue';

import PageLogin from '../components/pages/frontOffice/PageLogin.vue';
import PageSignin from '../components/pages/frontOffice/PageSignin.vue';

import ListeCommande from '../components/pages/frontOffice/commande/ListeCommande.vue';

const routes = [
  {
    path: '/',
    redirect: '/admin-login',  // Redirection par défaut
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin-signin',
    name: 'AdminSignin',
    component: AdminSignin,
  },

  {
    path: "/admin-service",
    name: "SideBar",
    component: SideBar,
    children: [
      {
        path: '/gestion-ingredient',
        name: 'GestionIngredient',
        component: GestionIngredient,
      },
      {
        path: '/gestion-plat',
        name: 'GestionPlat',
        component: GestionPlat,
      },
      {
        path: '/gestion-recette',
        name: 'GestionRecette',
        component: GestionRecette,
      },
      {
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoard,
      },
    ],
  },

  {
    path: '/user-login',
    name: 'PageLogin',
    component: PageLogin,
  },
  {
    path: '/user-signin',
    name: 'PageSignin',
    component: PageSignin,
  },
  {
    path: '/liste-commande',
    name: 'ListeCommande',
    component: ListeCommande,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
