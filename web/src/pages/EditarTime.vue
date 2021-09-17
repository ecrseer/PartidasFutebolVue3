<template>
  <div class="d-flex flex-row justify-content-around">
    <div class="row">
      <div class="col">
        <Formulario
          v-bind:istimef="true"
          v-bind:entidade="timeSelecionado"
          v-bind:entidadenome="'Time'"
          class="m-5"
        >
        </Formulario>

        <TabelaGenerica v-bind:lista="jogadoresNoTime" :entenome="'Jogador'" />
      </div>
      <div class="col">
        <Formulario
          v-bind:entidadenome="'Jogador'"
          v-bind:entidade="jogadorSelecionado"
          v-bind:entidadepai="timeSelecionado"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Formulario from "../components/Formulario.vue";
import ListaCards from "../components/ListaCards.vue";
import TabelaGenerica from "../components/TabelaGenerica.vue";

export default {
  components: { Formulario, TabelaGenerica, ListaCards },
  data: () => {
    return {
      jogadorSelecionado: false,
    };
  },
  computed: {
    ...mapGetters(["getEntePorId", "getJogadoresNoTime"]),

    timeSelecionado() {
      return this.getEntePorId("times", this.$route.params.idtime);
    },
    jogadoresNoTime() {
      return this.getJogadoresNoTime(this.timeSelecionado);
    },
    jogadoresDisponiveis() {
      return this.getJogadoresDisponiveis();
    },
  },
  created() {
    this.$bus.on("FormAddJogador", (jogadr) => {
      this.$store.dispatch("criarJogador", {
        time: this.timeSelecionado,
        jogador: jogadr,
      });
    });

    this.$bus.on("FormEditJogador", (antigoEnovo) => {
      this.$store.dispatch("editarJogador", antigoEnovo);
      
    });
    this.$bus.on("FormDeleteJogador", () => {
      debugger
      this.$store.dispatch("apagarJogador", {
        time: this.timeSelecionado,
        jogador: this.jogadorSelecionado,
      }); 
       
    });
    /* 
    this.$bus.on("FormAddTime", (jogadr) => {
       
      this.$store.dispatch("criarTime", [this.timeSelecionado, jogadr]);
    });
    this.$bus.on("FormEditTime", (antigoEnovo) => {
      this.$store.dispatch("editarTime", antigoEnovo);
    }); */

    this.$bus.on("TabelaSelectJogador", (jogadr) => {
      this.jogadorSelecionado = jogadr;
    });
    this.$bus.on("FormUnselectJogador", () => {
      this.jogadorSelecionado = false;
    });
  },
  mounted() {
    this.$store.dispatch("carregar");
  },
  unmounted() {
    this.$bus.off("FormAddJogador");
    this.$bus.off("FormEditJogador");
    this.$bus.off("TabelaSelectJogador");
    this.$bus.off("FormUnselectJogador");
  },
};
</script>

