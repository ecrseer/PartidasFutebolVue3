
<template>
  <router-link
    class="flex-sm-fill text-sm-center nav-link active"
    aria-current="times"
    to="/times"
    >Listar Times</router-link >
    <router-link
    class="flex-sm-fill text-sm-center nav-link active"
    aria-current="times"
    to="/times/criar"
    >Criar Time</router-link > 
    <router-link
    class="flex-sm-fill text-sm-center nav-link active"
    aria-current="partidas"
    to="/partidas"
    >Listar Partidas</router-link > 
</template>

<script>
export default {
  name: "BotoesRotas",
};
</script>
<style scoped>
</style>
