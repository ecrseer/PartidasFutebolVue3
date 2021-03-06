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
      gols: [],
      partidaAtual:false
    }
  },
  getters: { // equivalente ao computed de um componente
    getEntePorId(state) {
      return function (entenome, idEnte) {
        if(!idEnte) return false
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
          return false;
        }
        
        let jogadoresNoTime = []
        for (const jogadorId of time.jogadores) {
        
          let jogadorEncontrado = state.jogadores
          .filter(jogadr=>jogadr.id===jogadorId)[0]
          //getters.getJogadorbyId
          if(jogadorEncontrado){
            jogadoresNoTime.push(jogadorEncontrado)
          }
        }

        return jogadoresNoTime

      }
    },
    getTodosTimes(state){
      return state.times
    }, 
    getJogadoresGolsByTime(state){
      return function IteraJogadoresByTime(time, jogadoresRequisitados  ) 
      {
      let partidasDoTime = {}

        function inicializaRegistroPartidas(golPartida_id){
          let PrimeiraVezQuePartidaEhCadastrada = !partidasDoTime[golPartida_id]
          if (PrimeiraVezQuePartidaEhCadastrada) {
            let estruturaPartidaComGols = {
              TotalGolsDaPartida: 0, jogadores: {}
            }
            partidasDoTime[golPartida_id] = estruturaPartidaComGols
          }
        }
        function inicializaRegistroJogadorDaPartida(golPartida_id,idJogador){
          let PrimeiraVezQueJogadorEhCadastrado = !partidasDoTime[golPartida_id]
            .jogadores[idJogador]
          if (PrimeiraVezQueJogadorEhCadastrado) {
            let estruturaPartidaDoJogador = {              
              gols: 0,
              nomeTime:time.nome,
              idJogador
            }
            partidasDoTime[golPartida_id].jogadores[idJogador] =
              estruturaPartidaDoJogador
          }
        }
        function adicionaGolDasPartidas(golPartida_id,idJogador) {         
          inicializaRegistroPartidas(golPartida_id)
          inicializaRegistroJogadorDaPartida(golPartida_id,idJogador)

          partidasDoTime[golPartida_id].TotalGolsDaPartida++
          partidasDoTime[golPartida_id].jogadores[idJogador].gols++;

        }

        jogadoresRequisitados = jogadoresRequisitados || time.jogadores
        if (!jogadoresRequisitados) return {}
        
      let nGolsTodasPartidas = 0;
      jogadoresRequisitados.forEach((idJogador) => {
        for (const gol of state.gols) {

          let achouGolDoTime = gol.jogador_id === idJogador
          if (achouGolDoTime) {
            nGolsTodasPartidas++;
            adicionaGolDasPartidas(gol.partida_id,idJogador)
          }
        }
      })
      

      return { total: nGolsTodasPartidas, partidasDoTime };  
      }

   },
    getGolsByPartida(state,getters) {
      return function golsByTimeNaPartida(IdPartidaRequisitada,time){
         function somaGolsDosJogadoresDoTime(partidaRequisitada){
          for (const idJogador of time.jogadores) {
            
            let jogadorEncontrado = partidaRequisitada.jogadores[idJogador]
            if(jogadorEncontrado){
              golsDesseTime+= partidaRequisitada.jogadores[idJogador].gols          
            }
          }
         }
        let partidaRequisitada = getters.getJogadoresGolsByTime(time)
        .partidasDoTime[IdPartidaRequisitada]
        let golsDesseTime=0;
        if(partidaRequisitada){
          somaGolsDosJogadoresDoTime(partidaRequisitada)
        }
        return golsDesseTime
        
      }
 
    },
    getTotalGolsJogador(state) {
      return function GolsByJogador(jogador) {
        let nGols = 0;
        for (const gol of state.gols) {
          if (gol.jogador_id === jogador.id) {
            nGols++
          }
        }

        return {total:nGols};
      }
    },
    getTimeById(state) {
      return function (idTime) {
        let timeEncontrado =
          state.times.filter(tme => tme.id === idTime)[0]
        return timeEncontrado || { nome: '404' }
      }
    },
    getPartidaAtual(state){
      return state.partidaAtual
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
      state.carregando = false
    },
    gol_criar(state, gol) {
      state.gols.push(gol) 
      state.carregando = false
    },
    partida_criar(state,partida){
      
      
      state.partidas.push(partida)
      state.partidaAtual = partida
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
    async criarPartida({commit},partida){
      let respostaPartida = await axios.post(baseUrlApi.partidas, { ...partida } )
      
      let partidaComId = respostaPartida.data
      console.log('criei partida')
      commit('partida_criar',partidaComId)
      return partida;
      
    },
    async criarGol({ commit,state,dispatch }, {jogador_id,partida}) {
      commit('carregando')
      console.log('criando gol')

      let partidaAtualOuNova = state.partidaAtual || 
       await dispatch('criarPartida',partida)
               
      jogador_id = Number(jogador_id)
      let gol = {
        partida_id:partidaAtualOuNova.id || state.partidaAtual.id,
        jogador_id}
      let respostaGol = await  axios.post(baseUrlApi.gols, { ...gol } )
      
      commit('gol_criar', respostaGol.data)

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
