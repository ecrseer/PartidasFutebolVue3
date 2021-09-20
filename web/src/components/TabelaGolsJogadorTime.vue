
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
        <tr v-for="item in jogadoresDessaPartida" v-bind:key="item" 
      v-bind:class="item===entidadeSelecionada?'table-primary':''">
        <td>
          {{getJogadorPorId(item.idJogador).nome}}
        </td>
        <td >          
          {{item.nomeTime}}
        </td>
        <td>
          {{item.gols}}
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
  props: ["lista", "entidadenome", "golsTime"],
  data: () => {
    return {
      entidadeSelecionada: { },
      IdPartidaAtual:1000
    };
  },
  computed: {
      ...mapGetters(['getGolsTime','getEntePorId']),
      getJogadorPorId(){
        return idJogador => this.getEntePorId("jogadores",idJogador)
      },
      jogadoresDessaPartida() {
        if(!this.lista[0] ) return [];

        let partidaAtual = this.getGolsTime(this.lista[0])
          .partidasDoTime[this.IdPartidaAtual]
          
      if(partidaAtual && partidaAtual.jogadores){
          return partidaAtual.jogadores
      }
      return [];
    },
    listaJogadorGolTime(){
      this.jogadoresDessaPartida
    }

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

      let rota_ente = this.entidadenome.toLowerCase();

      this.$router.push({
        path: `/${rota_ente}/editar/${item.id}`,
      });
    },
    CampoDeveAparecer(atributo, key) {
      return !Array.isArray(atributo) && key.indexOf("id") === -1;
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