<template>
  <div id="category" class="category relative">
    <header class="bg-cl-white pt15">
      <div class="container">
        <breadcrumbs :routes="breadcrumbs.routes" :active-route="activeRoute" />
        <h1 class="category-title mb10 weight-900 fs40 cl-dark-blue"> {{ category.name }} </h1>
      </div>

    </header>
    <div class="container pb60">
      <div class="row m0 center-md">

        <div class="col-md-9 col-xs-12 pt20 border-box products-list flex wrap px0">
          <div class="flex wrap w-100">
            <div class="btn-filters-container mb20">
              <div class="">
                <button
                  class="mt10 p15 mobile-filters-button bg-cl-transparent brdr-1 brdr-cl-blue brdr-round4 cl-blue weight-900 w-100"
                  @click="openFilters"
                >
                  {{ $t('Filters') }}
                </button>
              </div>
            </div>
            <div class="sort-by flex wrap start-xs middle-xs mb10 cl-dark-blue fs16 lh25">
              <div class="sort-by-container flex mr26">
                <span class="sort-title weight-700 mr15">Sort-by:</span>
                <span class="select-wrapper relative flex" @click="openSort" v-on-click-outside="closeSort">
                  <span class="selected-name fs16 lh25 cursor-pointer weight-400 hidden brdr-bottom brdr-cl-blue cl-blue">{{ sortName }}</span>
                  <i class="arrow-down trg-icons keyboard_arrow_down-ico relative fs20"/>
                  <div class="dropdown-select bg-cl-white" :class="[ sortVisible ? 'show' : 'hide' ]">
                    <span class="dropdown-item mr15 pointer" @click.stop="selectFilterName('Relevance')" :class="[ activeRelevance ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Relevance</span>
                    <span class="dropdown-item mr15 pointer" @click.stop="selectFilterName('Price Low-Hight')" :class="[ activePriceLow ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Price Low-Hight</span>
                    <span class="dropdown-item mr15 pointer" @click.stop="selectFilterName('Price High-Low')" :class="[ activePriceHight ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Price High-Low</span>
                    <span class="dropdown-item pointer" @click.stop="selectFilterName('Discount')" :class="[ activeDiscount ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Discount</span>
                  </div>
                </span>
              </div>
            </div>
            <div class="checkbox-container flex middle-xs mb10">
              <checkbox @changed-flag="flag = $event" :is-checked="true" labeltext="Available in my region in the catalog"/>
            </div>
          </div>
          <div v-if="isCategoryEmpty" class="hidden-xs">
            {{ $t('No products found!') }}
          </div>
          <div class="row">
            <product-listing columns="3" :products="products" :banners="banners" :iscategory="true"/>
          </div>
        </div>
        <div class="col-md-3 start-xs category-filters mt54 pr0 pl16">
          <sidebar :filters="filters.available"/>
        </div>
        <div class="col-md-3 col-sm-12 start-xs mobile-filters" v-if="mobileFilters">
          <div class="close-container absolute w-100 align-right">
            <i class="material-icons p15 close cl-dark-blue mr10" @click="closeFilters">close</i>
          </div>
          <sidebar class="mobile-filters-body" :filters="filters.available"/>
        </div>
        <div class="show-more container flex start-xs mw-100">
          <div class="btn-container col-xs-12 col-sm-9 center-xs middle-xs flex">
            <div class="btn-show align-center brdr-round4 py13 brdr-1  brdr-cl-blue mt24 width-398 mw-100 pointer mr38" @click="showMore">
              <span class="cl-blue weight-900">
                {{ $t('Show more +') }}
              </span>
            </div>
            <span class="show-total mt24 cl-dark-blue weight-900 fs16">{{ $t('Showing:') }} 1-{{ productsCounter }} {{ $t('of') }} {{ productsTotal }}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import builder from 'bodybuilder'

import config from 'config'
import { corePage } from 'core/lib/themes'
import { mixin as onClickOutside } from 'vue-on-click-outside'
import { breadCrumbRoutes } from 'core/helpers'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import { optionLabel } from 'core/store/modules/attribute/helpers'
import EventBus from 'core/plugins/event-bus'
import Composite from 'core/mixins/composite'
import _ from 'lodash'
import i18n from 'core/lib/i18n'
import Checkbox from '../components/theme/Checkbox'
import banners from 'theme/resource/promoted_products.json'

