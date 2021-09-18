import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue' 
import ListaTimes from './pages/ListaTimes.vue'
import ListaPartidas from './pages/ListaPartidas.vue'
import CriarTime from './pages/CriarTime.vue'
import EditarTime from './pages/EditarTime.vue'
import CriarPartida from './pages/CriarPartida.vue'

const routes = [
  { path: '/', name:'home', component: Home }, 
  { path: '/times', name:'ListaTimes', component: ListaTimes },
  { path: '/partidas', name:'ListaPartidas', component: ListaPartidas },
  { path: '/partidas/criar', name:'CriarPartida', component: CriarPartida },
  { path: '/times/criar', name:'CriarTime', component: CriarTime },
  { path: '/times/editar/:idtime', name:'EditarTime', component: EditarTime },/*
  { path: '/filme/:id', name:'detalhes', component: Detalhes }, */
]

const rotas = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default rotas
