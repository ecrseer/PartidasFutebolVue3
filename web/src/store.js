import {createStore} from 'vuex'
import axios from 'axios'
import { baseUrlApi } from './const'

const store = createStore({
  state() {  // equivalente ao data de um componente
    return {
      carregando: false,
      times: [],
      jogadores:[],
      partidas:[],
      gols:[]
    }
  },
  getters: { // equivalente ao computed de um componente
    getEntePorId(state) {
      return function(entenome,idEnte){
        
        let enteFiltrado = state[entenome].filter(
            (ente) => `${ente.id}` === `${idEnte}`)[0]; 
            debugger
            return enteFiltrado;
      }
    },
  },
  mutations: { // altera o state
    carregando(state) {
      state.carregando = true
    },
    time_carregado(state, times) {
      state.times = times
      state.carregando = false
    },
    jogador_carregado(state, jogadors) {
      state.jogadores = jogadors
      state.carregando = false
    },
    partida_carregado(state, partidas) {
      state.partidas = partidas
      state.carregando = false
    },
    gol_carregado(state, gols) {
      state.gols = gols
      state.carregando = false
    },
    time_apagar(state, time) {
      let index = state.times.indexOf(time)
      if (index >= 0) {
        state.times.splice(index, 1)
      }
      state.carregando = false
    },
    time_editar(state, {original, editado}) {
      Object.assign(original, editado)
      state.carregando = false
    },
    time_criar(state, time) {
      state.times.push(time)
      state.carregando = false
    }
  },
  actions: { // equivalente ao methods de um componente
    async carregar({commit}) {
      commit('carregando')
      axios.get(baseUrlApi.times).then(({data}) => {
        console.log(baseUrlApi.times)
        commit('time_carregado', data)
      })
      axios.get(baseUrlApi.jogadores).then(({data}) => {
        console.log(baseUrlApi.jogadores)
        commit('jogador_carregado', data)
      })
      axios.get(baseUrlApi.gols).then(({data}) => {
        console.log(baseUrlApi.gols)
        commit('gol_carregado', data)
      })
      axios.get(baseUrlApi.partidas).then(({data}) => {
        console.log(baseUrlApi.partidas)
        commit('partida_carregado', data)
      })
      
    },
    async apagar({commit}, time) {
      commit('carregando')
 
      await axios.delete(`https://sheetdb.io/api/v1/cuyfdc2x1vwf4/id/${time.id}`)
      commit('time_apagar', time)

    },
    async criarTime({commit}, time) {
      commit('carregando')
      await axios.post( baseUrlApi.times, {...time} )
      commit('time_criar', time)

    },
    async editar({commit}, {original, editado}) {
      commit('carregando')

      await axios.put(
        `https://sheetdb.io/api/v1/cuyfdc2x1vwf4/id/${original.id}`,
        {data: [editado]}
      )
      commit('time_editar', {original, editado})
    }

  }
})

export default store
