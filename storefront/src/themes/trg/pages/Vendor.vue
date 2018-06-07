<template>
  <div id="vendor" class="container pl15">
    <div class="row">
      <breadcrumbs :routes="[]" active-route="My marketplace" class="mb38 mt19"/>
    </div>
    <div class="row">
      <div class="col-md-3 fs16 lh30 cl-dark-blue weight-900 vendor-menu brdr-1 brdr-cl-white-smoke4 brdr-r-6">
        <div class="row fs18 lh25 bg-cl-white-smoke5 pl20 pr5 brdr-bottom brdr-cl-white-smoke6 py12">My Makteplace</div>
        <div class="row pl20 pr5 brdr-bottom brdr-cl-white-smoke6 py10 link-menu-item"
             v-for="(page, index) in navigation" :key="index"
             :class="{'bg-cl-white-smoke5': $route.path === page.link}" >
          <router-link :to="page.link" class="">{{ page.title }}</router-link>
        </div>
      </div>
      <div class="col-md-9">
        <router-view :is="this.$props.activeBlock" />
      </div>
    </div>
  </div>
</template>

<script>
import MyStore from 'theme/components/theme/blocks/Vendor/MyStore.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import { corePage } from 'core/lib/themes'

export default {
  data () {
    return {
      navigation: [
        { title: 'Last order', link: '/vendor/#' },
        { title: 'Product management', link: '/vendor/#' },
        { title: 'Marketing', link: '/vendor/#' },
        { title: 'Returns', link: '/vendor/#' },
        { title: 'My store', link: '/vendor/mystore' },
        { title: 'Order management', link: '/vendor/#' },
        { title: 'Payments', link: '/vendor/#' },
        { title: 'API Feed', link: '/vendor/#' },
        { title: 'kt.AR', link: '/vendor/#' },
        { title: 'Chat with admin', link: '/vendor/#' },
        { title: 'Chat with buyers', link: '/vendor/#' }
      ]
    }
  },
  props: {
    activeBlock: {
      type: String,
      default: 'MyStore'
    }
  },
  mixins: [corePage('MyAccount')],
  components: {
    MyStore,
    Breadcrumbs
  }
}
</script>
<style lang="scss" scoped>
  @import '~theme/css/variables/responsive';
  @import '~theme/css/animations/transitions';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  .vendor-menu {
    height: 100%;
  }
  .link-menu-item:last-child {
    border: none;
  }
</style>
