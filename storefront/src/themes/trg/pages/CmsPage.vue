<template>
  <div class="static-page py25 relative">
    <div class="container">
      <div class="cms-page flex flex-column cl-dark-blue">
        <h2 class="cms-page-title my10 align-left fs-32 weight-400">{{ pages.content_heading }}</h2>

        <article class="container cms-page-wrapper px0">
          <div class="row center-xs">
            <div class="col-lg-12">
              <div class="cms-page-content  align-left" v-html="pages.content"/>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>

</template>
<script>
import Cmspage from 'src/themes/trg/components/theme/blocks/Cmspage.vue'

export default {
  name: 'Cmspage',
  mixins: [Cmspage],
  watch: {
    '$route': 'validateRoute'
  },
  computed: {
    pages () {
      let id = this.$route.params.slug
      return this.cmspages.find((e) => e.identifier === id)
    }
  }
}
</script>
