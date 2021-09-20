
<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Jogador</th>
          <th>Time</th>
          <th>Gols</th>
        </tr>
      </thead>
      <tbody id="test_tabela" class="table-dark">
        <tr
          v-for="item in jogadoresDessaPartida"
          v-bind:key="item"
          v-bind:class="item === entidadeSelecionada ? 'table-primary' : ''"
        >
          <td>
            {{ NomeDoJogador(gJogadorPorId(item.idJogador)) }}
          </td>
          <td>
            {{ item.nomeTime }}
          </td>
          <td>
            {{ item.gols }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "TabelaGolsJogadorTime",
  props: ["lista", "golsTime"],
  data: () => {
    return {
      entidadeSelecionada: {},
    };
  },
  computed: {
    ...mapGetters(["getJogadoresGolsByTime", "getEntePorId", "getPartidaAtual"]),
    gJogadorPorId() {
      return (idJogador) => this.getEntePorId("jogadores", idJogador);
    },
    IdPartidaAtual() {
      return this.getPartidaAtual ? this.getPartidaAtual.id : false;
    },
    NomeDoJogador() {
      return function (jogadr) {
        if (!jogadr || !jogadr.nome) return "";
        return jogadr.nome;
      };
    },
    jogadoresDessaPartida() {
      if (!this.IdPartidaAtual) return [];

      let GolsEJogadoresTimeCasa, GolsEJogadoresTimeVisitante;

      let TodosJogadoresEGolsPartidaAtual = {}
      if (this.lista[0]) {
        GolsEJogadoresTimeCasa = this.getJogadoresGolsByTime(this.lista[0])
        .partidasDoTime[this.IdPartidaAtual];

        if(GolsEJogadoresTimeCasa){
          TodosJogadoresEGolsPartidaAtual = {...TodosJogadoresEGolsPartidaAtual,
          ...GolsEJogadoresTimeCasa.jogadores}
        }
      }
      if (this.lista[1]) {
        GolsEJogadoresTimeVisitante = this.getJogadoresGolsByTime(this.lista[1])
          .partidasDoTime[this.IdPartidaAtual];

          if(GolsEJogadoresTimeVisitante){
          TodosJogadoresEGolsPartidaAtual = {...TodosJogadoresEGolsPartidaAtual,
          ...GolsEJogadoresTimeVisitante.jogadores}
        }
      }
      

      if (Object.keys(TodosJogadoresEGolsPartidaAtual).length > 0) {

        return TodosJogadoresEGolsPartidaAtual;
      }
      return [];
    },
    listaJogadorGolTime() {
      this.jogadoresDessaPartida;
    },
  },
};
</script> 