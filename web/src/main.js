import { createApp } from 'vue'
import store from './store'
import mitt from 'mitt'

import rotas from './rotas.js'

import App from './App.vue'
const bus = mitt()
const app = createApp(App)

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './style/estilo.css'

app.use(rotas)
app.use(store)

app.config.globalProperties.$bus = bus
app.mount('#app')
