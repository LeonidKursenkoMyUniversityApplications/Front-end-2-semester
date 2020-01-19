<template>
  <div class="notes-grid" ref="grid">
    <note v-for="(item, index) in messages" :text="item.text" :color="item.color" :key="item.id" :index="index"
        :tags="item.tags" :noteId="item.id" />
  </div>
  
</template>

<script>
    import note from "./note.vue"
    import Masonry from "masonry-layout"
  
  export default {
    components: {
        note
    },

    props: ['messages'],

    mounted() {
        let grid = this.$refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
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
.notes-grid {
    margin: 0 auto;
}

</style>
