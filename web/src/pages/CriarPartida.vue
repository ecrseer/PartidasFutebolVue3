<template>
  <div class="d-flex flex-row justify-content-around">
    <div class="row">d
      <!-- <div class="col">
        <Formulario
          v-bind:istimef="true"
          v-bind:entidade="timeSelecionado"
          v-bind:entidadenome="'Time'"
          class="m-5"
        >
        </Formulario>

        <TabelaGenerica
          v-bind:lista="jogadoresNesseTime"
          :entidadenome="'Jogador'"
          :golsTime="getTotalGolsJogador"
        />
      </div>
      <div class="col">
        <Formulario
          v-bind:entidadenome="'Jogador'"
          v-bind:entidade="jogadorSelecionado"
          v-bind:entidadepai="timeSelecionado"
        />
      </div> -->
      <TabelaGolsJogadorTime :lista="timesSelecionadosPartida"/>
      <!-- <DropDownTimesPartida :timeA="idTimeA" :timeB="idTimeB"  :timesDaPartida="{}"/> -->
      <DropDownGolsJogador :timesDaPartida="timesSelecionadosPartida"/>
      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DropDownGolsJogador from '../components/DropDownGolsJogador.vue';
import DropDownTimesPartida from '../components/DropDownTimesPartida.vue';
import Formulario from "../components/Formulario.vue";
import ListaCards from "../components/ListaCards.vue";
import TabelaGenerica from "../components/TabelaGenerica.vue";
import TabelaGolsJogadorTime from '../components/TabelaGolsJogadorTime.vue';

export default {
  name:'CriarPartida',
  components: { Formulario, TabelaGenerica, ListaCards, DropDownGolsJogador, DropDownTimesPartida, TabelaGolsJogadorTime },
  data: () => {
    return {
      jogadorSelecionado: false,
      timeSelecionado:false, 
      idTimeA:false,
      idTimeB:false,
    };
  },
  computed: {
    ...mapGetters(["getEntePorId", 
    "getJogadoresNoTime","getTotalGolsJogador"]),

    timeSelecionado2() {
      return this.getEntePorId("times", 1);
    },
    jogadoresNesseTime() {
      return this.getJogadoresNoTime(this.timeSelecionado);
    },
    timesSelecionadosPartida(){
      let parTimes = []
      let time = this.getEntePorId("times",1)
        if(time){
          parTimes.push(time)
        }
        
        time = this.getEntePorId("times",2)
        if(time){
          parTimes.push(time)
        }
        return parTimes
        
    },
  },
  created() {
    this.$bus.on("FormAddJogador", (jogadr) => {
      jogadr.time_id = this.timeSelecionado.id;
      this.$store.dispatch("criarJogador", {
        time: this.timeSelecionado,
        jogador: jogadr,
      });
    });

    this.$bus.on("FormEditJogador", (antigoEnovo) => {
      this.$store.dispatch("editarJogador", antigoEnovo);
    });
    this.$bus.on("FormDeleteJogador", () => {
      
      this.$store.dispatch("apagarJogador", {
        time: this.timeSelecionado,
        jogador: this.jogadorSelecionado,
      });
    });
    /* 
    this.$bus.on("FormAddTime", (jogadr) => {
       
      this.$store.dispatch("criarTime", [this.timeSelecionado, jogadr]);
    });
    this.$bus.on("FormEditTime", (antigoEnovo) => {
      this.$store.dispatch("editarTime", antigoEnovo);
    }); */

    this.$bus.on("TabelaSelectJogador", (jogadr) => {
      this.jogadorSelecionado = jogadr;
    });
    this.$bus.on("FormUnselectJogador", () => {
      this.jogadorSelecionado = false;
    });
  },
     
  mounted() {
    this.$store.dispatch("carregar")
     
    
  },
  unmounted() {
    this.$bus.off("FormAddJogador");
    this.$bus.off("FormEditJogador");
    this.$bus.off("TabelaSelectJogador");
    this.$bus.off("FormUnselectJogador");
  },
};
</script>

