<template>
  <div id="app">
    <overlay v-if="overlayActive"/>
    <loader/>
    <div id="viewport" class="w-100 relative">
      <microcart/>
      <search-panel/>
      <wishlist/>
      <extend-header/>
      <router-view/>
      <main-footer/>
      <notification/>
      <sign-up/>
      <offline-badge/>
      <location/>
      <language/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

import Wishlist from './components/core/blocks/Wishlist/Wishlist.vue'
import Microcart from './components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from './components/core/blocks/SidebarMenu/SidebarMenu.vue'
import SearchPanel from './components/core/blocks/SearchPanel/SearchPanel.vue'

import Overlay from './components/core/Overlay.vue'
import Loader from './components/core/Loader.vue'
import Modal from './components/core/Modal.vue'
import Notification from './components/core/Notification.vue'
import SignUp from './components/core/blocks/Auth/SignUp.vue'
import CookieNotification from './components/core/CookieNotification.vue'
import OfflineBadge from './components/core/OfflineBadge.vue'
import Head from 'theme/resource/head'
import ExtendHeader from './components/theme/blocks/Header/ExtendHeader.vue'
import Location from './components/theme/blocks/Location/Location'
import Language from './components/theme/blocks/Language/Language'
require('babel-polyfill')

export default {
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    })
  },
  mounted () {
    this.$store.dispatch('user/startSession')
  },
  asyncData ({ store }) {
    return new Promise((resolve) => {
      store.dispatch('category/list', {}).then(() => {
        resolve()
      })
    })
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    Microcart,
    Wishlist,
    SearchPanel,
    SidebarMenu,
    Overlay,
    Loader,
    Notification,
    Modal,
    SignUp,
    CookieNotification,
    OfflineBadge,
    ExtendHeader,
    Location,
    Language
  }
}
</script>

<style lang="scss" src="./css/main.scss">
