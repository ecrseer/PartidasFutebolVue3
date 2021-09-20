<template>
  <div class="d-flex flex-row justify-content-around">
    <div class="row">
      <main>
        <CampoDropDown
          :nome="'timeA'"
          v-model="idTimeA"
          :itens="timesDisponiveisAgora"
        />
        <div>Placar {{fdf}}</div>
        <CampoDropDown
          :nome="'timeB'"
          v-model="idTimeB"
          :itens="timesDisponiveisAgora"
        />
      </main>
      <TabelaGolsJogadorTime :lista="timesSelecionadosPartida" :partidaAtual="partidaAtual"/>
      <!-- <DropDownTimesPartida :timeA="idTimeA" :timeB="idTimeB"  :timesDaPartida="{}"/> -->
      <DropDownGolsJogador :timesDaPartida="timesSelecionadosPartida" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CampoDropDown from "../components/CampoDropDown.vue";
import DropDownGolsJogador from "../components/DropDownGolsJogador.vue";

import Formulario from "../components/Formulario.vue";
import ListaCards from "../components/ListaCards.vue";
import TabelaGenerica from "../components/TabelaGenerica.vue";
import TabelaGolsJogadorTime from "../components/TabelaGolsJogadorTime.vue";

export default {
  name: "CriarPartida",
  components: {
    Formulario,
    TabelaGenerica,
    ListaCards,
    DropDownGolsJogador, 
    TabelaGolsJogadorTime,
    CampoDropDown,
  },
  data: () => {
    return {
      jogadorSelecionado: false,
      timeSelecionado: false,
      idTimeA: false,
      idTimeB: false,
    };
  },
  computed: {
    ...mapGetters([
      "getEntePorId",
      "getJogadoresNoTime", 
      "getTodosTimes",
      "getPartidaAtual",
      "getGolsByPartida"

    ]),
    partidaAtual(){
      return this.getPartidaAtual
    },
    timesSelecionadosPartida() {
      let parTimes = [];
      let time = this.getEntePorId("times", this.idTimeA);
      if (time) {
        parTimes.push(time);
      }
      time = this.getEntePorId("times", this.idTimeB);
      if (time) {
        parTimes.push(time);
      }
      return parTimes;
    },
    timesDisponiveisAgora() {
      let arrDeveFiltrar = [];
      if (this.idTimeA) arrDeveFiltrar.push(this.idTimeA);
      if (this.idTimeB) arrDeveFiltrar.push(this.idTimeB);
      let disponiveis = this.getTodosTimes;
      for (const timeId of arrDeveFiltrar) {
        disponiveis = disponiveis.filter((tme) => `${tme.id}` !== `${timeId}`);
         
      }
      return disponiveis;
    },
    fdf(){
      let time = this.timesSelecionadosPartida[0]
      let g = this.getGolsByPartida(1000,time)  

      
    }
  },
  created() {
    this.$bus.on("marcarGol", (jogador_id) => {
      let partida = this.partidaAtual || {
        time_casa: this.idTimeA,
        time_visitante: this.idTimeB,
      };
      console.log(`partida eh ${partida}`)
      this.$store.dispatch("criarGol", { jogador_id, partida });
    });
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
  unmounted() {
    this.$bus.off("marcarGol");
  },
};
</script>

