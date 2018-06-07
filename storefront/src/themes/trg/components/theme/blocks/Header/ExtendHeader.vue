<template>
  <div class="extend-header bg-cl-white relative">
    <top-panel class="header-no-mobile" />
    <div class="container">
      <header-panel class="header-no-mobile" />
      <category-panel class="header-no-mobile" />
    </div>
    <mobile-header class="header-no-desktop" />
  </div>
</template>

<script>
import HeaderPanel from './HeaderPanel.vue'
import CategoryPanel from './CategoryPanel.vue'
import TopPanel from './TopPanel.vue'
import MobileHeader from './MobileHeader.vue'

export default {
  name: 'ExtendHeader',
  components: {
    HeaderPanel,
    CategoryPanel,
    TopPanel,
    MobileHeader
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';

.extend-header {
  width: 100%;
  box-shadow: 0 0 30px 0 rgba(0,0,0,0.2);
  z-index: 3;
  .header-no-mobile {
    @media ( max-width: $screen__l ) {
      display: none;
    }
  }

  .header-no-desktop {
    @media ( min-width: ($screen__l + 1)) {
      display: none;
    }
  }

}
</style>
