<template>
	<div>
		<v-layout row>
			<v-flex xs12>
		<v-container :fluid="true" ref="grid">
		    <phone-view :product="p" :key="p.id" v-for="p in phones" class="phone"></phone-view>
		</v-container>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import axios from 'axios'
import Masonry from "masonry-layout"
import PhoneView from "./Phone.vue"
import store from '../store/store.js'

export default {
	components: {
        'phone-view': PhoneView,
    },

	data: () => ({
		//phones: [],
		errors: []
	}),

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

        selectedPhones: 
        {
            get: function(){
                return  store.state.selectedPhones;
            },

            set: function(newValue){
                store.commit('setSelectedPhones', newValue);
            }
        },
    },

	mounted() {
        let grid = this.$refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.phone',
            columnWidth: 300,
            gutter: 10,
            isFitWidth: true
        });
    },

    updated() {
        this.msnry.reloadItems();
        this.msnry.layout();
    }
}
</script>

<style>
.phone {
	margin-bottom: 15px;
}
</style>