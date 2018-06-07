<template>
  <modal name="language" :width="900">
    <div class="choose-language cl-dark-blue p30 relative" v-on-click-outside="close">
      <i
        slot="close"
        @click="close"
        class="modal-close material-icons p15 cl-bg-tertiary"
      >
        close
      </i>
      <h1 class="uppercase fs30 lh42 weight-900 my0">{{ $t('Choose your favorite language') }}</h1>

      <div class="row">
        <p class="fs16 lh30 col-xs-12 weight-900 mt0 mb9">List of languages:</p>
        <div class="row w-100 pb24">
          <div class="flex wrap col-xs-12 fs15 lh32">
            <div class="list-items w-100">
              <div v-for="language in languages" :key="language.name">
                <router-link to="/" class="w-100 no-underline flex middle-xs">
                  <span class="pl12 opacity8">{{ language.name }}</span>
                </router-link>
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
import LanguageList from 'theme/resource/languageList.json'
import { mixin as onClickOutside } from 'vue-on-click-outside'
export default {
  components: {
    Modal,
    LanguageList
  },
  data () {
    return {
      languages: []
    }
  },
  created () {
    this.languages = LanguageList.lenguage
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'language')
    }
  },
  computed: {
    ...mapState({
      language: state => state.ui.language
    })
  },
  mixins: [onClickOutside]
}
</script>
<style lang="scss">
  .choose-language {
    .list-items {
      display: inline-block;
      columns: 10rem 4;
    }
  }
</style>
