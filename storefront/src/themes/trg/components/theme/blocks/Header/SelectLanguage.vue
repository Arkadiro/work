<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex middle-xs"
    @click="gotoLanguage()"
    :aria-label="$t('Open languages')"
  >
    <slot name="title" />
  </button>
</template>

<script>
export default {
  name: 'SelectLanguage',
  data () {
    return {
      dropdownOpen: false,
      screenWidth: null
    }
  },
  methods: {
    gotoLanguage () {
      this.$bus.$emit('modal-show', 'language')
      this.$store.commit('ui/setLanguage', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-white: color(white);
  $bg-secondary: color(secondary, $colors-background);
</style>
