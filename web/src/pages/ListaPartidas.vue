<template>
  <TabelaPartidas  :lista="partidas"  :gGolsTime="getGolsTime"/> 
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
