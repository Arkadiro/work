<template>
  <transition name="fade">
    <div class="overlay fixed w-100" @click="close" v-if="isVisible" />
  </transition>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  methods: {
    close () {
      this.$store.commit('ui/setOverlay', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setWishlist', false)
      this.$store.commit('ui/setSearchpanel', false)
      this.$store.commit('ui/setSidebar', false)
    }
  },
  mixins: [coreComponent('Overlay')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-bg: color(white);

.overlay {
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba($color-bg, 0.5);
  z-index: 3;
}
</style>
