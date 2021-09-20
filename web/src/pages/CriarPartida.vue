<template>
  <div class="d-flex flex-row justify-content-around">
    <div class="row">
      <main>
        <CampoDropDown :nome="'timeA'" v-model="idTimeA" :itens="timesDisponiveisAgora" />
        <CampoDropDown :nome="'timeB'" v-model="idTimeB" :itens="timesDisponiveisAgora" />
      </main>
      <TabelaGolsJogadorTime :lista="timesSelecionadosPartida" />
      <!-- <DropDownTimesPartida :timeA="idTimeA" :timeB="idTimeB"  :timesDaPartida="{}"/> -->
      <DropDownGolsJogador :timesDaPartida="timesSelecionadosPartida" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CampoDropDown from '../components/CampoDropDown.vue';
import DropDownGolsJogador from "../components/DropDownGolsJogador.vue";
import DropDownTimesPartida from "../components/DropDownTimesPartida.vue";
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
    DropDownTimesPartida,
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
      "getTotalGolsJogador", 
      "getTodosTimes",
    ]),

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
       let disponiveis= this.getTodosTimes
        for (const timeId of arrDeveFiltrar) {
            disponiveis = disponiveis.filter(tme=>`${tme.id}`!==`${timeId}`)
            console.log(disponiveis)
            console.log(this.getTodosTimes)
        }
         return disponiveis
        
       
    },
  },

  mounted() {
    this.$store.dispatch("carregar");
  },
};
</script>

