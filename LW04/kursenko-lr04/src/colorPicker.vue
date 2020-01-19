<template>
  <div class="color-picker" ref="colorpicker">
    <!-- <span class="input-group-addon color-picker-container"> -->
      <span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"></span>
      <compact-picker v-model="colors" @input="updateFromPicker" v-if="displayPicker" />
    <!-- </span> -->
  </div>
  
</template>

<script>
  import {Photoshop, Swatches, Chrome, Compact} from "vue-color"
  export default {
    components: 
    {
        'photoshop-picker': Photoshop,
        'swatches-picker': Swatches,
        'chrome-picker': Chrome,
        'compact-picker': Compact
    },

    props: ['color'],

    data() 
    {
      return {
        colors:
        {
          hex: '#FCC400',
          hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
          hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
          rgba: { r: 25, g: 77, b: 51, a: 1 },
          a: 1
        },
        colorValue: '',
        displayPicker: false,
      }
    },

    mounted() 
    {
      this.setColor(this.color || '#FCC400');
    },

    methods: 
    {
      setColor(color) 
      {
        this.updateColors(color);
        this.colorValue = color;
      },

      updateColors(color) 
      {
        if(color.slice(0, 1) == '#') 
        {
          this.colors.hex = color;
        }
        else if(color.slice(0, 4) == 'rgba') 
        {
          let rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
            hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
          this.colors.hex = hex;
          this.colors.a = rgba[3];
        }
      },

      showPicker() 
      {
        document.addEventListener('click', this.documentClick);
        this.displayPicker = true;
      },

      hidePicker() 
      {
        document.removeEventListener('click', this.documentClick);
        this.displayPicker = false;
      },

      togglePicker() 
      {
        this.displayPicker ? this.hidePicker() : this.showPicker();
      },

      updateFromPicker(color) 
      {
        this.colors = color;
        if(color.rgba.a == 1) 
        {
          this.colorValue = color.hex;
        }
        else 
        {
          this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
        }
      },

      documentClick(e) 
      {
        let el = this.$refs.colorpicker;
        let target = e.target;
        if(el !== target && !el.contains(target)) this.hidePicker();
      }
    },

    watch: 
    {
      colorValue(val) 
      {
        if(val) 
        {
          this.updateColors(val);
          this.$emit('input', val);
        }
      }
    }
    
  }
</script>

<style>
.color-picker
{
  height: 20px;
  display: block;
}

.vc-compact {
  border-color: black;
  border: 1;
  border-style: solid;
}

.current-color {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #000;
  cursor: pointer;
  border-radius: 8px;
}

.current-color:hover {
  box-shadow: 0 5px 5px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.11);
  border-color: black;
  border-width: 2px;
}

</style>
