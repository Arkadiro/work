<template>
  <div id="categories">
    <section class="bg-cl-white pb30 pt21 px0">
      <div class="container">
        <breadcrumbs :routes="[]" active-route="All Catalog" class="mb52"/>
        <div class="title fs40 lh56 weight-900 cl-dark-blue mb25">{{ $t('All biggest catalog') }}</div>
        <masonry
          :cols="{default: 4, 1024: 2, 768: 1}"
          :gutter="{default: '20px', 700: '15px'}"
        >
          <div v-for="(category, index) in categories.filter(e => e.level === 1)" :key="index" class="category brdr-1 brdr-cl-lightgray4 mb20">
            <img :src="getCategoryImage(category)" :alt="getCategoryName(category)" class="w-100 brdr-bottom brdr-cl-lightgray4 category-img">
            <div class="fs24 cl-dark-blue weight-900 lg30 px20 py18 category-name">{{ getCategoryName(category) }}</div>
            <div class="px20 sub-list mb20">
              <div v-for="(subcategory, index3) in getSubCategories(category, 2)" :key="index3" class="w-100">
                <div class="fs14 lh28 weight-500 cl-dark-blue">
                  <router-link :to="{name: 'category', params: { slug: subcategory.code }}">{{ getCategoryName(subcategory) }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </masonry>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { categoryName } from 'core/helpers'
import accetsCategories from 'theme/resource/categories.json'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry)
export default {
  components: {
    Breadcrumbs
  },
  computed: {
    getAccetsCategories () {
      return accetsCategories
    },
    categories () {
      return this.$store.state.category.list
    }
  },
  methods: {
    getCategoryName (category) {
      return categoryName(category)
    },
    getCategoryImage (category) {
      let categoryName = this.getCategoryName(category)
      let accetsCategory = this.getAccetsCategories.filter((e) => e.name === categoryName)
      if (accetsCategory) {
        let res = accetsCategory[0].img
        return res
      }
    },
    getSubCategories (list, level = false) {
      let categoriesList = []
      if (list && list.all_childrens && list.all_childrens.length) {
        list.all_childrens.forEach((element) => {
          categoriesList.push(this.getCategoryByCode(element))
        })
      }
      if (level) {
        categoriesList = categoriesList.filter((e) => e.level === level)
      }
      return categoriesList
    },
    getCategoryByCode (code) {
      return this.categories.find((elem) => elem.code === code)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';
#categories {
  @media (max-width: $screen__l ) {
    .title {
      font-size: 20px;
      line-height: 27px;
      margin-bottom: 17px;
    }
    .subcategory {
      font-size: 14px;
      line-height: 42px;
      padding-left: 0;
    }
    .sub-list {
      padding-left: 8px;
    }
    .category {
      border: none;
      margin-bottom: 30px;
      &-name {
        font-size: 20px;
        line-height: 25px;
        padding-left: 0;
      }
      &-img {
        border: none;
      }
    }
  }
}
</style>
