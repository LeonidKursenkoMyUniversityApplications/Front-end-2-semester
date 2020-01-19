<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Name"
      v-model="name"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Phone"
      v-model="phoneNumber"
      :rules="phoneRules"
      mask="phone"
      required
    ></v-text-field>
    <v-select
      label="Payment"
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Payment type is required']"
      required
    ></v-select>
    <div v-if="select=='Card'">
      <v-text-field
        label="Card id"
        v-model="cardId"
        :rules="cardIdRules"
        mask="credit-card"
        required
      ></v-text-field>
      <v-text-field
        label="CVV code"
        v-model="cvv"
        :rules="cvvRules"
        mask="###"
        required
      ></v-text-field>
      <v-select
        label="Month"
        v-model="month"
        :items="monthes"
        :rules="[v => !!v || 'Month is required']"
        required
      ></v-select>
      <v-select
        label="Year"
        v-model="year"
        :items="years"
        :rules="[v => !!v || 'Year is required']"
        required
      ></v-select>
    </div>
    <v-checkbox
      label="Do you agree?"
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      required
    ></v-checkbox>

    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      phoneNumber: '',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^[+]?([(]\d{3}[)])?\d+$/.test(v) || 'Phone number must be valid'
      ],
      cardId: '',
      cardIdRules: [
        v => !!v || 'Card number is required',
        v => /^\d{16}$/.test(v) || 'Card number must be valid'
      ],
      cvv: '',
      cvvRules: [
        v => !!v || 'CVV code is required',
        v => /^\d{3}$/.test(v) || 'CVV code must be valid'
      ],
      month: null,
      year: null,
      select: null,
      items: [
        'Cash',
        'Card',        
      ],
      checkbox: false
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            phone: this.phone,
            cardId: this.cardId,
            cvv: this.cvv,
            month: this.month,
            year: this.year,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    },

    computed: {
      monthes() {
        return [1,2,3,4,5,6,7,8,9,10,11,12];
      },

      years() {
        return [2014,2015,2016,2017,2018];
      }
    }
  }
</script>

<style>
</style>