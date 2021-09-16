import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue' 
import ListaTimes from './pages/ListaTimes.vue'
import CriarTime from './pages/CriarTime.vue'

const routes = [
  { path: '/', name:'home', component: Home }, 
  { path: '/times', name:'ListaTimes', component: ListaTimes },
  { path: '/times/criar', name:'CriarTime', component: CriarTime },/*
  { path: '/filme/:id', name:'detalhes', component: Detalhes }, */
]

const rotas = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default rotas
