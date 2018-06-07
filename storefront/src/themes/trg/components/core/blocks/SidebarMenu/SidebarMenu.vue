<template>
  <div class="sidebar-menu flex middle-xs height-50 relative" :class="{'active': isOpen}">
    <div class="flex start-xs middle-xs">
      <div class="item sidebar-menu-main-wrap fs16 cl-dark-blue pr60 flex middle-xs" @mouseover="mouseoverMenu(); hamburger=true" @mouseleave="mouseleaveMenu(); hamburger=false">
        <div class="hamburger hamburger--slider js-hamburger fs12" :class="{'is-active': hamburger}">
          <div class="hamburger-box">
            <div class="hamburger-inner"/>
          </div>
        </div>
        <div class="sidebar-menu-main-item ml15 w-100 weight-900" :class="{'active': subcategoryIsOpen === 'main'}">
          <div class="item-wrap">
            <router-link :to="{ name: 'сategories'}" class="lh30">
              {{ $t('Departments') }}
            </router-link>
            <svg width="12px" height="7px" class="absolute arrow-icon pt10 pb17 hidden" viewBox="0 0 12 7" @click="subcategoryIsOpenClick('main')" :class="{'active': subcategoryIsOpen === 'main'}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="futer-mob" transform="translate(-356.000000, -79.000000)" fill="#2F353D">
                  <path d="M359.287116,87.7166329 C358.937558,87.3383798 358.937558,86.7251709 359.287116,86.3469178 L362.836475,82.5133938 L359.262617,78.6527594 C358.912461,78.2751518 358.912461,77.6612974 359.262617,77.2836898 C359.612772,76.9054367 360.179833,76.9054367 360.529989,77.2836898 L364.737831,81.8285362 C365.08739,82.2067893 365.08739,82.8199982 364.737831,83.1982513 L360.555085,87.7166329 C360.380007,87.9057595 360.150554,88 359.9211,88 C359.691647,88 359.462193,87.9057595 359.287116,87.7166329 Z" id="Page-1" transform="translate(362.000000, 82.500000) rotate(90.000000) translate(-362.000000, -82.500000)"/>
                </g>
              </g>
            </svg>
          </div>
          <div class="sidebar-menu-list absolute container hidden bg-cl-white p0" :class="{'active': subcategoryIsOpen === 'main'}">
            <div class="row">
              <div class="sidebar-menu-main-category relative mt15 col-xs-12 col-md-8">
                <ul class="sidebar-menu-main-categories-list m0 p0 pt9 pb9 fs16 cl-dark-blue" v-for="(categories, index) in menuMain" :key="index" :class="{'active': index === 0}">
                  <li class="sidebar-menu-main-categories-item flex middle-xs" :class="{'active': subsubcategoryIsOpen === index}">
                    <div class="sidebar-menu-main-categories-item-link flex middle-xs" v-if="isDesktop">
                      <div class="sidebar-menu-main-icon-wrap width-45 align-center">
                        <i class="trg-icons fs23 mr10 cl-blue" :class="categories.icon"/>
                      </div>
                      <router-link :to="{name: 'category', params: { slug: categories.code }}">{{ categories.name }}</router-link>
                    </div>
                    <div class="sidebar-menu-main-categories-item-link flex middle-xs" v-else @click="subsubcategoryIsOpenClick(index)">
                      <div class="sidebar-menu-main-icon-wrap width-45 align-center">
                        <i class="trg-icons fs23 mr10 cl-blue" :class="categories.icon"/>
                      </div>
                      <span>{{ categories.name }}</span>
                    </div>
                    <div class="sidebar-submenu-main-items-wrap bg-cl-white absolute hidden flex">
                      <div v-for="(category, index2) in getSubCategories(getCategoryByCode(categories.code), 2)" :key="index2" class="sidebar-submenu-main-col mr40" v-if="category.all_childrens.length">
                        <router-link class="sidebar-submenu-main-items-name mb15 mt5 inline-block" :to="{name: 'category', params: { slug: category.code }}">{{ getCategoryName(category) }}</router-link>
                        <ul class="sidebar-submenu-main-items m0 p0">
                          <li class="sidebar-submenu-main-item" v-for="(subcategory, index3) in getSubCategories(category)" :key="index3">
                            <router-link :to="{name: 'category', params: { slug: subcategory.code }}" class="fs14 lh28 weight-400 cl-dark-blue">{{ getCategoryName(subcategory) }}</router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
                <router-link class="link-all-category inline-block mt10 no-underline ml45 uppercase" :to="{ name: 'сategories'}">{{ $t('View all categories') }}</router-link>
              </div>
              <div class="sidebar-menu-main-banner col-md-4 mt35">
                <banner-tile :product="banners[0]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="categories && categories.length">
        <div class="item fs16 lh30 cl-dark-blue pr60" @mouseover="mouseoverMenu" @mouseleave="mouseleaveMenu" v-for="(mainCategory, index) in getSubCategoriesByCodes(menuPopularList, 1, 'level1')" :key="index" :class="{'active': subcategoryIsOpen === index}">
          <div class="item-wrap">
            <router-link :to="{name: 'category', params: { slug: mainCategory.code }}">
              {{ getCategoryName(mainCategory) }}
            </router-link>
            <svg width="12px" height="7px" class="absolute arrow-icon pt10 pb17 hidden" @click="subcategoryIsOpenClick(index)" :class="{'active': subcategoryIsOpen === index}" viewBox="0 0 12 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="futer-mob" transform="translate(-356.000000, -79.000000)" fill="#2F353D">
                  <path d="M359.287116,87.7166329 C358.937558,87.3383798 358.937558,86.7251709 359.287116,86.3469178 L362.836475,82.5133938 L359.262617,78.6527594 C358.912461,78.2751518 358.912461,77.6612974 359.262617,77.2836898 C359.612772,76.9054367 360.179833,76.9054367 360.529989,77.2836898 L364.737831,81.8285362 C365.08739,82.2067893 365.08739,82.8199982 364.737831,83.1982513 L360.555085,87.7166329 C360.380007,87.9057595 360.150554,88 359.9211,88 C359.691647,88 359.462193,87.9057595 359.287116,87.7166329 Z" id="Page-1" transform="translate(362.000000, 82.500000) rotate(90.000000) translate(-362.000000, -82.500000)"/>
                </g>
              </g>
            </svg>
          </div>
          <div class="sidebar-menu-list absolute container hidden bg-cl-white p0" :class="{'active': subcategoryIsOpen === index}">
            <div class="sidebar-menu-main-category">
              <div class="main-category-items fs15 weight-900 flex">
                <div class="main-category-item pb10 pt20" v-for="(category, index2) in getSubCategories(mainCategory, 2)" :key="index2" :class="{'active': index2 === 0}" v-if="category.all_childrens.length">
                  <div v-if="!isDesktop" @click.prevent="subsubcategoryIsOpenClick(index2)">
                    <router-link class="cl-dark-blue lh30 uppercase" :to="{name: 'category', params: { slug: category.code }}">{{ getCategoryName(category) }}</router-link>
                  </div>
                  <template v-else>
                    <router-link class="cl-dark-blue lh30 uppercase" :to="{name: 'category', params: { slug: category.code }}">{{ getCategoryName(category) }}</router-link>
                  </template>
                  <div class="sidebar-menu-subcategories-wrap absolute w-100 pt35 hidden bg-cl-white" :class="{'active': subsubcategoryIsOpen === index2}">
                    <div class="flex w-100">
                      <div class="sidebar-menu-subcategories-list">
                        <div class="sidebar-menu-subcategories" v-for="(subcategory, index3) in getSubCategories(category)" :key="index3">
                          <div class="sidebar-menu-subcategory-title uppercase fs16 weight-900 cl-dark-blue mb5 mt15">
                            <router-link :to="{name: 'category', params: { slug: subcategory.code }}" class="lh30 uppercase fs16">{{ getCategoryName(subcategory) }}</router-link>
                          </div>
                          <ul class="sidebar-menu-subcategory-childrens cl-dark-blue fs14 weight-400 p0 m0">
                            <template v-if="subcategory.all_childrens.length">
                              <li class="sidebar-menu-subcategory-children m0 p0 lh25" v-for="(subsubcategory, index4) in getSubCategories(subcategory)" :key="index4">
                                <router-link :to="{name: 'category', params: { slug: subsubcategory.code }}">{{ getCategoryName(subsubcategory) }}</router-link>
                              </li>
                            </template>
                          </ul>
                        </div>
                      </div>
                      <div class="sidebar-menu-promoted-block col-md p0">
                        <div class="row">
                          <div class="flex w-100">
                            <div class="end-xs flex col-md-6">
                              <div class="flex flex-column mr15">
                                <div class="brand-listing-title lh30 fs16 weight-900 cl-dark-blue mb12 start-xs uppercase">
                                  <span>Brand</span>
                                </div>
                                <brand-listing/>
                              </div>
                            </div>
                            <div class="col-md-6 flex bottom-xs mb12">
                              <banner-tile :product="banners[0]"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <top-panel class="mobile-top-panel"/>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import menuMain from 'theme/resource/menu_main.json'
