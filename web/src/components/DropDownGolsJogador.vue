<template>
  <div class="col-12">
    <div class="times">
    
    <CampoDropDown v-model="idTimeSelect" :itens="timesPossiveis" />
    <CampoDropDown v-model="idJogadorSelect" :itens="jogadoresNesseTime" />
    
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CampoDropDown from "./CampoDropDown.vue";
export default {
  components: { CampoDropDown },
  name: "DropDownGolsJogador",
  data: () => {
    return {
      idTimeSelect: "",
      idJogadorSelect:""
    };
  },
  computed: {    
    ...mapGetters(["getJogadoresNoTime"]), 
    timeSelecionado() {
      let timeEncontrado = this.timesDaPartida?.filter(timsP=>
        `${timsP.id}`===this.idTimeSelect)[0]
        
      return timeEncontrado || {'nome':'404'};
    },
    jogadorSelecionado(){
      let jogadorEncontrado = this.jogadoresNesseTime?.filter(timsP=>
        `${timsP.id}`===this.idJogadorSelect)[0]
        
      return jogadorEncontrado || {'nome':'404'};
    },
    timesPossiveis(){
      return this.timesDaPartida;
    },
    jogadoresNesseTime() {
      return this.getJogadoresNoTime(this.timeSelecionado || {});
    },
  },
  props: ["jogadoresDoTime", "timesDaPartida"],
  methods: {
    atualizar() {
      this.$emit("bombom");
    },
  },
  mounted() { 
  },
};
</script>

<style scoped>
</style>
