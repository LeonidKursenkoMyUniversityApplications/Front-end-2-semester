<template>
  <div class="tags-creator" ref="tagsCreator">
    <span class="tags-creator-btn" @click="toggleTagsCreator()">Edit</span>
    <div class="tags-window" v-if="displayTagsCreator" >
      <span class="block">
        <input type="text" v-model="newTag" class="input-tag" placeholder="Enter new tag name...">
        <button @click="addTag()" class="add-button">Add</button>
      </span>
      <br/>
      <ul class="checked-listbox">
        <li v-for="tag in tags">
          <input type="checkbox" :id="tag" :value="tag" v-model="selectedTags">
          <label :for="tag">{{tag}}</label>
        </li>
      </ul>
      <button @click="deleteTag()" class="delete-button">Delete</button>
    </div>
  </div>
  
</template>

<script>
  export default {
    props:['tags', 'messages'],

    data()
    {
      return {
        selectedTags: [],
        newTag: "",
        displayTagsCreator: false
      }
    },

    methods: {
      toggleTagsCreator()
      {
        this.displayTagsCreator = !this.displayTagsCreator;
      },

    	addTag()
      {
        if(this.newTag.trim().length != 0) 
        {
          this.$parent.tags.push(this.newTag);
          this.newTag = "";
        }
      },

      deleteTag()
      {
        while(this.selectedTags.length > 0)
        {
          let tag = this.selectedTags[0];
          if(this.isTagUsed(tag) == true) return;
          this.selectedTags.splice(0, 1);
          let pos = this.$parent.tags.indexOf(tag);
          this.$parent.tags.splice(pos, 1);
        } 
      },

      isTagUsed(tag)
      {
        for(let i = 0; i < this.messages.length; i++)
        {
          if(this.messages[i].tags == undefined) continue;
          let tags = this.messages[i].tags;
          if(tags.indexOf(tag) > -1) return true;
        }
      },

      showTagsCreator() 
      {
        document.addEventListener('click', this.documentClick);
        this.displayTagsCreator = true;
      },

      hideTagsCreator() 
      {
        document.removeEventListener('click', this.documentClick);
        this.displayTagsCreator = false;
      },

      toggleTagsCreator() 
      {
        this.displayTagsCreator ? this.hideTagsCreator() : this.showTagsCreator();
      },

      documentClick(e) 
      {
        let el = this.$refs.tagsCreator;
        let target = e.target;
        if(el !== target && !el.contains(target)) this.hideTagsCreator();
      },
    }
  }
</script>

<style>
.tags-creator
{
  position: relative;
  background: none;
}

.input-tag
{
  height: 30px;
}
</style>
