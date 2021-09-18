<template>
  <div class="col-12">
    {{ tSelecionado.nome }}
    <CampoDropDown v-model="tSelecionado" :itens="timesPossiveis" />
  </div>
</template>

<script>
import CampoDropDown from "./CampoDropDown.vue";
export default {
  components: { CampoDropDown },
  name: "DropDownGolsJogador",
  data: () => {
    return {
      timesPossiveis: [
        {
          nome: "Chapeucoense",
          estado: "",
          tecnico: "",
          torcida: "",
          fundacao_ano: "",
          info: "",
          jogadores: [11, 13],
          id: 1,
        },
        {
          nome: "Victoria",
          estado: "",
          tecnico: "",
          torcida: "",
          fundacao_ano: "",
          info: "",
          jogadores: [12, 14],
          id: 2,
        },
      ],
      tSelecionado: "",
    };
  },
  computed: {
    doisTimes() {
      return this.timesDaPartida;
    },
    tmeSelecionado() {
      return this.tSelecionado;
    },
  },
  props: ["jogadoresDoTime", "timesDaPartida"],
  methods: {
    atualizar() {
      this.$emit("bombom");
    },
  },
  mounted() { 
  },
};
</script>

<style scoped>
</style>
