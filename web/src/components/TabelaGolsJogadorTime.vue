
<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <!-- <th v-for="(atributo, key) in lista[0]" v-bind:key="key">
          <span v-if="CampoDeveAparecer(atributo,key)">{{ key }}</span>
        </th>
        <th >
          qtd. gols
        </th> -->
          <th>ttt {{jogadoresDessaPartida}}</th>
        </tr>
      </thead>
      <tbody id="test_tabela" class="table-dark">
        <!-- <tr v-for="item in lista" v-bind:key="item" 
      v-bind:class="item===entidadeSelecionada?'table-primary':''">
        <td v-for="(atributo, key) in item" v-bind:key="key"
        >
          <span v-if="CampoDeveAparecer(atributo,key)">{{atributo}}</span>
        </td>
        <td >
          {{golsTime(item).total}}
        </td>
          
        <td>
          <button class="colorido" @click="editar(item)">editar</button>
        </td>
      </tr> -->
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
      jogadoresDessaPartida() {
      if(this.lista[0]){
          return this.getGolsTime(this.lista[0])
          .partidasDoTime[this.IdPartidaAtual].jogadores
      }
      else return 0;
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