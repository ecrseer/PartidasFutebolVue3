<template>
  <div class="d-flex flex-row justify-content-around">
    <div class="row">
      <main>
        <CampoDropDown
          :nome="'timeA'"
          v-model="idTimeA"
          :itens="getTodosTimes" 
          :timesJaSelecionados="timesSelecionadosPartida"
        />
        <div>Placar {{geraPlacar}}</div>
        <CampoDropDown
          :nome="'timeB'"
          v-model="idTimeB"
          :itens="getTodosTimes" 
          :timesJaSelecionados="timesSelecionadosPartida"
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
import TabelaGenerica from "../components/TabelaGenerica.vue";
import TabelaGolsJogadorTime from "../components/TabelaGolsJogadorTime.vue";

export default {
  name: "CriarPartida",
  components: {
    Formulario,
    TabelaGenerica,
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
    geraPlacar(){

      let time = this.timesSelecionadosPartida[0]
      if(Object.keys(this.partidaAtual).length===0 || !time) return '0 x 0'

      let golsTimeCasa = this.getGolsByPartida(this.partidaAtual.id,time)  
      time = this.timesSelecionadosPartida[1]
      let golsTimeVisitante = this.getGolsByPartida(this.partidaAtual.id,time)  
      return `${golsTimeCasa} x ${golsTimeVisitante}`

      
    }
  },
  created() {
    this.$bus.on("marcarGol", (jogador_id) => {
      let partida = this.partidaAtual || {
        time_casa: Number(this.idTimeA),
        time_visitante: Number(this.idTimeB),
      }; 
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

