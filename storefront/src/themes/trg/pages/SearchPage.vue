<template>
  <div>
    <div class="container">
      <product-listing :products="products" columns="3"/>
    </div>
  </div>
</template>

<script>
import ProductListing from 'theme/components/core/ProductListing'
import NoSSR from 'vue-no-ssr'
import bodybuilder from 'bodybuilder'

export default {
  data () {
    return {
      products: [],
      emptyResults: false,
      pagination: {
        pageSize: 50,
        offset: 0
      }
    }
  },
  components: {
    ProductListing,
    'no-ssr': NoSSR
  },
  created () {
    if (this.$route.params.searchText) {
      this.productsQuery(this.buildQuery(), this.pagination.offset, this.pagination.pageSize)
    }
  },
  watch: {
    '$route.params.searchText': function () {
      this.products = []
      this.productsQuery(this.buildQuery(), this.pagination.offset, this.pagination.pageSize)
    }
  },
  methods: {
    buildQuery () {
      let searchText = this.$route.params.searchText
      let query = bodybuilder()
        .orQuery('match', 'name', { query: searchText, boost: 3 })
        .orQuery('match', 'category.name', { query: searchText, boost: 1 })
        .orQuery('match', 'short_description', { query: searchText, boost: 2 })
        .orQuery('match', 'description', { query: searchText, boost: 1 })
        .filter('range', 'visibility', { 'gte': 3, 'lte': 4 })
        .filter('range', 'price', {'gt': 1})
        .andFilter('term', 'status', '1')
        .build()
      return query
    },
    productsQuery (query, start, size, updateState = false) {
      let self = this
      return this.$store.dispatch('product/list', {query, start, size, updateState}).then((resp) => {
        self.emptyResults = resp.items.length < 1
        self.products = resp.items
        return resp
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
