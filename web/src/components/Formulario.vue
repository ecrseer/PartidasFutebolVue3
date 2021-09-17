<template>
  <form v-on:submit.prevent="onSubmit">
    <div>
      <h2 v-if="entidade">Editar {{ entidadenome }}</h2>
      <h2 v-else>Criar {{ entidadenome }}</h2>

      <section v-if="istimef">
        <Campo nome="nome" v-model="Time.nome"></Campo>
        <CampoDropDown
          nome="estado"
          v-model="Time.estado"
          :itens="ESTADOS"
        ></CampoDropDown>
        <Campo nome="tecnico" v-model="Time.tecnico"></Campo>
        <Campo nome="torcida" tipo="number" v-model="Time.torcida"></Campo>
        <Campo
          nome="fundacao"
          tipo="number"
          v-model="Time.fundacao_ano"
        ></Campo>
        <CampoText tipo="texto" nome="info" v-model="Time.info"></CampoText>
      </section>
      <section v-else>
        <Campo nome="nome" v-model="Jogador.nome"></Campo>
        <Campo nome="salario" v-model="Jogador.salario"></Campo>
        <Campo nome="camisa" tipo="number" v-model="Jogador.camisa"></Campo>
        <Campo nome="posicao" v-model="Jogador.posicao"></Campo>
        <CampoDropDown
          nome="estado"
          v-model="Time.estado"
          :itens="ESTADOS"
        ></CampoDropDown>
      </section>
      <div v-if="carregando" class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>

      <div v-else>
        <button class="btn btn-success" @click="salvar" id="test_btnsalvar">
          salvar
        </button>
        <div v-if="entidade">
          <button class="btn btn-danger" color="error" @click="apagar">
            apagar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Campo from "./Campo.vue";
import CampoDropDown from "./CampoDropDown.vue";
import CampoText from "./CampoText.vue";
import { ESTADOS, useSheetApi } from "../const.js";

export default {
  name: "Formulario",
  components: { Campo, CampoDropDown, CampoText },
  props: ["entidade", "istimef", "entidadenome", "entidadepai"],
  data() {
    return {
      editando: false,
      ESTADOS,
      Time: {},
      Jogador: {},
    };
  },
  computed: {
    ...mapState(["carregando"]),
    ...mapGetters(["getUltimoEnteId"]),
    incrementaId() {
      if (this.entidadenome === "Time") return this.getUltimoEnteId("times");

      return this.getUltimoEnteId("jogadores");
    },
    payloadEdicaoGenerico(){
      return {
        original: this.entidade,
        editado: this[this.entidadenome],
      };
    },
  },
  methods: {
    ente_novin() {
      if (this.entidadenome === "Time") {
        return {
          nome: "",
          estado: "",
          tecnico: "",
          torcida: "",
          fundacao_ano: "",
          info: "",
          jogadores: [],
        };
      }
      return {
        nome: "",
        camisa: 0,
        salario: "$0.0",
        posicao: "",
      };
    },
    limparEntidade() {
      this.$bus.emit("FormUnselectJogador");
      this[this.entidadenome] = this.ente_novin();
    },
    handleSalvarEditarEntidadeInterior() {
      if (!this.entidade) {
        this.$bus.emit("FormAddJogador", this.Jogador);
        this[this.entidadenome] = this.ente_novin();
      } else {
        this.$bus.emit("FormEditJogador", this.payloadEdicaoGenerico);
      }
    },
    async salvar() {
      

      if (this.entidadepai) {
        this.handleSalvarEditarEntidadeInterior();
        return;
      }

      if (!this.entidade) {
        await this.$store.dispatch(
          `criar${this.entidadenome}`,
          this[this.entidadenome]
        );
        this[this.entidadenome] = this.ente_novin();
      } else {
        await this.$store.dispatch(
          `editar${this.entidadenome}`,
          this.payloadEdicaoGenerico
        );
      }

      this.$router.replace({
        name: "home",
      });
    },

    async apagar() {
      if (this.entidadenome !== "Jogador") {
        await this.$store.dispatch(`apagar${this.entidadenome}`, this.entidade);
        this.$router.push({
          name: "home",
        });
        return;
      }
      this.$bus.emit("FormDeleteJogador");

      this.limparEntidade();
    },

    atualizaEditEntidade() {
      if (this.entidade) {
        this[this.entidadenome] = { ...this.entidade };
      } else {
        this.limparEntidade();
      }
    },
  },

  watch: {
    entidade: function (novo, velho) {
      this.atualizaEditEntidade();
    },
  },
  mounted() {
    this.atualizaEditEntidade();
    if (this.entidadepai) {
      this.Time = this.entidadepai;
    }
  },
};
</script>
