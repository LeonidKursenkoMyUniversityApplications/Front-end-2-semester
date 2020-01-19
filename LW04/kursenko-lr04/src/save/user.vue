<template>
  <div>
    <h2>Hello {{name}}</h2>
    <p>description {{description}}</p>
  </div>
  
</template>

<script>
export default {
  props: ['name', 'description'] 
  /*name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: 'Kursenko'
    }
  }*/
}
</script>

<style>

</style>
