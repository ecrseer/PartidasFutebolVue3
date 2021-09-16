<template> 
</template>

<script>
import { mapState } from 'vuex'
 
export default {
  components: { },
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
