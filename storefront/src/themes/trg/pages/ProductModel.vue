<template>
  <div id="product-model" class="pb40">
    <div class="container">
      <div class="py27">
        <breadcrumbs :routes="breadcrumbs.routes" :active-route="productName"/>
      </div>
      <div class="row">
        <div class="col-md-3 col-xs-12 no-mobile">
          <sidebar/>
        </div>
        <div class="col-md-9 col-xs-12">
          <div class="product-top-section">
            <div class="container p0">
              <div class="col-xs-12 cl-black weight-700 fs24 mb18 p0">
                {{ productName | htmlDecode }}
              </div>
              <div class="flex wrap">
                <section class="pb35 m0 data-wrapper col-xs-12 col-md-8 p0">
                  <div>
                    <div class="model-image mb20 border-box">
                      <transition name="fade" appear>
                        <img class="product-image inline-flex mw-100" v-lazy="image" ref="image">
                      </transition>
                    </div>
                    <div class="model-text flex wrap w-100">
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0">Код</p>
                        <p class="cl-black fs14 lh20 weight-700 my0">{{ product.identifier }}</p>
                      </div>
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0">Наименование</p>
                        <p class="cl-black fs14 lh20 weight-700 my0 ">{{ productName | htmlDecode }}</p>
                      </div>
                    </div>
                    <div class="model-text flex wrap w-100">
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0 ">Упаковка</p>
                        <p class="cl-black fs14 lh20 weight-700 my0">{{ productPackaging }}</p>
                      </div>
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0">Тип</p>
                        <p class="cl-black fs14 lh20 weight-700 my0">{{ productType }}</p>
                      </div>
                    </div>
                    <div class="model-text flex wrap w-100">
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0 ">Сертификат от:</p>
                        <p class="cl-black fs14 lh20 weight-700 my0 ">{{ productCertificateKeeper }}</p>
                      </div>
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0">Сертификат №</p>
                        <p class="cl-black fs14 lh20 weight-700 my0 ">{{ productCertificateNumber }}</p>
                      </div>
                    </div>
                    <div class="model-text flex wrap w-100">
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0 mr30">ОКПД</p>
                        <p class="cl-black fs14 lh20 weight-700 my0">{{ productOkpd }}</p>
                      </div>
                      <div class="model-characteristic p0 mb17 border-box pr20 w-100">
                        <p class="opacity5 cl-black fs14 lh20 weight-400 my0">Тип</p>
                        <p class="cl-black fs14 lh20 weight-700 my0">{{ productType }}</p>
                      </div>
                    </div>
                    <div @click="isVisibleMore=!isVisibleMore">
                      <button class="btn-more mx0 pl0 bg-cl-transparent cl-green brdr-none fs14 lh18 row middle-xs"><span :class="[ isVisibleMore ? 'hidden' : 'block' ]">Подробная информация</span><span :class="[ isVisibleMore ? 'block' : 'hidden' ]">Скрыть</span><div class="fs20 lanit-icons" :class="[ isVisibleMore ? 'arrow-up-ico' : 'arrow-down-ico' ]" /></button>
                    </div>
                  </div>
                  <div class="container pt10 pb20 px8 cl-accent details" :class="[ isVisibleMore ? 'block' : 'hidden' ]">
                    <div class="cl-black fs14 lh20 weight-700">Описание</div>
                    <div class="opacity5 cl-black fs14 lh20 weight-400" ref="details">
                      <div class="">
                        <div
                          class="lh24"
                        >
                          <span class="ellipsis_in" v-html="productDescription" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section class="col-md-4 col-xs-12">
                  <add-panel :product="product" :is-ticker="true"/>
                </section>
              </div>
            </div>
          </div>
          <div class="ticker-products" v-if="associationProducts && associationProducts.length > 0">
            <h2 class="cl-black mb20">{{ $t('Best offers') }}</h2>
            <div class="mb10 flex wrap middle-xs">
              <sorting :sort-params="sortParams" @newSort="sortListingBy($event[0], $event[1])" :current-sort="sortSet" class="mr30 mb14" />
              <price-selector class="mr30"/>
              <data-selector />
            </div>
            <product-listing :products="associationProducts" :columns="3" class="relative"/>
            <pagination class="pt20 pb30"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { themePage, themeComponent } from 'core/lib/themes'

