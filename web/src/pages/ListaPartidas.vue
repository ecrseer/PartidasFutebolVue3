<template>
 <div class="d-flex flex-column">

  <TabelaPartidas  :lista="partidas"  :gGolsTime="getGolsTime"/> 
  <router-link class="btn btn-primary"
  to="/partidas/criar">Cadastrar partida</router-link>
 </div>
</template>

<script>
import {  mapGetters,mapState } from 'vuex'

import TabelaPartidas from '../components/TabelaPartidas.vue'
 
export default {
  name:'ListaPartidas',
  components: { TabelaPartidas },
  computed:{
    ...mapState(['partidas']),
    ...mapGetters(['getGolsTime']),    
    
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

<style>

</style>
