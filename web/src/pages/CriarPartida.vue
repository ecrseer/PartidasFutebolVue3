<template>
  <div class="d-flex flex-row justify-content-around">
    <div class="row">
       <main>
         <CampoDropDown v-model="idTimeA" :itens="timesPossiveis" />
    
       </main>
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
    ...mapGetters(["getEntePorId","getJogadoresNoTime",
    "getTotalGolsJogador","getTimesDisponiveisExcluindoSelecao",
    "getTodosTimes"]),

     
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
    timesDisponiveisAgora(){
      let arrDeveFiltrar = []
      if(this.idTimeA) arrDeveFiltrar.push(this.idTimeA)
      if(this.idTimeB) arrDeveFiltrar.push(this.idTimeB)
      if(arrDeveFiltrar.length>=1){
        return this.getTimesDisponiveisExcluindoSelecao(arrDeveFiltrar)        
        }   
        return this.getTodosTimes
    }
  }, 
     
  mounted() {
    this.$store.dispatch("carregar")
  } 
};
</script>

