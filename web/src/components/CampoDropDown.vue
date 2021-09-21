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
export default {
  name: "CampoDropDown",
  emits: ["update:modelValue"],
  props: ["nome", "modelValue", "itens", "timesJaSelecionados"],
  computed: { 
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
  }, 
};
</script>

<style scoped>
</style>
