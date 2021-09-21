<template>
  <div>
    <section>
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <BotoesRotas />
        </div>
      </div>


      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid d-flex justify-content-center">
          <button
            v-if="isCelular"
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon "></span>
          </button>
          <div v-else class="d-flex flex-row">
            <BotoesRotas />
      
          </div>
        </div>
      </nav>
          <ProgressBar v-if="carregando"/>
  
    </section>
    <main class="d-flex flex-row justify-content-center">
      <!-- rotas -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BotoesRotas from "./components/BotoesRotas.vue";
import ProgressBar from './components/ProgressBar.vue';
import breakpoint from "./style/breakpoint";
export default {
  components: { BotoesRotas, ProgressBar },
  name: "App",
  computed: {
    ...mapState(['carregando']),
    isCelular() {
      const { largura } = breakpoint();
      let wd = largura();
      return wd < 750;
    },
  },
};
</script>

