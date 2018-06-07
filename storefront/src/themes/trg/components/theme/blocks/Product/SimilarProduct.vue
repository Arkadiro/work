<template>
  <div class="similar-products container mb25">
    <div class="similar-products-title mb10">
      <span class="similar-products-title-primary fs30 lh42 weight-900 cl-dark-blue mr15">{{ $t('Similar product') }}</span>
    </div>
    <div>
      <product-listing :products="products" :banners="promotedProducts" :columns="4"/>
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile.vue'
import builder from 'bodybuilder'
import promotedProducts from 'theme/resource/promoted_products.json'
import ProductListing from 'theme/components/core/ProductListing.vue'

export default {
  name: 'SimilarProduct',
  props: {
    category: {
      type: String,
      required: true
    }
  },
  components: {
    ProductTile,
    ProductListing
  },
  data () {
    return {
      products: [],
      promotedProducts: promotedProducts,
      productsDummy: {
        electronics: [
          {
            img: '/assets/products/1.jpg',
            name: 'Samsung Galaxy S8+ 64GB'
          },
          {
            img: '/assets/products/2.jpg',
            name: 'Samsung Galaxy S8+ 64GB'
          },
          {
            img: '/assets/products/3.jpg',
            name: 'Samsung Galaxy S8+ 64GB'
          },
          {
            img: '/assets/products/4.jpg',
            name: 'Samsung Galaxy S8+ 64GB'
          }
        ]
      }
    }
  },
  beforeMount () {
    let self = this
    let inspirationsQuery = builder().query('match', 'category.name', 'Tees').build()

    self.$store.dispatch('product/list', {
      query: inspirationsQuery,
      size: 4,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        let i = 0
        res.items.forEach((item) => {
          if (self.productsDummy['electronics'].length > i) {
            item.thumbnail = self.productsDummy['electronics'][i]['img']
          } else {
            i = 0
            item.thumbnail = self.productsDummy['electronics'][i]['img']
          }
          i++
        })

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

.similar-products {
  * {
    box-sizing: border-box;
  }
  @media (max-width: $screen__m - 1) {
    padding-left: 14px;
    padding-right: 14px;
    .similar-products-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
    }
    .similar-products-title-primary {
      font-size: 20px;
    }
    // .similar-products-title-secondary {
    //   font-size: 18px;
    //   text-decoration: underline;
    //   border-bottom: none;
    //   line-height: 40px;
    // }
    // .similar-products-wrap {
    //   margin-bottom: 0;
    // }
    // .similar-product {
    //   border-bottom: none;
    //   &.last-elem {
    //     border-bottom: 1px solid color(lightgray4);
    //   }
    // }
    // .product-price-main {
    //   font-size: 24px;
    //   line-height: 33px;
    //   color: color(dark-blue);
    // }
  }
}
</style>
