<template>
  <div class="col-12">
    <label :for="nome" class="form-label">{{ nome }}</label>
    <select
      class="form-select"
      :id="nome"
      :placeholder="nome"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    
      <option
        v-for="item in itens"
        :key="item.id"
        :value="item.id || item"
        v-bind:disabled="estaSelecionado(item)"  >
        {{ item.nome || item }}
      </option>
      <option :value="false">-----</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CampoDropDown",
  emits: ["update:modelValue"],
  props: ["nome", "modelValue", "itens", "timesJaSelecionados"],
  computed: {
    ...mapGetters(["getEntePorId"]),
    estaSelecionado(){
      return function desabilita(item){
        if(!this.timesJaSelecionados) return false

        for (const timeSelec of this.timesJaSelecionados) {
          
          let OpcaoJaSelecionada = timeSelec.id === item.id
          if(OpcaoJaSelecionada){
            return true;
          }            
        }
        return false;
      };
    },
    itensPossiveis() {
      if (!this.modelValue) return this.itens;
      let disponiveis = this.itens.filter(
        (item) => item.id !== Number(this.modelValue)
      );

      return disponiveis || this.itens;
    },
    itensSelecionados() {
      if (!this.modelValue) return [];
      let disponivel = this.itens.filter(
        (item) => item.id === Number(this.modelValue)
      )[0];

      return disponivel || []

    },
  },
  data: () => {
    return {
      nomeItemExcluido: false,
    };
  },
  watch: {
    modelValue(prev, next) {
      
    },
  }
};
</script>

<style scoped>
</style>
