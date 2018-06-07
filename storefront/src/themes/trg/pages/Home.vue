<template>
  <div id="home">
    <main-slider />
    <promotion />
    <electronics />
    <collection :title="$t('Featured')" cover-image="/assets/collection.jpg" category="electronics_cellular_phones_smart_phones_apple_iphones"/>
    <brands-slider />
    <home-improvement />
    <collection :title="$t('Featured')" cover-image="/assets/collection.jpg" category="home_improvement_tools_hand"/>
    <clothing />
    <collection :title="$t('Featured')" cover-image="/assets/collection.jpg" category="clothing_shoes_accessories_clothing_womens_jeans_pants_legging_shorts"/>
    <brands-slider />
    <collection-category :title="$t('All departments')"/>
    <best-shops />
    <one-day-offers category="jewelry_rings"/>
    <browsing-history category="books"/>
    <newsletter/>
    <watched-products/>
  </div>
</template>

<script>
import { corePage } from 'core/lib/themes'

import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider.vue'
import Collection from 'theme/components/theme/blocks/Collection/Collection'
import Promotion from 'theme/components/theme/blocks/Home/Promotion.vue'
import Electronics from 'theme/components/theme/blocks/Home/Electronics.vue'
import BrandsSlider from 'theme/components/theme/blocks/Home/BrandsSlider.vue'
import BestShops from 'theme/components/theme/blocks/Home/BestShops.vue'
import OneDayOffers from 'theme/components/theme/blocks/Home/OneDayOffers.vue'
import WatchedProducts from '../components/theme/blocks/Home/WatchedProducts.vue'
import CollectionCategory from '../components/theme/blocks/Collection/CollectionCategory.vue'
import Newsletter from '../components/core/blocks/Newsletter/Newsletter.vue'
import HomeImprovement from 'theme/components/theme/blocks/Home/HomeImprovement.vue'
import Clothing from 'theme/components/theme/blocks/Home/Clothing.vue'
import BrowsingHistory from 'theme/components/theme/blocks/Home/BrowsingHistory.vue'

export default {
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  beforeMount () {
    if (global.__DEMO_MODE__) {
      this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' }).then((onboardingClaim) => {
        if (!onboardingClaim) { // show onboarding info
          this.$bus.$emit('modal-toggle', 'modal-onboard')
          this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
        }
      })
    }
  },
  computed: {
    categories () {
      return this.$store.state.category.list
    },
    everythingNewCollection () {
      return this.$store.state.homepage.new_collection
    },
    coolBagsCollection () {
      return this.$store.state.homepage.coolbags_collection
    }
  },
  components: {
    MainSlider,
    Collection,
    Promotion,
    Electronics,
    BrandsSlider,
    BestShops,
    WatchedProducts,
    OneDayOffers,
    Newsletter,
    CollectionCategory,
    HomeImprovement,
    Clothing,
    BrowsingHistory
  },
  mixins: [corePage('Home')]
}
</script>

<style lang="scss" scoped>
  .new-collection {
    @media (max-width: 767px) {
      padding-top: 0;
    }
  }
</style>
