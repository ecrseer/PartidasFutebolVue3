<template>
  <TabelaGenerica :entidadenome="'Times'" :lista="times"/> 
</template>

<script>
import { mapState } from 'vuex'
import TabelaGenerica from '../../src/components/TabelaGenerica.vue'
 
export default {
  name:'ListaTimes',
  components: {TabelaGenerica },
  computed:{
    ...mapState(['times'])
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

<style>

</style>