function filterChanged (filterOption) { // slection of product variant on product page
  if (this.filters.chosen[filterOption.attribute_code] && ((_.toString(filterOption.id) === _.toString(this.filters.chosen[filterOption.attribute_code].id)) || filterOption.id === this.filters.chosen[filterOption.attribute_code].id)) { // for price filter it's a string
    delete this.filters.chosen[filterOption.attribute_code]
  } else {
    this.filters.chosen[filterOption.attribute_code] = filterOption
  }

  let filterQr = baseFilterQuery(config.products.defaultFilters, this.$store.state.category.current)

  let attrFilterBuilder = (filterQr, attrPostfix = '') => {
    for (let code of Object.keys(this.filters.chosen)) {
      const filter = this.filters.chosen[code]

      if (filter.attribute_code !== 'price') {
        filterQr = filterQr.andFilter('match', filter.attribute_code + attrPostfix, filter.id)
      } else { // multi should be possible filter here?
        const rangeqr = {}
        if (filter.from) {
          rangeqr['gte'] = filter.from
        }
        if (filter.to) {
          rangeqr['lte'] = filter.to
        }
        filterQr = filterQr.andFilter('range', filter.attribute_code, rangeqr)
      }
    }
    return filterQr
  }
  filterQr = filterQr.orFilter('bool', (b) => attrFilterBuilder(b).filter('match', 'type_id', 'simple'))
    .orFilter('bool', (b) => attrFilterBuilder(b, '_options').filter('match', 'type_id', 'configurable'))

  const fsC = Object.assign({}, this.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
  filterData({ populateAggregations: false, searchProductQuery: filterQr, store: this.$store, route: this.$route, current: this.pagination.current, perPage: this.pagination.perPage, filters: config.products.defaultFilters, sort: this.sortSet }).then((res) => {
    EventBus.$emit('product-after-configured', { configuration: fsC })
  })
}

function baseFilterQuery (filters, parentCategory, store) { // TODO add aggregation of color_options and size_options fields
  let searchProductQuery = builder().andFilter('term', 'enabled', 'true')

  // add filters to query
  for (let attrToFilter of filters) {
    if (attrToFilter !== 'price') {
      searchProductQuery = searchProductQuery.aggregation('terms', attrToFilter)
      searchProductQuery = searchProductQuery.aggregation('terms', attrToFilter + '_options')
    } else {
      searchProductQuery = searchProductQuery.aggregation('terms', attrToFilter)
      searchProductQuery.aggregation('range', 'price', {
        ranges: [
          { from: 0, to: 999999 }
        ]
      })
    }
  }

  let categories = []
  categories.push(parentCategory.code)
  if (this) {
    store = this.$store
  }
  if (parentCategory.all_childrens) {
    categories = categories.concat(parentCategory.all_childrens)
  }

  if (parentCategory) {
    searchProductQuery = searchProductQuery.filter('terms', 'categories', categories)
  }
  return searchProductQuery
}

function filterData ({ populateAggregations = false, filters = [], searchProductQuery, store, route, current = 0, perPage = 50, sort = '' }) {
  // let isTicker = false
  // if (route.name === 'category' || route.name === 'category-page') {
  //   isTicker = true
  // }
  // searchProductQuery = searchProductQuery.filter('term', 'values.is_ticker-boolean.<all_channels>.<all_locales>', isTicker)
  searchProductQuery = searchProductQuery.filter('exists', 'field', 'values.name-text.<all_channels>.<all_locales>')

  return store.dispatch('product/list', {
    query: searchProductQuery.build(),
    start: current,
    size: perPage
  }).then(function (res) {
    let subloaders = []
    if (!res || (res.noresults)) {
      EventBus.$emit('notification', {
        type: 'warning',
        message: i18n.t('No products synchronized for this category. Please come back while online!'),
        action1: { label: 'OK', action: 'close' }
      })
      store.dispatch('product/reset')
      store.state.product.list = { items: [] } // no products to show TODO: refactor to store.state.category.reset() and store.state.product.reset()
      // store.state.category.filters = { color: [], size: [], price: [] }
    } else {
      if (populateAggregations === true) { // populate filter aggregates
        for (let attrToFilter of filters) { // fill out the filter options
          store.state.category.filters.available[attrToFilter] = []

          let uniqueFilterValues = new Set()
          if (attrToFilter !== 'price') {
            if (res.aggregations['agg_terms_' + attrToFilter]) {
              let buckets = res.aggregations['agg_terms_' + attrToFilter].buckets
              if (res.aggregations['agg_terms_' + attrToFilter + '_options']) {
                buckets = buckets.concat(res.aggregations['agg_terms_' + attrToFilter + '_options'].buckets)
              }

              for (let option of buckets) {
                uniqueFilterValues.add(_.toString(option.key))
              }
            }

            for (let key of uniqueFilterValues.values()) {
              const label = optionLabel(store.state.attribute, { attributeKey: attrToFilter, optionId: key })
              if (_.trim(label) !== '') { // is there any situation when label could be empty and we should still support it?
                store.state.category.filters.available[attrToFilter].push({
                  id: key,
                  label: label
                })
              }
            }
          } else { // special case is range filter for prices
            if (res.aggregations['agg_range_' + attrToFilter]) {
              let index = 0
              let count = res.aggregations['agg_range_' + attrToFilter].buckets.length
              for (let option of res.aggregations['agg_range_' + attrToFilter].buckets) {
                store.state.category.filters.available[attrToFilter].push({
                  id: option.key,
                  from: option.from,
                  to: option.to,
                  label: (index === 0 || (index === count - 1)) ? (option.to ? '< $' + option.to : '> $' + option.from) : '$' + option.from + (option.to ? ' - ' + option.to : '')// TODO: add better way for formatting, extract currency sign
                })
                index++
              }
            }
          }
        }
      }
    }
    return subloaders
  }).catch((err) => {
    console.info(err)
    EventBus.$emit('notification', {
      type: 'warning',
      message: i18n.t('No products synchronized for this category. Please come back while online!'),
      action1: { label: 'OK', action: 'close' }
    })
  })
}
export default {
  name: 'Category',
  metaInfo () {
    return {
      title: this.$route.meta.title || this.category.labels.ru_RU,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  mixins: [Composite, corePage('Category'), onClickOutside],
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar,
    Checkbox
  },
  data () {
    return {
      mobileFilters: false,
      activeRelevance: true,
      activePriceLow: false,
      activePriceHight: false,
      activeDiscount: false,
      isShowList: true,
      sortName: 'Sort by',
      sortVisible: false,
      flag: false,
      banners: banners
    }
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
      document.documentElement.classList.add('no-scroll')
    },
    closeFilters () {
      this.mobileFilters = false
      document.documentElement.classList.remove('no-scroll')
    },
    openSort () {
      this.sortVisible = true
    },
    closeSort () {
      this.sortVisible = false
    },
    selectFilterName (select) {
      this.sortName = select
      this.sortVisible = false
      if (select === 'Relevance') {
        this.activeRelevance = true
        this.activePriceLow = false
        this.activePriceHight = false
        this.activeDiscount = false
      } else if (select === 'Price Low-Hight') {
        this.activeRelevance = false
        this.activePriceLow = true
        this.activePriceHight = false
        this.activeDiscount = false
      } else if (select === 'Price High-Low') {
        this.activeRelevance = false
        this.activePriceLow = false
        this.activePriceHight = true
        this.activeDiscount = false
      } else {
        this.activeRelevance = false
        this.activePriceLow = false
        this.activePriceHight = false
        this.activeDiscount = true
      }
    },
    loadProduct (category) {
      let self = this
      let inspirationsQuery = builder().query('match', 'categories', category.code).build()
      self.$store.dispatch('product/list', {
        query: inspirationsQuery,
        sort: 'created_at:desc'
      }).then(function (res) {
        if (res) {
          self.product = res.items
        }
      })
    },
    showMore () {
      let self = this
      let store = self.$store
      let route = self.$route
      const step = 18
      self.pagination.perPage += step
      let searchProductQuery = baseFilterQuery(config.products.defaultFilters, store.state.category.current)
      return filterData({ searchProductQuery: searchProductQuery, populateAggregations: true, store: store, route: route, current: self.pagination.current, perPage: self.pagination.perPage, filters: config.products.defaultFilters })
    },
    fetchData ({ store, route }) {
      let self = this
      self.pagination.perPage = 18
      let searchProductQuery = baseFilterQuery(config.products.defaultFilters, store.state.category.current, store)

      if (self.category) { // fill breadcrumb data - TODO: extract it to a helper to be used on product page
        this.$bus.$emit('current-category-changed', store.state.category.current_path)
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: config.products.defaultFilters// TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        })
      }
      return filterData({ searchProductQuery: searchProductQuery, populateAggregations: false, store: store, route: route, current: self.pagination.current, perPage: self.pagination.perPage, filters: config.products.defaultFilters, sort: self.sortSet })
    },
    validateRoute ({store, route}) {
      let self = this
      if (store == null) {
        store = self.$store
      }
      if (route == null) {
        route = self.$route
      }
      let slug = route.params.slug
      this.filters.chosen = {} // reset selected filters
      this.$bus.$emit('filter-reset')

      store.dispatch('category/single', { key: 'slug', value: slug }).then((category) => {
        let urlPrefix = '/s/'
        if (route.name === 'category' || route.name === 'category-page') {
          urlPrefix = '/c/'
        }
        store.state.category.breadcrumbs.routes = breadCrumbRoutes(store.state.category.current_path, urlPrefix)

        if (!self.category) {
          self.$router.push('/')
        } else {
          self.fetchData({store: store, route: route})
          EventBus.$emitFilter('category-after-load', { store: store, route: route })
        }
      })
    },
    openCategories () {
      this.mobileCategories = true
    },
    closeCategories () {
      this.mobileCategories = false
    },
    clearSort () {
      this.sortSet = ''
    }
  },
  watch: {
    '$route': function () {
      this.validateRoute({store: this.$store, route: this.$router.currentRoute})
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      const defaultFilters = config.products.defaultFilters
      store.dispatch('category/list', {}).then((categories) => {
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: defaultFilters// TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        }).then((attrs) => {
          store.dispatch('category/single', { key: 'code', value: route.params.slug }).then((parentCategory) => {
            filterData({ searchProductQuery: baseFilterQuery(defaultFilters, parentCategory, store), populateAggregations: true, store: store, route: route, current: 0, perPage: 18, filters: defaultFilters }).then((subloaders) => {
              Promise.all(subloaders).then((results) => {
                let urlPrefix = '/s/'
                if (route.name === 'category' || route.name === 'category-page') {
                  urlPrefix = '/c/'
                }
                store.state.category.breadcrumbs.routes = breadCrumbRoutes(store.state.category.current_path, urlPrefix)
                EventBus.$emitFilter('category-after-load', { store: store, route: route }).then((results) => {
                  return resolve()
                }).catch((err) => {
                  console.error(err)
                  return resolve()
                })
              })
            })
          }).catch(err => {
            console.error(err)
            return reject(Error(err))
          })
        })
      })
    })
  },
  beforeMount () {
    this.$bus.$on('filter-changed-category', filterChanged.bind(this))
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-category')
  },
  computed: {
    products () {
      return this.$store.state.product.list.items
    },
    productsCounter () {
      return this.$store.state.product.list.items.length
    },
    isCategoryEmpty () {
      return (!(this.$store.state.product.list.items) || this.$store.state.product.list.items.length === 0)
    },
    category () {
      return this.$store.state.category.current
    },
    categoryName () {
      console.log(this.$store.state.category)
      return this.$store.state.category.current ? this.$store.state.category.current.labels.ru_RU : ''
    },
    categoryId () {
      return this.$store.state.category.current ? this.$store.state.category.current.id : ''
    },
    filters () {
      return this.$store.state.category.filters
    },
    breadcrumbs () {
      return this.$store.state.category.breadcrumbs
    },
    countProducts () {
      if (this.$store.state.product.list.total) {
        return this.$store.state.product.list.total > 299000 ? 299000 : this.$store.state.product.list.total
      } else {
        return 0
      }
    },
    activeRoute () {
      return this.category.labels.ru_RU
    },
    productsTotal () {
      return this.$store.state.product.list.total
    }
  }
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/variables/responsive';
@import '~theme/css/helpers/functions/color';
$color-yellow: color(yellow);
$color-black: color(dark-blue);
@media (max-width: $screen__xs - 1) {
  .category {
    .btn-container {
      justify-content: center;
    }
    .btn-show {
      max-width: 80%;
    }
  }
}
</style>
<style lang="scss" scoped>
  .category-filters {
    width: 242px;
  }

  .mobile-filters {
    display: none;
    overflow: auto;
  }

  .mobile-filters-button {
    display: none;
  }

  @media (max-width: 770px) {
    .category-title {
      margin: 0;
      font-size: 36px;
    }

    .products-list {
      width: 100%;
      max-width: none;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: center;;
    }
  }

  .close-container {
    left: 0;
  }

  .close {
    margin-left: auto;
  }
