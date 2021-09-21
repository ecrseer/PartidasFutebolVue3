<template>
  <div class="d-flex justify-content-center">
<div>    
  
  <h5>Frameworks Front-End e Conexão com Back-End</h5>
      <h6  >Aluno: Gabriel Justino Marques Couto</h6>
      
      </div>
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
