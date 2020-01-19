<template>
  <div class="tags-filter" ref="tagsCreator">
    <span class="tags-creator-btn" @click="toggleTagsFilter()">Filter</span>
    <div class="tags-window" v-if="displayTagsFilter" >
      <ul class="checked-listbox">
        <li>
          <input type="checkbox" id="all" v-model="allChecked">
          <label for="all">all</label>
        </li>
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
    props:['tags', 'messages'],

    data()
    {
      return {
        selectedTags: this.messages,
        allChecked: true,
        displayTagsFilter: false
      }
    },

    methods: {      
      showTagsFilter() 
      {
        document.addEventListener('click', this.documentClick);
        this.displayTagsFilter = true;
      },

      hideTagsFilter() 
      {
        document.removeEventListener('click', this.documentClick);
        this.displayTagsFilter = false;
      },

      toggleTagsFilter() 
      {
        this.displayTagsFilter ? this.hideTagsFilter() : this.showTagsFilter();
      },

      documentClick(e) 
      {
        let el = this.$refs.tagsCreator;
        let target = e.target;
        if(el !== target && !el.contains(target)) this.hideTagsFilter();
      },
    },
    
    computed:
    {
      filteredMessages:
      {
        get()
        {
          if(this.allChecked) 
          {
            return this.messages.slice();
          }
          let messages = this.messages.filter(m => 
          {
            for(let i = 0; i < this.selectedTags.length; i++)
              if(m.tags.indexOf(this.selectedTags[i]) > -1) return true;
            return false;
          });
          return messages;
        },

        // set(val)
        // {
        //   this.$emit('input', messages);
        // }
      }
    },

    watch:
    {
      selectedTags(val)
      {
        if(val.length != this.tags.length) this.allChecked = false;
        this.$parent.filteredMessages = this.filteredMessages;
      },

      allChecked(val)
      {
        if(val == true)
        {
          this.selectedTags = this.tags.slice();
        }
        // else
        // {
        //   this.selectedTags = [];
        // }
      }
    }
  }
</script>

<style>
.tags-filter
{
  position: relative;
  background: none;
}
</style>
