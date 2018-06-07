<template>
  <div class="browsing-history container mb40">
    <div class="browsing-history-title cl-dark-blue fs30 weight-900 lh42 mb10">
      <span class="browsing-history">{{ $t('Inspired by your browsing history') }}</span>
    </div>
    <product-listing :products="products" :banners="banners" :columns="4"/>
    <div class="browsing-history-showmore align-center brdr-round4 py13 brdr-1 cl-blue brdr-cl-blue mt24" @click="showMore" v-if="maxSize > size">
      <span>{{ $t('Show more +') }}</span>
    </div>
  </div>
</template>

<script>
import { themeComponent } from 'core/lib/themes'
import builder from 'bodybuilder'
import ProductListing from 'theme/components/core/ProductListing.vue'
import AdaptiveWidthClient from 'theme/components/theme/AdaptiveWidthClient.vue'
import banners from 'theme/resource/promoted_products.json'

export default {
  name: 'BrowsingHistory',
  props: {
    category: {
      type: String,
      required: true
    }
  },
  components: {
    ProductListing
  },
  data () {
    return {
      products: [],
      stepSize: 8,
      size: 8,
      maxSize: null,
      banners: banners
    }
  },
  methods: {
    showMore () {
      this.size = this.size + this.stepSize
      this.loadProduct()
    },
    loadProduct () {
      let self = this
      let inspirationsQuery = builder().query('match', 'categories', self.category).build()

      self.$store.dispatch('product/list', {
        query: inspirationsQuery,
        size: this.size,
        sort: 'created_at:desc'
      }).then(function (res) {
        if (res) {
          self.maxSize = res.total
          self.products = res.items
        }
      })
    },
    setMobileSizes () {
      this.size = 2
      this.stepSize = 2
      this.loadProduct()
    },
    setDesktopSizes () {
      this.size = 8
      this.stepSize = 8
      this.loadProduct()
    }
  },
  beforeMount () {
    (this.isMobile && this.setMobileSizes()) || (this.isDesktop && this.setDesktopSizes())
  },
  watch: {
    'isMobile': function () {
      if (this.isMobile) {
        this.setMobileSizes()
      } else {
        this.setDesktopSizes()
      }
    }
  },
  mixins: [AdaptiveWidthClient, themeComponent('theme/ProductModel')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';

.browsing-history {
  .browsing-history-showmore {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  }
  @media (max-width: $screen__m - 1) {
    .browsing-history-title {
      font-size: 20px;
      line-height: 27px;
    }
  }
  @media (max-width: $screen__xs) {
    margin-bottom: 25px;
    .browsing-history-showmore {
      margin-top: 37px;
    }
  }
}
</style>