</style>
<style lang="scss">
  @import '~theme/css/variables/responsive';
  @import '~theme/css/animations/transitions';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-white: color(white);
  $color-blue: color(blue);
  $color-dark-blue: color(dark-blue);
  $color-lightgray: color(lightgray4);
  $color-silver2: color(silver2);

  .category {
    .btn-close,
    .arrow-down {
      display: none;
    }
    .dropdown-item:hover {
      color: $color-blue;
    }
  }
  @media (max-width: $screen__xl - 1) {
    .category {
      .category-filters {
        margin-top: 87px;
      }
      .checkbox-container {
        margin-bottom: 14px;
      }
    }
  }
  @media (max-width: $screen__l - 1) {
    .category {
      .products-list {
        padding-top: 0;
      }
      .sort-by-container {
        margin-right: 0;
      }
      .mobile-filters-button {
        display: block;
        margin-top: 5px;
      }
      .breadcrumbs,
      .category-filters {
        display: none;
      }
      .category-title {
        font-size: 20px;
        line-height: 24px;
      }
      .sort-by {
        justify-content: flex-start;
        margin-left: 0;
      }
      .dropdown-select {
        display: flex;
        flex-direction: column;
        text-align: left;
      }
      .arrow-down,
      .selected-name {
        display: flex;
      }
      .arrow-down {
        top: 2px;
        right: 15px;
      }
      .select-wrapper {
        position: relative;
      }
      .dropdown-select {
        position: absolute;
        top: 0;
        z-index: 3;
        border: 1px solid $color-lightgray;
        min-width: 171px;
      }
      .show {
        display: flex;
      }
      .hide {
        display: none;
      }
      .sort-title {
        display: none;
      }
      .selected-name {
        color: $color-dark-blue;
        border-color: $color-silver2;
        min-width: 171px;
      }
      .mobile-filters {
        display: block;
      }
      .mobile-filters {
        position: absolute;
        background-color: $color-white;
        z-index: 4;
        padding: 0;
        left: 0;
        width: 100vw;
        height: calc(100vh - 115px);
        top: 18px;
        box-sizing: border-box;
      }
      .close-container {
        z-index: 2;
      }
      .mobile-filters-body {
        padding-top: 50px;
      }
      .sidebar {
        border: none;
        padding-top: 0;
      }
      .checkbox-container {
        width: 100%;
      }
      .btn-filters-container,
      .sort-by {
        width: 50%;
      }
      .btn-filters-container {
        padding-right: 8px;
      }
      .sort-by-container {
        padding-left: 8px;
      }
      .show-total {
        display: none;
      }
      .show-more {
        justify-content: center;
      }
      .btn-show {
        margin-right: 0;
      }
    }
  }
  @media (max-width: $screen__m - 1) {
    .category {
      .category-title {
        font-size: 20px;
        line-height: 27px;
        margin-bottom: 20px;
      }
      .promo-category-filters {
        width: 100%;
        position: absolute;
        top: -50px;
        padding-top: 0;
        z-index: 10;
        background-color: $color-white;
      }
      .list-show {
        transform: translateX(-150%);
        transition: transform 300ms $motion-main;
      }
      .list-hide {
        transform: translateX(0%);
        transition: transform 300ms $motion-main;
      }
      .btn-close {
        display: block;
        z-index: 11;
        right: 15px;
      }

    }
  }
  @media (max-width: $screen__xs - 1) {
    .category {
      .dropdown-select {
        max-width: 127px;
        min-width: 118px;
      }
      .selected-name {
        min-width: 127px;
        word-break: break-word;
      }
    }
  }
</style>
