<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Time casa</th>
          <th>Gols casa</th>
          <th>Gols visitante</th>
          <th>Time visitante</th>
          <th>----</th>
        </tr>
      </thead>
      <tbody id="test_tabela" class="table-dark">
        <tr
          v-for="partida in lista"
          v-bind:key="partida"
          v-bind:class="partida === entidadeSelecionada ? 'table-primary' : ''"
        >
          <td>
            {{ timeById(partida.time_casa).nome || 
            partida.time_casa || "" }}
          </td>
          <td>
            {{
              golsTime(
                  timeById(partida.time_casa)
                  ).partidasDoTime[partida.id]?.gols
                   || 0
            }}
          </td>
          <td>{{ golsTime(
              timeById(partida.time_visitante)
              ).partidasDoTime[partida.id]?.gols 
              || 0 }}</td>

          <td>
            {{
              timeById(partida.time_visitante).nome ||
              partida.time_visitante || ""
            }}
          </td>
          <td>
            <button class="colorido" @click="editar(partida)">editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "TabelaPartidas",
  props: ["lista", "entidadenome", "gGolsTime"],
  data: () => {
    return {
      entidadeSelecionada: {},
    };
  },
  computed: {
    ...mapGetters(["getTimeById", "getGolsTime"]),
    timeById() {
      return (idTime) => this.getTimeById(idTime);
    },
    golsTime() {
      return (time) => this.getGolsTime(time);
    },
  },
  methods: {
    editar(item) {
      if (this.entidadenome === "Jogador") {
        if (this.entidadeSelecionada === item) {
          this.$bus.emit("FormUnselectJogador");
          this.entidadeSelecionada = {};
        } else {
          this.$bus.emit("TabelaSelectJogador", item);
          this.entidadeSelecionada = item;
        }

        return;
      }

      let rota_ente = this.entidadenome.toLowerCase() || "times";

      this.$router.push({
        path: `/${rota_ente}/editar/${item.id}`,
      });
    },
  },
  unmounted() {
    /* gambiarra */
    //this.$bus.emit("editarTime", this.entidadeSelecionada);
  },
};
</script>
<style scoped>
.colorido {
  background-color: #b6e7ae;
}
</style>