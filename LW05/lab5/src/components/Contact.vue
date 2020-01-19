<template>
	<div>
		<h1>Contact us</h1>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
			    <v-list two-line>
			      <template v-for="(item, index) in items">
			        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
			        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
			        <v-list-tile v-else :key="item.number" avatar @click="">
			          <v-icon>call</v-icon>
			          <v-list-tile-content>
			            <v-list-tile-title v-html="item.number"></v-list-tile-title>
			          </v-list-tile-content>
			        </v-list-tile>
			      </template>
			    </v-list>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { header: 'Our phone numbers' },
          { number: '(044) 537-02-22'},
          { number: '(044) 503-80-80'},
          { number: '0 (800) 303-344'},
        ]
      }
    }
  }
</script>

<style scoped>
	h1{
		text-align: center;
	}
</style>