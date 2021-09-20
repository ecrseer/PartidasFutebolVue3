<template>
  <div class="col-12">
    
    <CampoDropDown v-model="idTimeSelect" :itens="timesPossiveis" />
    
    <CampoDropDown v-model="idJogadorSelect" :itens="jogadoresNesseTime" />
    <div v-if="carregando" class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    <button v-else class="btn btn-success" v-on:click="bolaNaRede">Gol</button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import CampoDropDown from "./CampoDropDown.vue";
export default {
  components: { CampoDropDown },
  name: "DropDownGolsJogador",
    props: ["timesDaPartida"],
  data: () => {
    return {
      idTimeSelect: "",
      idJogadorSelect:""
    };
  },
  watch:{
    timesDaPartida(prev,next){
      //to do: se os dois times mudarem campos devem ser limpos
    }
  },
  computed: {    
    ...mapGetters(["getJogadoresNoTime"]), 
    ...mapState(['carregando']),
    timeSelecionado() {
      let timeEncontrado = this.timesDaPartida ?
      this.timesDaPartida.filter(timsP=>
        `${timsP.id}`===this.idTimeSelect)[0] : false
        
      return timeEncontrado || {'nome':'404'};
    },
    jogadorSelecionado(){
      let jogadorEncontrado = this.jogadoresNesseTime?
      this.jogadoresNesseTime.filter(timsP=>
        `${timsP.id}`===this.idJogadorSelect)[0] : false
        
      return jogadorEncontrado || {'nome':'404'};
    },
    timesPossiveis(){
      return this.timesDaPartida;
    },
    jogadoresNesseTime() {
       
      return this.getJogadoresNoTime(this.timeSelecionado || false);
    },
  },
  methods: {
    bolaNaRede() { 
      this.$bus.emit("marcarGol",this.idJogadorSelect);
    },
  },
};
</script>

<style scoped>
</style>
