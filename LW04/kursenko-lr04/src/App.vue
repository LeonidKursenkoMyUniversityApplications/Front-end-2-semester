<template>
  <div class="notes-app">
     <h2 class="app-header">NotesApp</h2>     
     <div>
       <tagsCreator class="menu-item" :tags="tags" :messages="messages" />
       <tagsFilter class="menu-item" :tags="tags" :messages="messages" v-model="filteredMessages" />
     </div>
     <notesEditor :tags="tags" />
     <notesGrid :messages="filteredMessages" />
  </div>
  
</template>

<script>
  import notesEditor from "./notesEditor.vue"
  import notesGrid from "./notesGrid.vue"
  import tagsCreator from "./tagsCreator.vue"
  import tagsFilter from "./tagsFilter.vue"

  export default {
    components: {
      notesEditor, notesGrid, tagsCreator, tagsFilter
    },

    data() {
      return {
        messages: [],
        filteredNotes: [],
        tags: []
      }
    },

    created()
    {      
      this.loadData();
      this.messages = this.messages.map((m) =>
      {
        if(m.tags == undefined) m.tags = [];
        return m;
      });
      this.filteredNotes = this.messages.slice();
    },

    computed:
    {
      filteredMessages:
      {
        get()
        {
          return this.filteredNotes;
        },

        set(notes)
        {
          this.filteredNotes = notes;
        }
      }
    },

    methods:
    {
      loadData()
      {
        if (localStorage.messages != undefined) {
          this.messages = JSON.parse(localStorage.messages);
        }
        if (localStorage.tags != undefined) {
          this.tags = JSON.parse(localStorage.tags);
        }
      },

      saveData()
      {
        localStorage.messages = JSON.stringify(this.messages);
        localStorage.tags = JSON.stringify(this.tags);
      }
    },

    watch:
    {
      messages(vals)
      {
        this.saveData();
      },

      tags(vals)
      {
        this.saveData();
      }
    }
  }
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
    font-weight: 300;
    background-color: #eaeaea;
}

.notes-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
}

.app-header {
    text-align: center;
    font-weight: 500;
    color: grey;
    text-shadow: 0px 2px 3px rgba(255,255,255,0.5);
}

.tags-editor {
  position: absolute;
  left: 60px;
  bottom: 20px;
  z-index: 1;
  z-index: 1;
}

.checked-listbox
{
  list-style-type: none;
  position: relative;
  padding-left: 0px;
  max-height: 100px;
  width: 100%;
  overflow:hidden; 
  overflow-y:scroll;
}

.checked-listbox li:hover
{
  border: 1 solid green;
  background: lightgreen;
}

.tags-creator-btn
{  
  border:1;
  border-radius: 8px;
  background: lightgreen;
  padding-top: 5px;    
  padding-left: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  height: 30px;
}

.tags-creator-btn:hover
{
  background: green;
  color: white;
  box-shadow: 0 5px 5px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.11);
}

.tags-creator-btn:active
{
  background: darkgreen;
}

.tags-window
{
  min-width: 300px;  
  background-color: white;
  position: absolute;
  top: 30px;
  left: -125px;
  padding-top: 5px;    
  padding-left: 15px;
  padding-bottom: 5px;
  padding-right: 5px;
  border: 1 solid black;
  z-index: 2;
}

.tags-group
{
}

.tag
{
  background: lightgreen;
  border-radius: 8px;
  border: 1 solid black;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;  
  display: inline-flex;
}

.tag:hover {
  background: yellowgreen;
}

.delete-tag
{
  margin-left: 5px;
  margin-right: 5px;
  color: gray;
}

.delete-tag:hover 
{
  color: black;
}

.delete-tag:active
{
  color: red;
}

.block
{
    display: block;
}

.menu-item
{
  display: inline-flex;
}
</style>
