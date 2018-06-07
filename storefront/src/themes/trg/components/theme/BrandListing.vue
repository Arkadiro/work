<template>
  <div class="brand-listing flex flex-column">
    <div class="brand-listing-item mb12" v-for="(item, index) in items" :key="index">
      <router-link :to="{path: 'magazine'}" class="no-underline flex brand-listing-tile center-xs bg-cl-white brdr-1 py11 brdr-cl-gainsboro middle-xs">
        <img :src="`assets/home/bestshops/${index}.jpg`" :alt="item">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: new Array(6)
    }
  }
}
</script>
<style lang="scss" scoped>
.brand-listing {
  .brand-listing-item {
    a {
      width: 136px;
      height: 52px;
      img {
        height: auto;
        width: auto;
        max-height: 30px;
        max-width: 75px;
      }
    }
  }
}
</style>
