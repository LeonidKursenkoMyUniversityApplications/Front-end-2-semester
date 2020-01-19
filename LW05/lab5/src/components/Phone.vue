<template>
    <div >        
        <v-card width="300px"  :raised="true">    
            <div class="productName">{{product.productName}}</div>
            <img :src="product.imageURL" />
            <v-card-text primary-title>   
                <v-layout row>
                    <v-flex xs6>
                        <span title="Operating system">OS:</span> {{product.operationSystem}}
                    </v-flex>
                    <v-flex xs6>
                        SIM cards: {{product.numSimCard}}
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <v-icon title="Amount" large>content_copy</v-icon> {{product.countProducts}}
                    </v-flex>
                    <v-flex xs6>
                        <v-icon title="Views" large>pageview</v-icon>
                        <span class="counter numscroller">{{product.countViews}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <div>Brand: {{product.brandName}}</div>
                        <div>Price: {{product.priceUAH}}₴</div>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn color="success" :disabled="isDisabled" @click="add(product)">Add</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex xs6>
                        <starRating :increment="0.01" :title="product.productRate" :show-rating="false" :star-size="30" :rating="product.productRate" :read-only="true"></starRating>
                    </v-flex>
                </v-layout>
            </v-card-text> 
        </v-card>
        <!-- <div>{{product}}</div> -->
    </div>
</template>


<script>
import Vue from 'vue'
import StarRating from 'vue-star-rating'
import store from '../store/store.js'

export default {
    components: {
        starRating: StarRating,
    },

    props: ['product'],

    data: () => ({
    }),

    computed:
    {
        isDisabled() {
            return this.product.countProducts < 1;
        },

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
    },

    methods: {
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
        }
    }
}
</script>

<style>

.productName
{
    font-weight: bold;
    text-align: center;
}

.card img {
  height: auto;
  width: auto;
  max-width: 150px;
  max-height: 250px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

</style>

