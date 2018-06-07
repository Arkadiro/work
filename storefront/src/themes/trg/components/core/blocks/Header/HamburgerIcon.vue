<template>
  <div class="hamburger hamburger--slider js-hamburger" :class="{'is-active': isOpen}" @click="openSidebarMenu">
    <div class="hamburger-box">
      <div class="hamburger-inner"/>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/HamburgerIcon')]
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$hamburger-padding-x: 0px !default;
$hamburger-padding-y: 0px !default;
$hamburger-layer-width: 20px !default;
$hamburger-layer-height: 2px !default;
$hamburger-layer-spacing: 4px !default;
$hamburger-layer-color: color(dark-blue) !default;
$hamburger-hover-opacity: 1 !default;
@import '~hamburgers/_sass/hamburgers/hamburgers.scss';
</style>
