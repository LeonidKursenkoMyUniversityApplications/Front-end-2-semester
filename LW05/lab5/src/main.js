import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
// import Vuex from 'vuex'

Vue.use(Vuetify)
Vue.use(VueRouter)
// Vue.use(Vuex)

import Main from './components/Main.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import Contact from './components/Contact.vue'
import Cart from './components/Cart.vue'
import Order from './components/Order.vue'

import store from './store/store.js'

const routes = [
	 {path: "/", component: Main},
	 {path: "/about", component: About},
	 {path: "/login", component: Login},
	 {path: "/cart", component: Cart},
	 {path: "/contact", component: Contact},
	 {path: "/order", component: Order},
]

const router = new VueRouter({
	mode:'history',
	routes
})

import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
