<template>
  <div>
   <user v-for='(user, index) in users'  :name='user.name' :description='user.descr' />
   <loginForm  />

  </div>
  
</template>

<script>
import user from './user.vue'
import loginForm from './LoginForm.vue'
export default {
  components: { user, loginForm},
  data () { 
    return {
      users: [ 
        {name: 'Alex', descr: 'This is our admin'}, 
        {name: 'Jack', descr: 'This is our manager'}, 
        {name: 'John', descr: 'This is our client'}, 
      ]
    } 
  },
  methods: {
            onLogin(data) {
                console.log("Parent", data);
            }
        }

}
</script>

<style>
p {
  color: red;
  font-style: italic;
}
</style>
