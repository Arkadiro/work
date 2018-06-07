<template>
  <div class="checkbox">
    <label class="flex cl-dark-blue relative fs16 pl12">
      <input type="checkbox" v-model="getChecked" @change="$emit('changed-flag', $event.getChecked)" ref="checkbox" class="absolute width-18 height-18">
      <span class="checkbox-custom relative block width-18 height-18 brdr-1 brdr-cl-lightgray brdr-round3 bg-cl-white"/>
      {{ labeltext }}</label>
  </div>
</template>
<script>
export default {
  props: {
    labeltext: {
      type: String,
      required: true
    },
    isChecked: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      getChecked: this.isChecked
    }
  }
}
</script>
<style lang="scss">
@import '~theme/css/variables/responsive';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-white: color(white);
$color-blue: color(blue);
$color-dark-blue: color(dark-blue);
$color-lightgray: color(lightgray4);
.checkbox {
  input[type=checkbox] {
    opacity: 0;
    left: 0;
    top: 0;
    z-index: 1;
  }
  input[type=checkbox]:hover + .checkbox-custom {
    border: 1px solid $color-blue;
  }
  input[type=checkbox]:checked ~ label {
    color: $color-dark-blue;
  }
  .checkbox-custom {
    right: 10px;
    overflow: hidden;
  }
  input[type=checkbox]:checked ~ .checkbox-custom {
    border: 1px solid $color-blue;
  }
  input[type=checkbox]:checked ~ .checkbox-custom:after {
    font-family: 'Material Icons';
    content: "done";
    font-size: 15px;
    line-height: 16px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: -1px;
    background: $color-blue;
    border-radius: 3px;
    border: 1px solid $color-blue;
  }
}
</style>
