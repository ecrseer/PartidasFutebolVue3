<template>
  <div>
    <section>
      <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <h5 class="text-white h4">Collapsed Y</h5>
        <span class="text-muted">Toggleable via the navbar brand.</span>
      </div>
    </div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        
        <button v-if="isCelular"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-else>
          <BotoesRotas/>
        </div>
      </div>
    </nav>   </section>  
    <main class="d-flex justify-content-center">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BotoesRotas from './components/BotoesRotas.vue';
import breakpoint from './style/breakpoint'
export default {
  components: { BotoesRotas },
  name: "App",
  computed:{
    isCelular(){
      const { largura } = breakpoint()
      let wd = largura();
      return wd < 750 
    }
  }
  
};
</script>

