import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		myMessage: "hello",
		phones: [],
		selectedPhones: []
	},

	mutations: {
		setPhones(state, payload) {
			state.phones = payload;
		},

		setSelectedPhones(state, payload) {
			state.selectedPhones = payload;
			state.selectedPhones = payload.map((p) => {
				p.totalPrice = p.count * p.priceUAH;
				return p;
			});
		},
	}
})