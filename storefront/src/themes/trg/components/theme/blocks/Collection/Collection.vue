<template>
  <products-slider
    :products="products"
    :config="sliderConfig"
    :title="title"
  />
</template>
<script>
import builder from 'bodybuilder'
import ProductsSlider from 'theme/components/core/ProductsSlider.vue'

export default {
  name: 'Collection',
  props: {
    title: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      products: [],
      sliderConfig: {
        perPage: 4,
        perPageCustom: [[320, 1], [768, 2], [1024, 3], [1200, 4], [2560, 4]],
        paginationEnabled: false,
        navigationEnabled: true,
        loop: true,
        navigationNextLabel: '',
        navigationPrevLabel: ''
      }
    }
  },
  beforeMount () {
    let self = this
    let inspirationsQuery = builder().query('match', 'categories', self.category).build()
    self.$store.dispatch('product/list', {
      query: inspirationsQuery,
      size: 12,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        self.products = res.items
      }
    })
  },
  components: {
    ProductsSlider
  }
}
</script>
