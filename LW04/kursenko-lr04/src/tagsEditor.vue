<template>
  <div class="tags-editor" ref="tagsEditor">
    <span class="tags-creator-btn" @click="toggleTagsEditor()">Tags</span>
    <div class="tags-window" v-if="displayTagsEditor" >
      <ul class="checked-listbox">
        <li v-for="tag in tags">
          <input type="checkbox" :id="tag" :value="tag" v-model="selectedTags">
          <label :for="tag">{{tag}}</label>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
  export default {
    props: ['tags'],

    data()
    {
      return {
        displayTagsEditor: false,
        selectedTags: []
      }
    },

    methods: {
    	showTagsEditor() 
      {
        document.addEventListener('click', this.documentClick);
        this.displayTagsEditor = true;
      },

      hideTagsEditor() 
      {
        document.removeEventListener('click', this.documentClick);
        this.displayTagsEditor = false;
      },

      toggleTagsEditor() 
      {
        this.displayTagsEditor ? this.hideTagsEditor() : this.showTagsEditor();
      },

      documentClick(e) 
      {
        let el = this.$refs.tagsEditor;
        let target = e.target;
        if(el !== target && !el.contains(target)) this.hideTagsEditor();
      },
    },

    watch:
    {
      selectedTags(tags)
      {
        this.selectedTags = tags;
        this.$emit('input', tags);
      }
    }
  }
</script>

<style>
.tags-editor
{
  padding-top: 5px;    
  padding-left: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  height: 30px;
  background: none;
}
</style>
