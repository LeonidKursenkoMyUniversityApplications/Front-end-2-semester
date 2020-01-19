<template>
  <div> 
    <v-layout row justify-center>
        <v-flex xs12>
            <v-btn large color="success" justify-center to="/order"
            :disabled="isOrderDisabled()">Order</v-btn>            
            <v-spacer></v-spacer>
            <span class="price">Total price: {{totalPrice}} ₴</span>
        </v-flex>
    </v-layout>                     
    <v-data-table
      :headers="headers"
      :items="selectedPhones"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td><img :src="props.item.imageURL" class="image" /></td>
        <td>{{ props.item.productName }}</td>
        <td class="text-ms-right">{{ props.item.count }}</td>
        <td class="text-ms-right">{{ props.item.totalPrice }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon large class="mx-0" @click="add(props.item)" :disabled="isDisabled(props.item)"
          title="Add one item">
            <v-icon large color="teal">add</v-icon>
          </v-btn>
          <v-btn icon large class="mx-0" @click="deleteItem(props.item)" title="Substract one item">
            <v-icon large color="pink" >remove</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import store from '../store/store.js'

export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Image',
          align: 'center',
          sortable: false,
          value: 'imageURL'
        },
        { text: 'Product', value: 'productName' },
        { text: 'Amount', value: 'count' },
        { text: 'Price, ₴', value: 'totalPrice' },
        { text: 'Actions', value: 'productName', sortable: false }
      ],
    }),

    computed: {
        phones: {
            get: function(){
                return  store.state.phones;
            },

            set: function(newValue){
                store.commit('setPhones', newValue);
            }
        },

        selectedPhones: {
            get: function(){
                return  store.state.selectedPhones;
            },

            set: function(newValue){
                store.commit('setSelectedPhones', newValue);
            }
        },

        totalPrice(){
            let total = 0;
            this.selectedPhones.forEach((p) => {
                total += p.totalPrice;
            });
            return total;
        }
    },

    methods: {
        isOrderDisabled() {
            return this.selectedPhones.length < 1;
        },

        isDisabled(phone) {
            let index = this.phones.findIndex(p => p.id == phone.id);
            return this.phones[index].countProducts < 1;
        },

        add(phone) {
            let index = this.selectedPhones.findIndex(p => p.id == phone.id);
            let index2 = this.phones.findIndex(p => p.id == phone.id);  
            if(index > -1) {
                this.selectedPhones[index].count++;
            } else {
                phone.count = 1;
                this.selectedPhones.push(phone);   
                index = this.selectedPhones.findIndex(p => p.id == phone.id);                
            } 
            this.selectedPhones =  this.selectedPhones;  
            this.phones[index2].countProducts--;
        },

        deleteItem(phone) {
            let index = this.selectedPhones.findIndex(p => p.id == phone.id);
            let index2 = this.phones.findIndex(p => p.id == phone.id);  
            if(index > -1) {
                this.selectedPhones[index].count--;
                if(this.selectedPhones[index].count == 0)
                    this.selectedPhones.splice(index, 1);
                this.selectedPhones =  this.selectedPhones;  
                this.phones[index2].countProducts++;
            } 
            
        },
    }
}
</script>

<style scoped>
    .image{
        width: auto;
        height: auto;
        max-height: 50px;
        max-width: 50px;
    }

    .price{
        font-size: 18pt;
    }

    .order{
        align: right;
    }
</style>