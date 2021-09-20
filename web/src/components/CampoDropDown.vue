<template>
  <div class="col-12">
    <label :for="nome"  class="form-label">{{ nome }}</label>
    <select
      class="form-select" 
      :id="nome"
      :placeholder="nome"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="item in itens" :key="item.id" :value="item.id || item">
        {{ item.nome || item}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CampoDropDown',
  emits: ['update:modelValue'],
  props: ['nome', 'modelValue', 'itens'],
  methods: {
    atualizar() {
      this.$emit('bombom')
    }
  }
}
</script>

<style scoped>

</style>
