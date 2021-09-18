import { createStore } from 'vuex'
import axios from 'axios'
import { baseUrlApi } from './const'

const store = createStore({
  state() {  // equivalente ao data de um componente
    return {
      carregando: false,
      times: [],
      jogadores: [],
      partidas: [],
      gols: []
    }
  },
  getters: { // equivalente ao computed de um componente
    getEntePorId(state) {
      return function (entenome, idEnte) {

        let enteFiltrado = state[entenome].filter(
          (ente) => `${ente.id}` === `${idEnte}`)[0];

        return enteFiltrado;
      }
    },
    getJogadoresNoTime(state) {
      return function (time) {
        if (!time || !time.jogadores ||
          time.jogadores.length <= 0
        ) {
          return [];
        }

        let jogadoresNoTime = []
        jogadoresNoTime = state.jogadores.filter(jogador => jogador.time_id === time.id)

        return jogadoresNoTime

      }
    },
    getGolsTime(state) {
      
      return function GolsByTime(time) {
        let partidasDoTime = {}
        function adicionaGolDasPartidas(golPartida_id){
          if(!partidasDoTime[golPartida_id]){
            let estruturaPartidaComGols = { 
              gols:0,              }
            partidasDoTime[golPartida_id] = estruturaPartidaComGols
          }
          partidasDoTime[golPartida_id].gols++ 
        }
        let nGolsTodasPartidas = 0;
        
        time.jogadores.forEach((jogadr) => {
          for (const gol of state.gols) {

            let achouGolDoTime = gol.jogador_id === jogadr
            if (achouGolDoTime) {
              nGolsTodasPartidas++;
              adicionaGolDasPartidas(gol.partida_id)
            }
          }
        })
        //debugger
        return {total:nGolsTodasPartidas,partidasDoTime} ;
        
      }
    },
    getGolsJogador(state) {
      return function GolsByJogador(jogador) {
        let nGols = 0;
        for (const gol of state.gols) {
          if (gol.jogador_id === jogador.id) {
            nGols++
          }
        }

        return nGols;
      }
    },
    getTimeById(state) {
      return function (idTime) {
        let timeEncontrado =
          state.times.filter(tme => tme.id === idTime)[0]
        return timeEncontrado || { nome: '404' }
      }
    },
    zzzgetGolsTimeNaPartida(state){
      return function (time) {
        let nGols = 0;
        time.jogadores.forEach((jogadr) => {
          for (const gol of state.gols) {
            if (gol.jogador_id === jogadr) {
              nGols++
            }
          }
        })

        return nGols;
      }
    }
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
    jogador_apagar(state, { time, jogador }) {
      let index = state.jogadores.indexOf(jogador)
      if (index >= 0) {
        state.jogadores.splice(index, 1)
      }
      let timeEncontrado = state.times.filter(tme => tme.id === time.id)[0]

      if (timeEncontrado) {
        let indJogadorEncontrado = timeEncontrado
          .jogadores.indexOf(jogador.id)
        if (index >= 0) {
          timeEncontrado.jogadores.splice(indJogadorEncontrado, 1)
        }
      }


      state.carregando = false
    },
    obj_editar(state, { original, editado }) {


      Object.assign(original, editado)
      state.carregando = false
    },
    time_criar(state, time) {
      state.times.push(time)
      state.carregando = false
    },
    jogador_criar(state, jogador) {
      state.jogadores.push(jogador)
    }
  },
  actions: { // equivalente ao methods de um componente
    async carregar({ commit }) {
      commit('carregando')
      axios.get(baseUrlApi.times).then(({ data }) => {

        commit('time_carregado', data)
      })
      axios.get(baseUrlApi.jogadores).then(({ data }) => {

        commit('jogador_carregado', data)
      })
      axios.get(baseUrlApi.gols).then(({ data }) => {

        commit('gol_carregado', data)
      })
      axios.get(baseUrlApi.partidas).then(({ data }) => {

        commit('partida_carregado', data)
      })

    },

    async criarTime({ commit }, time) {
      commit('carregando')
      await axios.post(baseUrlApi.times, { ...time })
      commit('time_criar', time)

    },
    async criarJogador({ commit, dispatch }, { time, jogador }) {
      commit('carregando')

      axios.post(
        `${baseUrlApi.jogadores}`, { ...jogador })
        .then(({ data }) => {
          jogador.id = data.id
          commit('jogador_criar', jogador)
        })
        .catch(er => console.log(er))
        .then(
          () => {
            let timeEditado = { ...time }
            timeEditado.jogadores.push(jogador.id)

            dispatch('editarTime', {
              original: time,
              editado: timeEditado
            })
          }
        )



    },
    async editarTime({ commit }, { original, editado }) {
      commit('carregando')

      await axios.put(`${baseUrlApi.times}/${editado.id}`, { ...editado })
      commit('obj_editar', { original, editado })
    },
    async editarJogador({ commit }, { original, editado }) {
      commit('carregando')

      await axios.put(`${baseUrlApi.jogadores}/${editado.id}`, { ...editado })
      commit('obj_editar', { original, editado })
    },
    async apagarTime({ commit }, time) {
      commit('carregando')

      await axios.delete(`${baseUrlApi.times}/${time.id}`)
      commit('time_apagar', time)

    },
    async apagarJogador({ commit, dispatch }, { time, jogador }) {

      commit('carregando')

      commit('jogador_apagar', { time, jogador })

      await axios.delete(`${baseUrlApi.jogadores}/${jogador.id}`)

      dispatch('editarTime', { original: time, editado: time })

    },

  }
})

export default store
