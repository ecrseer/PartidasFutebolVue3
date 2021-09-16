import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue' 
import Times from './pages/Times.vue'

const routes = [
  { path: '/', name:'home', component: Home }, 
  { path: '/times', name:'Times', component: Times },/*
  { path: '/filme/:id', name:'detalhes', component: Detalhes }, */
]

const rotas = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default rotas
