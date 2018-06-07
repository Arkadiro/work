<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex middle-xs"
    @click="gotoLocation()"
    :aria-label="$t('Open my location')"
  >
    <slot name="title" />
  </button>
</template>

<script>
export default {
  name: 'LocationIcon',
  data () {
    return {
      dropdownOpen: false,
      screenWidth: null
    }
  },
  methods: {
    gotoLocation () {
      this.$bus.$emit('modal-show', 'location')
      this.$store.commit('ui/setLocation', true)
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
