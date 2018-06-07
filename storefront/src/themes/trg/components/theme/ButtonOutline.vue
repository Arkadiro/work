<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :to="link"
    class="no-outline px30 py10 bg-cl-transparent h4 no-underline"
    :class="{
      light : color === 'light', 'brdr-white' : color === 'light', 'cl-white' : color === 'light',
      dark : color === 'dark', 'brdr-darkgray' : color === 'dark', 'cl-secondary' : color === 'dark',
      blue: color === 'blue', 'cl-white' : color === 'blue',
      yellow: color === 'yellow', 'cl-black': color === 'yellow',
      red: color === 'red', 'cl-white': color === 'red'
    }"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'ButtonOutline',
  directives: { focusClean },
  props: {
    color: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: null,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $dark-border: color(secondary);
  $white: color(white);
  $black: color(black);

  .button-outline {
    border: 2px solid;
  }
  .dark {
    font-weight: 200;
    border: 1px solid $dark-border;
    &:hover,
    &:focus {
      color: $white;
      background: $black;
      border-color: $black;
    }
  }
  .light {
    &:hover,
    &:focus {
      color: $black;
      background: $white;
      border-color: $white;
    }
  }
  .blue {
    background-color: #3399FF;
    border-radius: 8px;
  }
  .yellow {
    background-color: #FFDB5E;
    border-radius: 8px;
  }
  .red {
    background-color: #EA6C6A;
    border-radius: 8px;
  }
</style>
