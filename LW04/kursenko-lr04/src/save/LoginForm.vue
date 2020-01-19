<template>
  <form>
    <input type="text" v-model="name" />
    <input type="password" v-model="pass" />
    <button type="button" @click="login"> OK </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      name: "",
      pass: ""
    }
  },
  methods: { 
    login () {
      this.$emit('login', {
        name: this.name,
        pass: this.pass
      })
      console.log(this.name);
    }
  }
}
</script>