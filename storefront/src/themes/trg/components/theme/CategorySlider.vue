<template>
  <div class="collection container mb20 categories-slider">
    <div class="collection-title fs30 weight-900 lh42 mt15">
      <span class="weight-900 cl-dark-blue">{{ title }}</span>
    </div>
    <div>
      <no-ssr>
        <carousel v-bind="config">
          <slide v-for="(category, index) in categoriesList" :key="index" class="w-100">
            <category-tile
              class="collection-category"
              :category="category"
            />
          </slide>
        </carousel>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import categoriesList from 'theme/resource/categories_list.json'
import CategoryTile from 'theme/components/theme/CategoryTile.vue'

export default {
  computed: {
    categoriesList () {
      return categoriesList
    }
  },
  props: {
    config: {
      type: Object,
      default () {
        return {
          perPage: 2
        }
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Slide,
    Carousel,
    CategoryTile,
    'no-ssr': NoSSR
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/colors';
@import '~theme/css/components/slider';
  .collection-title {
    font-family: Avenir;
  }

  @media (max-width: $screen__m) {
    .slider-name {
      font-size: 20px;
      line-height: 22px;
    }
    .collection-title {
      font-size: 20px;
      line-height: 42px;
    }
  }
</style>
