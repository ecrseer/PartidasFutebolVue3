
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
          {{
            NomeDoJogador(
            gJogadorPorId(item.idJogador)
          )
          }}
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
  props: ["lista",  "golsTime"],
  data: () => {
    return {
      entidadeSelecionada: { },
      
    };
  },
  computed: {
      ...mapGetters(['getGolsTime','getEntePorId']),
      gJogadorPorId(){
        return idJogador => this.getEntePorId("jogadores",idJogador)
      },
      IdPartidaAtual(){
        return 1000
      },
      NomeDoJogador(){
        return function(jogadr){
          if(!jogadr||!jogadr.nome) return ''
          return jogadr.nome
        }
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
};
</script> 