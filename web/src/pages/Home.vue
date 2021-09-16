<template>
  <div class="d-flex justify-content-center">
      <h1 class="display-1">Display {{isCelular}}</h1>
      <h1 class="display-1">Display {{tamanhoJanela}}</h1>
      <h1 class="display-1">Display 1</h1>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import breakpoint from '../style/breakpoint'

export default {
  name:'Home',
  components: {},
  computed:{
    tamanhoJanela(){
      const { width } = breakpoint()
      return width;
    },
    isCelular(){
      const { largura } = breakpoint()
      let wd = largura();
      return wd < 750 
    }
  },
  mounted() {
    this.$store.dispatch('carregar')
  }
}
</script>

<style>

</style>
