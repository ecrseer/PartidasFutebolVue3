<template>
  <div class="table-responsive">
  <table class="table" >
    <thead >
      <tr>
        <th v-for="(atributo, key) in lista[0]" v-bind:key="key">
          <span v-if="!Array.isArray(atributo)">{{ key }}</span>
        </th>
        <th v-if="entidadenome==='Times'">
          qtd. gols
        </th>
      </tr>
    </thead>
    <tbody id="test_tabela" class="table-dark">
      <tr v-for="item in lista" v-bind:key="item" 
      v-bind:class="item===entidadeSelecionada?'colorido':''">
        <td v-for="(atributo, key) in item" v-bind:key="key"
        >
          <span v-if="!Array.isArray(atributo)">{{atributo}}</span>
        </td>
        <td v-if="entidadenome==='Times'">
          {{golsTime(item)}}
        </td>
          
        <td>
          <button class="colorido" @click="editar(item)">editar</button>
        </td>
      </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TabelaGenerica",
  props: ["lista", "entidadenome","golsTime"],
  data: () => {
    return {
      entidadeSelecionada: {},
    };
  }, 
  methods: {
    editar(item) {
      if(this.entidadenome==="Jogador"){
        if(this.entidadeSelecionada === item){
          this.$bus.emit("FormUnselectJogador");
          this.entidadeSelecionada={}
        }else{          
          this.$bus.emit('TabelaSelectJogador',item)
          this.entidadeSelecionada=item
        }

        return;
      }

      let rota_ente = this.entidadenome.toLowerCase();

      this.$router.push({
        path: `/${rota_ente}/editar/${item.id}`,
      });
    } 
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