import BrandListing from 'theme/components/theme/BrandListing'
import BannerTile from 'theme/components/theme/BannerTile'
import AdaptiveWidthClient from 'theme/components/theme/AdaptiveWidthClient'
import banners from 'theme/resource/promoted_products.json'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import TopPanel from 'theme/components/theme/blocks/Header/TopPanel'
import { categoryName } from 'core/helpers'

export default {
  mixins: [coreComponent('blocks/SidebarMenu/SidebarMenu'), AdaptiveWidthClient],
  data () {
    return {
      menuPopularList: [
        'clothing_shoes_accessories'
      ],
      menuMain: menuMain,
      menuMainList: [
        'adult'
      ],
      hamburger: false,
      mainMenuIsOpen: false,
      subcategoryIsOpen: null,
      subsubcategoryIsOpen: null,
      banners: banners
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    getCategoryName (category) {
      return categoryName(category)
    },
    getSubCategoriesByCodes (list, level = false) {
      let categoriesList = []
      if (list && list.length) {
        list.forEach((element) => {
          categoriesList.push(this.getCategoryByCode(element))
        })
      }
      if (level) {
        categoriesList = categoriesList.filter((e) => e.level === level)
      }
      return categoriesList
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
    },
    subcategoryIsOpenClick (val) {
      if (this.subcategoryIsOpen === null || this.subcategoryIsOpen !== val) {
        this.subcategoryIsOpen = val
        this.subsubcategoryIsOpen = null
      } else {
        this.subcategoryIsOpen = null
        this.subsubcategoryIsOpen = null
      }
    },
    subsubcategoryIsOpenClick (val) {
      if (this.subsubcategoryIsOpen === null || this.subsubcategoryIsOpen !== val) {
        this.subsubcategoryIsOpen = val
      } else {
        this.subsubcategoryIsOpen = null
      }
    },
    mouseoverMenu () {
      if (this.isDesktop) {
        this.$store.commit('ui/setOverlay', true)
      }
    },
    mouseleaveMenu () {
      if (this.isDesktop) {
        this.$store.commit('ui/setOverlay', false)
      }
    }
  },
  watch: {
    'isOpen': function () {
      if (this.isOpen) {
        document.documentElement.classList.add('no-scroll')
      } else {
        document.documentElement.classList.remove('no-scroll')
      }
    },
    '$route': function () {
      this.$store.commit('ui/setSidebar', false)
    },
    'isDesktop': function () {
      this.$store.commit('ui/setSidebar', false)
    }
  },
  components: {
    BrandListing,
    BannerTile,
    HamburgerIcon,
    TopPanel
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/variables/responsive';
@import '~theme/css/helpers/functions/color';

.sidebar-menu {
  z-index: 5;

  .close {
    i {
      opacity: 0.6;
    }
    &:hover,
    &:focus {
      i {
        opacity: 1;
      }
    }
  }

  .mobile-top-panel {
    display: none;
  }
  .sidebar-menu-subcategories-list {
    column-count: 3;
    column-width: 225px;
    .sidebar-menu-subcategories {
      max-width: 225px;
    }
  }
  .sidebar-menu-list {
    z-index: 5;
    left: 0;
    width: 100%;
    height: 550px;
  }
  &.active {
    display: block
  }
  .sidebar-menu-subcategories {
    &:first-child {
      .sidebar-menu-subcategory-title {
        margin-top: 0;
      }
    }
  }
  .sidebar-menu-subcategory-childrens,
  .sidebar-menu-main-categories-list,
  .sidebar-submenu-main-items {
    list-style-type: none;
  }
  .special-product {
    max-width: 370px;
  }
  .sidebar-menu-main-category {
    .main-category-items {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid rgba(72,71,90, 0.3);
      }
    }
    .main-category-item {
      &.active {
        .sidebar-menu-subcategories-wrap {
          display: block;
        }
      }
      flex-basis: 140px;
      .sidebar-menu-subcategories-wrap {
        left: 0;
        top: 55px;
      }
    }
    .sidebar-menu-main-categories-list {
      letter-spacing: -0.5px;
    }
    .sidebar-submenu-main-items-wrap {
      top: 0;
      left: 340px;
      bottom: 5px;
      right: 0px;
      overflow: hidden;
    }
    .link-all-category {
      text-decoration: underline;
    }
    .sidebar-submenu-main-col {
      flex-basis: 210px;
      flex-shrink: 0;
    }
    .sidebar-menu-main-categories-list {
      &:hover {
        .sidebar-submenu-main-items-wrap {
          display: flex;
        }
      }
      &.active {
        .sidebar-submenu-main-items-wrap {
          display: flex;
        }
      }
    }
  }
  .sidebar-menu-main-wrap {
    .sidebar-menu-list {
      height: 480px;
    }
  }
  @media (min-width: $screen__l) {
    .sidebar-menu-list {
      &:after {
        content: '';
        background-color: white;
        position: absolute;
        right: -9999px;
        top: 0;
        bottom: 0;
        left: 100%;
      }
      &:before {
        content: '';
        background-color: white;
        position: absolute;
        left: -9999px;
        top: 0;
        bottom: 0;
        right: 100%;
      }
    }
    .item {
      &:hover {
        > a {
          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: color(silver);
          }
        }
        .sidebar-menu-list {
          display: block;
        }
      }
    }
    .sidebar-menu-main-category {
      .main-category-item {
        &:hover {
          .sidebar-menu-subcategories-wrap {
            display: block;
          }
          > a {
            &:after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 1px;
              background-color: color(silver);
            }
          }
        }
      }
    }
  }
  @media (max-width: $screen__l) {
    flex-direction: column;
    .mobile-top-panel {
      display: inherit;
    }
    .wrapper {
      min-height: auto;
      flex-grow: 1;
    }
  }
  @media (max-width: $screen__l) {
    display: block !important;
    position: fixed;
    max-width: 100%;
    height: calc(100% - 48px);
    top: 50px;
    left: 0;
    z-index: 3;
    width: 100%;
    min-width: 320px;
    transform: translateX(-100%);
    transition: transform 300ms $motion-main;
    overflow-x: hidden;
    align-items: start;
    overflow-y: auto;
    background-color: color(dark-blue);
    > div {
      flex-direction: column;
      align-items: start;
      width: 100%;
      background-color: color(white);
      overflow-y: auto;
      overflow-x: hidden;
    }
    .sidebar-menu-subcategories-list {
      column-count: unset;
      column-width: auto;
    }
    .sidebar-menu-main-category {
      width: 100%;
      margin-top: 0;
      .link-all-category {
        margin-left: 45px;
        padding-top: 0;
        padding-bottom: 20px;
      }
      .sidebar-submenu-main-col {
        flex-basis: auto;
      }
    }
    .sidebar-menu-main-categories-list {
      padding: 0;
      .account-ico {
        margin-right: 0;
        margin-left: 22px;
      }
      .sidebar-menu-main-categories-item-link {
        > span {
          padding: 13px 0 12px 10px;
          font-size: 16px;
          font-weight: 400;
          text-transform: none;
          margin-right: 0;
        }
      }
      .sidebar-submenu-main-items-name {
        display: none;
      }
      .sidebar-submenu-main-items-wrap {
        display: none !important;
        position: static;
      }
      .sidebar-menu-main-categories-item {
        display: block;
        a {
          padding: 13px 0 12px 10px;
          font-size: 16px;
          font-weight: 400;
          text-transform: none;
          margin-right: 0;
        }
        &.active {
          a {
            font-weight: 900;
          }
          .sidebar-submenu-main-items-wrap {
            display: flex !important;
            flex-direction: column;
            padding-left: 10px;
            a {
              font-size: 14px;
              text-transform: none;
              font-weight: 400;
              padding: 6px 0 5px 0px;
              margin-right: 0;
            }
          }
        }
      }
      .sidebar-menu-main-category {
        margin-top: 0;
      }
    }
    .sidebar-menu-main-item,
    .item {
      width: 100%;
      padding-right: 0;
      .item-wrap {
        border-top: 1px solid color(lightgray4);
        position: relative;
      }
      &.active {
        .item-wrap {
          a {
            font-weight: 900;
          }
        }
      }
      .arrow-icon {
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        display: block;
        &.active {
          transform: translateY(-50%) rotate(180deg);
        }
      }
      a {
        display: block;
        font-size: 16px;
        padding: 16px 0 12px 10px;
        width: 85%;
      }
    }
    .sidebar-menu-main-banner {
      display: none;
    }
    .sidebar-menu-main-wrap {
      display: block;
      .sidebar-menu-list {
        height: auto;
        padding-left: 15px;
      }
    }
    .sidebar-menu-list {
      position: static;
      height: 100%;
      &.active {
        display: block;
        .main-category-items {
          display: block;
        }
        .sidebar-menu-subcategories-wrap {
          display: block;
        }
      }
    }
    .main-category-item {
      position: relative;
      padding: 0;
      a {
        padding: 6px 0 5px 10px;
        font-size: 16px;
        font-weight: 400;
        text-transform: none;
        margin-right: 0;
      }
      .sidebar-menu-subcategories-wrap {
        position: relative;
        display: none !important;
        padding-top: 0 !important;
        top: 0 !important;
        .sidebar-menu-subcategory-childrens {
          display: none;
        }
        .sidebar-menu-subcategory-title {
          margin: 0;
          a {
            font-size: 14px;
            text-transform: none;
            font-weight: 400;
          }
        }
        &.active {
          display: block !important;
        }
      }
    }
    &.active {
      transform: translateX(0)
    }
    .main-category-items {
      display: none;
      flex-direction: column;
    }
    .sidebar-menu-btn {
      display: none;
    }
    .sidebar-menu-main-wrap {
      .hamburger {
        display: none;
      }
    }
    .sidebar-menu-main-item {
      font-weight: 400;
      margin-left: 0;
      border-top: 0;
    }
    .sidebar-menu-promoted-block {
      display: none;
    }
    .sidebar-menu-subcategories-list {
      width: 100%;
      padding-left: 15px;
    }
  }
}
</style>
