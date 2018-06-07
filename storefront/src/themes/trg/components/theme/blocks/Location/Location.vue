<template>
  <modal name="location" :width="900">
    <div class="choose-country cl-dark-blue p30 relative">
      <i
        slot="close"
        @click="close"
        class="modal-close material-icons p15 cl-bg-tertiary"
      >
        close
      </i>
      <h1 class="uppercase fs30 lh42 weight-900 my0">{{ $t('Choose your shipping country') }}</h1>
      <p class="fs15 cl-gray2 mt0 mb30">{{ $t('By changing the country, prices may vary and all items will be removed from your Shopping Bag') }}</p>
      <div class="row">
        <p class="fs16 lh30 col-xs-12 weight-900 mt0 mb9">Latin America and the Caribbean</p>
        <div class="row w-100 pb24">
          <div class="flex wrap col-xs-12 fs15 lh32">
            <div class="list-items w-100">
              <div v-for="country in countryBlock1" :key="country.name">
                <router-link to="/" class="w-100 no-underline flex middle-xs"><span class="block brdr-circle width-23 height-23" :style="setBackground(country.image)"/><span class="pl12 opacity8">{{ country.name }}</span></router-link>
              </div>
            </div>
          </div>
        </div>
        <p class="fs16 lh30 col-xs-12 weight-900 mt0">The United States, Canada, and Puerto Rico</p>
        <div class="row w-100 pb24">
          <div class="flex wrap col-xs-12 fs15 lh32">
            <div class="list-items w-100">
              <div v-for="country in countryBlock2" :key="country.name">
                <router-link to="/" class="w-100 no-underline flex middle-xs"><span class="block brdr-circle width-23 height-23" :style="setBackground(country.image)"/><span class="pl12 opacity8">{{ country.name }}</span></router-link>
              </div>
            </div>
          </div>
        </div>
        <p class="fs16 lh30 col-xs-12 weight-900 mt0">Africa, Middle East, and India</p>
        <div class="row w-100">
          <div class="flex wrap col-xs-12 fs15 lh32">
            <div class="list-items w-100">
              <div v-for="country in countryBlock3" :key="country.name">
                <router-link to="/" class="w-100 no-underline flex middle-xs"><span class="block brdr-circle width-23 height-23" :style="setBackground(country.image)"/><span class="pl12 opacity8">{{ country.name }}</span></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapState } from 'vuex'
import Modal from 'theme/components/core/Modal'
import Countries from 'theme/resource/countries.json'
export default {
  components: {
    Modal,
    Countries
  },
  data () {
    return {
      countryBlock1: [],
      countryBlock2: [],
      countryBlock3: []
    }
  },
  created () {
    this.countryBlock1 = Countries.countries1
    this.countryBlock2 = Countries.countries2
    this.countryBlock3 = Countries.countries3
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'location')
    },
    setBackground (image) {
      return `background-image: url(${image})`
    }
  },
  computed: {
    ...mapState({
      location: state => state.ui.location
    })
  }
}
</script>
<style lang="scss">
  .choose-country {
    .list-items {
      display: inline-block;
      columns: 10rem 4;
    }
  }
</style>
