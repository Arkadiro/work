<template>
  <div class="category-content">
    <router-link class="no-underline flex middle-xs center-xs flex-column" :to="{ name: 'home' }">
      <div class="category-img mt15 w-100" :style="{ backgroundImage: `url(${category.image})`}"/>
      <div class="name fs16 weight-900 lh43 cl-dark-blue px3">{{ category.name }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
  .category-content {
    word-break: break-word;
  }
  .no-underline {
    height: 100%;
    min-height: 208px;
  }
  .category-img {
    min-height: 80px;
    background-repeat: no-repeat;
    max-width: 60px;
    max-height: 70px;
    background-position: center;
  }
  .name {
    font-family: Avenir;
  }
  @media (max-width: $screen__m) {
    .category-img {
      margin-bottom: -15px;
    }
    .no-underline {
      height: 120px;
      min-height: auto;
      overflow: hidden;
    }
  }
</style>