import RelatedProducts from '../components/core/blocks/Product/Related.vue'
import AddToCart from '../components/core/AddToCart.vue'
import GenericSelector from 'core/components/GenericSelector.vue'
import ColorSelector from '../components/core/ColorSelector.vue'
import SizeSelector from '../components/core/SizeSelector.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import ProductAttribute from '../components/core/ProductAttribute.vue'
import ProductTile from '../components/core/ProductTile.vue'
import ProductLinks from '../components/core/ProductLinks.vue'
import focusClean from 'theme/components/theme/directives/focusClean'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import AddPanel from 'theme/components/theme/blocks/Product/AddPanel'
import ProductListing from '../components/core/ProductListing.vue'
import Sorting from 'theme/components/theme/blocks/Catalog/Sorting.vue'
// import Pagination from 'theme/components/theme/blocks/Catalog/Pagination.vue'
import PriceSelector from '../components/core/PriceSelector.vue'
import DataSelector from '../components/theme/blocks/Catalog/DataSelector.vue'
import builder from 'bodybuilder'

export default {
  asyncData ({ store, route }) {
    // this is for SSR purposes to prefetch data
  },
  data () {
    return {
      associationProducts: [],
      mobileCategories: false,
      sortParams: {
        sortName: 'По умолчанию',
        sortVisible: false,
        mobileFilters: false,
        isVisible: true
      },
      sortSet: '',
      pagination: {
        enabled: true,
        perPage: 6,
        current: 0
      },
      isVisibleMore: false
    }
  },
  directives: { focusClean },
  methods: {
    sortListingBy (sortSet, event) {
      let self = this
      self.sortSet = sortSet
      self.sortParams.sortVisible = false
      self.sortParams.sortName = event.target.innerText
    },
    showDetails (event) {
      const details = this.$refs.details
      details.style.maxHeight = `${details.children[0].offsetHeight}px`
      event.target.classList.add('hidden')
    },
    openCategories () {
      this.mobileCategories = true
    },
    closeCategories () {
      this.mobileCategories = false
    }
  },
  computed: {
    countProducts () {
      if (this.product.configurable_children) {
        return this.product.configurable_children.length >= 9980 ? 9980 : this.product.configurable_children.length
      } else {
        return 0
      }
    }
  },
  beforeMount () {
    let self = this
    let associationProductsSku = self.product.associations ? (self.product.associations.TRADENAME ? self.product.associations.TRADENAME : []) : []
    if (associationProductsSku && associationProductsSku.length > 0) {
      let byTickerQuery = builder().query('terms', 'identifier', associationProductsSku).andFilter('term', 'enabled', true).build()
      self.$store.dispatch('product/list', {
        query: byTickerQuery
      }).then((resp) => {
        if (resp.items) {
          self.associationProducts = resp.items
        }
      })
    }
  },
  components: {
    AddToCart,
    GenericSelector,
    ColorSelector,
    SizeSelector,
    Breadcrumbs,
    ProductAttribute,
    ProductTile,
    RelatedProducts,
    ProductLinks,
    Sidebar,
    AddPanel,
    ProductListing,
    Sorting,
    // Pagination,
    PriceSelector,
    DataSelector
  },
  mixins: [themePage('Product'), themeComponent('theme/ProductModel')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';

@media (min-width: $screen__s) {
  .model-image {
    float: left;
    width: 32%;
    padding-right: 30px;
  }
  .model-text {
    width: 65%;
  }
  .model-characteristic {
    width: 50%;
    word-wrap: break-word;
  }
}

@media (max-width: $screen__s) {
  .model-characteristic {
    display: flex;
    justify-content: space-between;
  }
}
</style>
