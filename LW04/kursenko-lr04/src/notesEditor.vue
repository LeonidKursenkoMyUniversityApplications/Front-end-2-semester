<template>
  <div class="note-editor">
    <div class="tags-group">
      <span v-for="tag in selectedTags" class="tag">
        {{tag}} <span class="delete-tag" @click="deleteTag(tag)">x</span>
      </span>
    </div>
    <textarea placeholder="Enter your note ..." rows="5" class="textarea"
      v-model="newMsg"></textarea>
      <button class="add-button" @click="addMsg()"> Add</button>
      <color-picker :color="defaultColor" v-model="defaultColor" />
      <tags-editor :tags="tags" v-model="selectedTags" />
  </div>
  
</template>

<script>
  import colorPicker from "./colorPicker.vue"
  import tagsEditor from "./tagsEditor.vue"

  export default 
  {
    props: ["tags"],

    components: 
    {
        "color-picker": colorPicker,
        "tags-editor": tagsEditor
    },

    data()
    {
      return {
        newMsg: "",
        defaultColor: "",
        selectedTags: []
      }
    },

    methods: 
    {
      addMsg() 
      {
        if(this.newMsg.trim().length != 0) 
        {
          let msg = {
            id: Date.now(),
            text: this.newMsg,
            color: this.defaultColor,
            tags: this.selectedTags.slice()
          };
          this.$parent.messages.push(msg);
          this.$parent.filteredMessages.push(msg);
          this.newMsg = "";
          this.selectedTags.splice(0, this.selectedTags.length);
        }
      },

      deleteTag(tag)
      {
        let index = this.selectedTags.indexOf(tag);
        if(index > -1)
        {
          this.selectedTags.splice(index, 1);
        }
      }
    }    
  }
</script>

<style>

.note-editor {
    width: 100%;
    max-width: 600px;
    padding: 16px;
    margin: 16px auto;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.textarea {
    width: 100%;
    resize: none;
    margin: 5px;
    font-size: 14px;
    border: none;
    font-weight: 300;
}

.textarea:focus {
    outline: 0;
}

.add-button {
    align-self: flex-end;
    width: 100px;
    background-color: #44c767;
    border-radius: 8px;
    border: 1px solid #18ab29;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
    padding: 8px 8px;
    text-transform: uppercase;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
}

.add-button:hover {
    background-color: #5cbf2a;
}

.add-button:active {
    position: relative;
    top: 1px;
}

.add-button:focus {
    outline: 0;
}

.delete-button {
    align-self: flex-end;
    width: 100px;
    background-color: #F21115;
    border-radius: 8px;
    border: 1px solid #9C0204;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
    padding: 8px 8px;
    text-transform: uppercase;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
}

.delete-button:hover {
    background-color: #9C0204;
}

.delete-button:active {
    position: relative;
    top: 1px;
}

.delete-button:focus {
    outline: 0;
}

.color-picker {
  position: absolute;
  left: 25px;
  bottom: 30px;
  z-index: 1;
}


</style>
