<template>
  <div class="col-12">
    <label :for="nome"  class="form-label">{{ nome }}</label>
    <select
      class="form-select" 
      :id="nome"
      :placeholder="nome"
      :value="modelValue" v-on:click="tt"
      @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="item in itens" :key="item.id"
       :value="item.id || item" >
        {{ item.nome || nomeNaoMaisPresenteNaLista(item.id) || item}}
        </option>
        <option :value="false"> ----- </option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CampoDropDown',
  emits: ['update:modelValue'],
  props: ['nome', 'modelValue', 'itens'],
  computed:{
    ...mapGetters(['getEntePorId']),
    nomeNaoMaisPresenteNaLista(){      
      return id => {
        let timeEncontrado = this.getEntePorId("times",id)
        if(timeEncontrado){
          console.log(timeEncontrado.nome)
          return timeEncontrado.nome
        }
      }
    }
  },
  methods: {
    atualizar() {
      this.$emit('bombom')
    },
    tt(){
      console.log('tt'+this.modelValue)
    }
  }
}
</script>

<style scoped>

</style>
