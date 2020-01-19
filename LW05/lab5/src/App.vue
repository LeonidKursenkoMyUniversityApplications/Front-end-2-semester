<template>
  <v-app>  
    <v-toolbar color="indigo accent-1" tag="v-toolbar-side-icon">      
          <router-link to="/">
              <v-icon large>home</v-icon>
          </router-link>
          <v-toolbar-title class="hidden-sm-and-down">EMobile</v-toolbar-title>      
          <v-spacer></v-spacer>
          <v-toolbar-items >
            <!-- <v-btn v-for="link in links" flat v-if="link.name!='Home'" :to="link.path">
              {{ link.name}}
            </v-btn> -->
            <v-btn flat to="/about" class="hidden-sm-and-down">About</v-btn>
            <v-btn flat to="/contact" class="hidden-sm-and-down">Contact</v-btn>
            <v-btn flat to="/cart">Cart</v-btn>
            <v-btn flat to="/login">Login</v-btn>
          </v-toolbar-items>        
    </v-toolbar>
     <v-container fluid>
       <router-view></router-view>
     </v-container>
    <v-footer height="auto" class="grey darken-3" >
      <v-layout row wrap justify-center>
        <v-btn
          color="white"
          flat
          v-for="link in links"
          :key="link.name"
          :to="link.path"
        >
          {{ link.name }}
        </v-btn>
        <v-flex xs12 py-3 text-xs-center white--text>
          &copy;2018 — <strong>Vuetify</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import store from './store/store.js'
import json from './images/data.json'

export default {
    name: 'app',
    data () {
      return {
        links: [
          {path: "/", name: 'Home'},
          {path: "/about", name: 'About'},          
          {path: "/contact", name: 'Contact'},
          {path: "/cart", name: 'Cart'},
          {path: "/login", name: 'Login'},
        ]
      }
    },

    computed: {
        phones: 
        {
            get: function(){
                return  store.state.phones;
            },

            set: function(newValue){
                store.commit('setPhones', newValue);
            }
        },
    },

    created() {
      // axios.get('http://apeps.kiev.ua/post/getphones')
    //axios.get('./images/data.json')
      axios.get('http://localhost:8080/images/data.json')
      .then(response => {
        this.phones = response.data;
        for(let i = 0; i < this.phones.length; i++)
        {
          //this.phones[i].id = parseInt(this.phones[i].id);
          this.phones[i].priceUAH = parseInt(this.phones[i].priceUAH);
          this.phones[i].countProducts = parseInt(this.phones[i].countProducts);
          this.phones[i].numSimCard = parseInt(this.phones[i].numSimCard);
          this.phones[i].productRate = parseFloat(this.phones[i].productRate);
          this.phones[i].countViews = parseInt(this.phones[i].countViews);
          this.phones[i].imageURL = ` http://localhost:8080/images/${this.phones[i].id}.jpg`;
          //this.phones[i].imageURL = `http://apeps.kiev.ua/images/phones/${this.phones[i].id}.jpg`;
          this.phones[i].count = 0;
          this.phones[i].totalPrice = 0;
        }
    })
    .catch(e => {
      this.errors.push(e);
    });
  },
}
</script>
