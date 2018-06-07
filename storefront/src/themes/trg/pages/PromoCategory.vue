<template>
  <div id="promo-category" class="promo-category relative">
    <header class="bg-cl-white pt15 pl20">
      <div class="container">
        <div class="row flex flex-column">
          <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />
          <h1 class="category-title mb10 weight-900 fs40 cl-dark-blue"> {{ category.name }} </h1>
        </div>
      </div>
    </header>
    <div class="container px0 pb60">
      <div class="row m0 center-md relative">
        <div class="col-xs-12">
          <div class="btn-category no-desktop brdr-1 brdr-cl-blue cl-blue p13 align-center brdr-round4" @click="openCategory">
            {{ $t('Categories') }}
          </div>
        </div>
        <button
          class="col-xs-5 mt25 p15 mobile-filters-butto  brdr-1 brdr-cl-blue cl-blue p13 align-center w-100 brdr-round4 bg-cl-transparent hidden"
          @click="openFilters"
        >
          {{ $t('Filters') }}
        </button>
        <div class="col-md-3 start-xs promo-category-filters pt66 cl-dark-blue" :class="[ isShowList ? 'list-show' : 'list-hide' ]">
          <i slot="close"
             class="btn-close material-icons p5 cl-bg-dark-blue absolute"
             :class="[ isShowList ? 'list-show' : 'list-hide' ]"
             @click="closeCategory"
          >
            close
          </i>
          <div class="subcategory-title weight-900 fs24 lh33 pb36"
               v-for="(subcategory, index) in category.children_data"
               :key="index"
               @click="loadProduct(subcategory)">
            {{ subcategory.name }}
            <div class="">
              <div class="weight-400 fs14"
                   v-for="(item, index) in subcategory.children_data"
                   :key="index"
                   @click="loadProduct(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 start-xs mobile-filters" v-if="mobileFilters">
          <div class="close-container absolute w-100">
            <i class="material-icons p15 close cl-accent" @click="closeFilters">close</i>
          </div>
          <sidebar class="mobile-filters-body" :filters="filters.available"/>
        </div>
        <p class="col-xs-12 hidden m0 px20 cl-secondary">{{ productsCounter }} items</p>
        <div class="col-md-9 pt20 px10 border-box products-list">
          <div class="container sort-by flex end-xs mb20 cl-dark-blue fs16 lh25">
            <span class="sort-title weight-700 mr15">Sort-by:</span>
            <span class="select-wrapper relative flex" @click="openSort">
              <span class="selected-name fs16 lh25 cursor-pointer weight-400 hidden brdr-bottom brdr-cl-lightgray4">{{ sortName }}</span>
              <i class="arrow-down cl-dark-blue relative">
                <svg class="icon icon-keyboard_arrow_down" width="21px" height="21px">
                  <use xlink:href="#icon-keyboard_arrow_down">
                    <symbol id="icon-keyboard_arrow_down" viewBox="0 0 32 32">
                      <title>keyboard_arrow_down</title>
                      <path d="M9.875 11.104l6.125 6.125 6.125-6.125 1.875 1.875-8 8-8-8z"/>
                    </symbol>
                  </use>
                </svg>
              </i>
              <div class="dropdown-select bg-cl-white" :class="[ sortVisible ? 'show' : 'hide' ]">
                <span class="dropdown-item mr15 pointer" @click.stop="selectFilterName('Relevance')" :class="[ activeRelevance ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Relevance</span>
                <span class="dropdown-item mr15 pointer" @click.stop="selectFilterName('Price Low-Hight')" :class="[ activePriceLow ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Price Low-Hight</span>
                <span class="dropdown-item mr15 pointer" @click.stop="selectFilterName('Price High-Low')" :class="[ activePriceHight ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Price High-Low</span>
                <span class="dropdown-item pointer" @click.stop="selectFilterName('Discount')" :class="[ activeDiscount ? 'cl-blue brdr-bottom brdr-cl-blue' : '']">Discount</span>
              </div>
            </span>
          </div>
          <div v-if="isCategoryEmpty" class="hidden-xs">
            {{ $t('No products found!') }}
          </div>
          <product-listing columns="3" :products="products" />
        </div>
        <div class="show-more container flex end-xs mw-100">
          <div class="btn-container col-xs-12 col-sm-9 center-xs middle-xs flex">
            <div class="btn-show align-center brdr-round4 py13 brdr-1  brdr-cl-blue mt24 width-398 mw-100 pointer" @click="showMore">
              <span class="cl-blue weight-900">
                Show more +
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'core/lib/themes'
import builder from 'bodybuilder'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar
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
      sortVisible: false
    }
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    },
    openCategory () {
      this.isShowList = false
      document.documentElement.classList.add('no-scroll')
    },
    closeCategory () {
      this.isShowList = true
      document.documentElement.classList.remove('no-scroll')
    },
    openSort () {
      this.sortVisible = true
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
      let inspirationsQuery = builder().query('match', 'category.name', category.name).build()
      self.$store.dispatch('product/list', {
        query: inspirationsQuery,
        sort: 'created_at:desc'
      }).then(function (res) {
        if (res) {
          self.product = res.items
        }
      })
    }
  },
  mixins: [corePage('Category')]
}
</script>

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

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
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

    .mobile-filters {
      display: block;
    }

    .mobile-filters-button {
      display: block;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: center;;
    }

    .mobile-filters {
      position: absolute;
      background-color: #F2F2F2;
      z-index: 5;
      padding: 0 40px;
      left: 0;
      width: 100vw;
      height: 100vh;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
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
$color-lightgray: color(lightgray4);
.promo-category {
  .btn-close,
  .arrow-down {
    display: none;
  }
  .dropdown-item:hover {
    color: $color-blue;
  }
}
@media (max-width: $screen__l - 1) {
  .promo-category {
    .show {
      display: block;
    }
    .hide {
      display: none;
    }
  }
}
@media (max-width: $screen__m - 1) {
  .promo-category {
    .subcategory-title {
      font-size: 20px;
      padding-bottom: 30px;
    }
    .category-title {
      font-size: 20px;
      line-height: 27px;
      margin-bottom: 20px;
    }
    .promo-category-filters {
      position: absolute;
      background-color: $color-white;
      z-index: 4;
      padding-top: 0;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      left: 0;
      width: 100vw;
      height: calc(100vh - 115px);
      top: -45px;
      box-sizing: border-box;
      overflow-y: scroll;
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
      z-index: 5;
      right: 15px;
    }
  }
}
@media (max-width: $screen__s - 1) {
  .promo-category {
    .sort-by {
      justify-content: flex-start;
      max-width: 250px;
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
      right: 19px;
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
      min-width: 171px;
    }
  }
}
</style>
