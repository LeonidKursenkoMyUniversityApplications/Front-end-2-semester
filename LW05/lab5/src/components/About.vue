<template>
	<div>
		<h1>About us</h1>
		<div>This site gives posibilities to buy smartphones.</div>
		<v-layout row justify-center>
			<v-flex xs12 sm6 md4 >
				<v-carousel style="height:300px;">
				    <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
				</v-carousel>
			</v-flex>
		</v-layout>	
	</div>
</template>

<script>
import store from '../store/store.js'
export default {
	data () {
	  return {
	  }
	},

	computed: {
		phones: {
            get: function(){
                return  store.state.phones;
            },

            set: function(newValue){
                store.commit('setPhones', newValue);
            }
        },

        items() {
        	return this.phones.map((p) => {
        		return { 'src' : p.imageURL}
        	});
        }

	},
}
</script>

<style scoped>
h1{
	text-align: center;
}

/*.jumbotron__image{
	height: 100px;
	width: auto;
}*/
</style>