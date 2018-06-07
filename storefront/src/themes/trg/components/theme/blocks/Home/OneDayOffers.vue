<template>
  <div class="one-day-offers container mb25">
    <div class="one-day-title mb10">
      <span class="one-day-title-primary fs30 lh42 weight-900 cl-dark-blue mr15">{{ $t('Only one day') }}</span>
      <span class="one-day-title-secondary fs15 lh30 brdr-2 brdr-bottom brdr-cl-gray2 cl-gray2">{{ $t('Show more +') }}</span>
    </div>
    <div class="one-day-products">
      <div class="row">
        <div class="one-day-product-wrap mb16 col-xs-12 col-sm-6 col-md col-lg-3" v-for="(product, index) in products" :key="index">
          <product-tile
            class="one-day-product"
            :product="product"
            :class="{'last-elem': index === products.length-1}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile.vue'
import builder from 'bodybuilder'

export default {
  name: 'OneDayOffers',
  props: {
    category: {
      type: String,
      required: true
    }
  },
  components: {
    ProductTile
  },
  data () {
    return {
      products: []
    }
  },
  beforeMount () {
    let self = this
    let inspirationsQuery = builder().query('match', 'categories', self.category).build()

    self.$store.dispatch('product/list', {
      query: inspirationsQuery,
      size: 8,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        self.products = res.items
      }
    })
  }
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';

.one-day-offers {
  @media (max-width: $screen__m - 1) {
    .one-day-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
    }
    .one-day-title-primary {
      font-size: 20px;
    }
    .one-day-title-secondary {
      font-size: 18px;
      text-decoration: underline;
      border-bottom: none;
      line-height: 40px;
    }
    .one-day-product-wrap {
      margin-bottom: 0;
    }
    .one-day-product {
      border-bottom: none;
      &.last-elem {
        border-bottom: 1px solid color(lightgray4);
      }
    }
  }
}
</style>
