<template>
  <TabelaGenerica :entidadenome="'Times'" :lista="times" 
  :golsTime="getGolsTime"
  /> 
</template>

<script>
import {  mapGetters,mapState } from 'vuex'
import TabelaGenerica from '../../src/components/TabelaGenerica.vue'
 
export default {
  name:'ListaTimes',
  components: {TabelaGenerica },
  computed:{
    ...mapState(['times']),
    ...mapGetters(['getGolsTime']),    
    
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

<style>

</style>
