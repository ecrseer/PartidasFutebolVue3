<template>
  <div class="d-flex flex-row justify-content-around  ">
    
      
        
          <Formulario
            v-bind:istimef="true"
            v-bind:entidade="timeSelecionado"
            v-bind:entenome="'Time'"
            class="m-5"
            > 
          </Formulario>
         
         
          <TabelaGenerica
            v-bind:lista="jogadoresNoTime"
            :entenome="'Jogador'"
          />
         
          <Formulario
            v-bind:entenome="'Jogador'"
            v-bind:entidade="jogadorSelecionado"
            v-bind:entidadepai="timeSelecionado" />
      
      
    
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
    ...mapGetters(["getEntePorId", "getJogadoresDisponiveis"]),

    timeSelecionado() {
      console.log( this.getEntePorId("times", this.$route.params.idtime))
      return this.getEntePorId("times", this.$route.params.idtime);
    },
    jogadoresNoTime() {
      if (!this.timeSelecionado ||
        !this.timeSelecionado.jogadores ||
          this.timeSelecionado.jogadores.length  >= 1) {
         return [{ id: "404", nome: "nulo" }];
         }
        return this.timeSelecionado.jogadores;
    },
    jogadoresDisponiveis() {
      return this.getJogadoresDisponiveis();
    },
  },
  created() {
    this.$bus.on("FormAddJogador", (jogadr) => {
      this.$store.dispatch("criarJogador", [this.timeSelecionado, jogadr]);
       
    });
    this.$bus.on("FormEditJogador", (antigoEnovo) => {
      this.$store.dispatch("editarJogador", antigoEnovo);
      this.$store.dispatch("editarTime", {
        original: false,
        editado: this.timeSelecionado,
      });
    });
    this.$bus.on("FormDeleteJogador", () => {
      this.$store.dispatch("apagarJogador", {
        time: this.timeSelecionado,
        jogador: this.jogadorSelecionado,
      });
      this.$store.dispatch("editarTime", {
        original: false,
        editado: this.timeSelecionado,
      });
      this.$router.go()
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
  mounted(){
    this.$store.dispatch("carregar")
  },
  unmounted() {
    this.$bus.off("FormAddJogador");
    this.$bus.off("FormEditJogador");
    this.$bus.off("TabelaSelectJogador");
    this.$bus.off("FormUnselectJogador");
  },
};
</script>

