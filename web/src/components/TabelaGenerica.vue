<template>
  <div class="table-responsive">
  <table class="table" >
    <thead >
      <tr>
        <th v-for="(atributo, key) in lista[0]" v-bind:key="key">
          <span v-if="CampoDeveAparecer(atributo,key)">{{ key }}</span>
        </th>
        <th >
          qtd. gols
        </th>
      </tr>
    </thead>
    <tbody id="test_tabela" class="table-dark">
      <tr v-for="entidade in lista" v-bind:key="entidade" 
      v-bind:class="entidade===entidadeSelecionada?'table-primary':''">
        <td v-for="(atributo, key) in entidade" v-bind:key="key"
        >
          <span v-if="CampoDeveAparecer(atributo,key)">{{atributo}}</span>
        </td>
         
        <td>{{golsEntidade(entidade).total}}</td>
          
        <td>
          <button class="colorido" @click="editar(entidade)">editar</button>
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
  props: ["lista", "entidadenome","golsTime","golsEntidade"],
  data: () => {
    return {
      entidadeSelecionada: {},
    };
  }, 
  methods: {
    editar(entidade) {
      if(this.entidadenome==="Jogador"){
        if(this.entidadeSelecionada === entidade){
          this.$bus.emit("FormUnselectJogador");
          this.entidadeSelecionada={}
        }else{          
          this.$bus.emit('TabelaSelectJogador',entidade)
          this.entidadeSelecionada=entidade
        }

        return;
      }

      let rota_ente = this.entidadenome.toLowerCase();

      this.$router.push({
        path: `/${rota_ente}/editar/${entidade.id}`,
      });
    },
    CampoDeveAparecer(atributo,key){
      
      return !Array.isArray(atributo) && key.indexOf('id')===-1
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