<template>
  <div class="cl-dark-blue ml20" id="my-store">
    <div class="row fs30 lh42 weight-900">My store</div>
    <div class="row">
      <div class="col-md-7">
        <div class="row fs18 lh25 weight-900 pb17">
          Information about the shop
        </div>
        <div class="row middle-md pt11">
          <div class="col-md-4 fs15 lh30 weight-400 cl-gray2 pl0">Store name*</div>
          <div class="col-md-7">
            <input required v-model="store.store_name" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Store name">
          </div>
        </div>
        <div class="row middle-md pt11">
          <div class="col-md-4 fs15 lh30 weight-400 cl-gray2 pl0">Phone*</div>
          <div class="col-md-7">
            <input v-model="store.contact" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Phone">
          </div>
        </div>
        <div class="row middle-md pt11">
          <div class="col-md-4 fs15 lh30 weight-400 cl-gray2 pl0">Address*</div>
          <div class="col-md-7">
            <input v-model="store.address" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Address">
          </div>
        </div>
        <div class="row middle-md pt11">
          <div class="col-md-4 fs15 lh30 weight-400 cl-gray2 pl0">City*</div>
          <div class="col-md-7">
            <input v-model="store.city" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="City">
          </div>
        </div>
        <div class="row col-md-4 fs15 lh30 weight-400 cl-gray2 pl0 pt11 pb8">
          Description:
        </div>
        <div class="row">
          <div class="col-md-11 px0">
            <no-ssr>
              <wysiwyg v-model="store.desc"/>
            </no-ssr>
          </div>
        </div>
        <div class="row fs18 lh25 weight-900 pt55">Social network</div>
        <div class="row middle-md pt11">
          <div class="col-md-3 fs15 lh30 weight-400 cl-gray2 pl0">Twitter</div>
          <div class="col-md-8">
            <input v-model="store.twitter_id" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Twitter">
          </div>
        </div>
        <div class="row middle-md pt11">
          <div class="col-md-3 fs15 lh30 weight-400 cl-gray2 pl0">Facebook</div>
          <div class="col-md-8">
            <input v-model="store.facebook_id" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Facebook">
          </div>
        </div>
        <div class="row middle-md pt11">
          <div class="col-md-3 fs15 lh30 weight-400 cl-gray2 pl0">Instagram</div>
          <div class="col-md-8">
            <input v-model="store.instagram_id" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Instagram">
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="row fs18 lh25 weight-900 pb17">
          Logo store
        </div>
        <div class="row pt11">
          <div class="col-md-10 pl0">
            <button-full v-if="store.logo_file" class="brdr-r-5 cl-blue fs14 lh19 weight-900 height-45 pt12 button-white brdr-cl-blue brdr-1" @click.native="removeImage('logo')">
              Remove
            </button-full>

            <button-full v-else class="brdr-r-5 cl-blue fs14 lh19 weight-900 height-45 pt12 button-white brdr-cl-blue brdr-1" @click.native="chooseFile('logo')">
              Download
            </button-full>
            <div class="flex mt11">
              <croppa
                v-if="loadData"
                v-show="store.logo_file"
                v-model="myCroppa"
                ref="logo"
                :height="55"
                :width="60"
                :disable-drag-to-move="true"
                :disable-scroll-to-zoom="true"
                :initial-image="store.logo_file"
                :show-remove-button="false"
                @loading-end="generateImage('logo')"
                @file-choose="setFileName('logo')"
                class="brdr-1 brdr-cl-white-smoke4"/>

              <div v-if="store.logo_name" class="pl10 fs15 lh18 weight-400 cl-silver3">{{ store.logo_name }}</div>
            </div>
          </div>
          <span v-show="!store.logo_file && !store.logo_name" class="lh30 fs15 weight-400 cl-gray2">Images .jpeg size 150*110px</span>
        </div>

        <div class="row fs18 lh25 weight-900 pt27 pb13">Shop banner</div>
        <div class="row">
          <div class="col-md-10 pl0">
            <button-full v-if="store.banner_file" class="brdr-r-5 cl-blue fs14 lh19 weight-900 height-45 pt12 button-white brdr-cl-blue brdr-1" @click.native="removeImage('banner')">
              Remove
            </button-full>

            <button-full v-else class="brdr-r-5 cl-blue fs14 lh19 weight-900 height-45 pt12 button-white brdr-cl-blue brdr-1" @click.native="chooseFile('banner')">
              Download
            </button-full>

            <div class="flex mt11">
              <croppa
                v-if="loadData"
                v-show="store.banner_file"
                v-model="myCroppa"
                ref="banner"
                :height="55"
                :width="60"
                :disable-drag-to-move="true"
                :disable-scroll-to-zoom="true"
                :show-remove-button="false"
                :initial-image="store.banner_file"
                @loading-end="generateImage('banner')"
                @file-choose="setFileName('banner')"
                class="brdr-1 brdr-cl-white-smoke4"/>

              <div v-if="store.banner_name" class="pl10 weight-400 fs15 lh18 cl-silver3">{{ store.banner_name }}</div>
            </div>
          </div>
          <span v-show="!store.banner_file && !store.banner_name" class="lh30 fs15 weight-400 cl-gray2">Images .jpeg size 150*110px</span>
        </div>
        <div class="row fs18 lh25 weight-900 pt50">Bank details of your store</div>

        <div class="row middle-md pt11">
          <div class="col-md-5 pl0 fs15 lh30 weight-400 cl-gray2">Bank name</div>
          <div class="col-md-7">
            <input v-model="store.bank_name" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Bank name">
          </div>
        </div>

        <div class="row middle-md pt11">
          <div class="col-md-5 pl0 fs15 lh30 weight-400 cl-gray2">Settlement account</div>
          <div class="col-md-7">
            <input v-model="store.settlement_acc" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Settlement account">
          </div>
        </div>

        <div class="row middle-md pt11">
          <div class="col-md-5 pl0 fs15 lh30 weight-400 cl-gray2">Cor. account</div>
          <div class="col-md-7">
            <input v-model="store.cor_acc" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="Cor. account">
          </div>
        </div>

        <div class="row middle-md pt11">
          <div class="col-md-5 pl0 fs15 lh30 weight-400 cl-gray2">BIK</div>
          <div class="col-md-7">
            <input v-model="store.bik" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholder="BIK">
          </div>
        </div>

        <div class="row middle-md pt11">
          <div class="col-md-5 pl0 fs15 lh30 weight-400 cl-gray2">SWIFT</div>
          <div class="col-md-7">
            <input v-model="store.swift" class="w-100 fs15 height-45 no-outline lh30 cl-gray2 weight-400 bg-cl-white brdr-1 brdr-cl-lightgray2 brdr-r-5 px9" type="text" placeholde="SWIFT">
          </div>
        </div>

        <div class="row end-md pt20 pb20">
          <div class="col-md-8">
            <button-full class="brdr-r-5 cl-white fs16 lh22 weight-900 height-45 pt12" @click.native="updateStore">
              Save
            </button-full>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import NoSSR from 'vue-no-ssr'
import { mapState } from 'vuex'
import Vue from 'vue'
import wysiwyg from 'vue-wysiwyg'
import Croppa from 'vue-croppa'
import i18n from 'core/lib/i18n'
Vue.use(Croppa)
Vue.use(wysiwyg, {hideModules: { 'image': true, 'code': true }})

export default {
  data () {
    return {
      myCroppa: null,
      store: {
        customer_id: '',
        facebook_id: '',
        twitter_id: '',
        desc: '',
        store_name: '',
        contact: '',
        logo_file: '',
        logo_name: '',
        banner_name: '',
        banner_file: '',
        address: '',
        city: '',
        instagram_id: '',
        bank_name: '',
        settlement_acc: '',
        cor_acc: '',
        bik: '',
        swift: ''
      },
      loadData: false,
      errors: []
    }
  },
  components: {
    ButtonFull,
    'no-ssr': NoSSR
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  methods: {
    uploadCroppedImage () {
      this.myCroppa.generateBlob(
        blob => {
          // write code to upload the cropped image file (a file is a blob)
        },
        'image/jpeg',
        0.8
      ) // 80% compressed jpeg file
    },
    removeImage (param) {
      this.$refs[param].remove()
      if (param === 'logo') {
        this.store.logo_file = ''
        this.store.logo_name = ''
      } else if (param === 'banner') {
        this.store.banner_file = ''
        this.store.banner_name = ''
      }
    },
    generateImage (param) {
      let url = this.$refs[param].generateDataUrl()

      if (param === 'logo') {
        this.store.logo_file = url
      } else if (param === 'banner') {
        this.store.banner_file = url
      }
    },
    setFileName (param) {
      if (param === 'logo') {
        this.store.logo_name = this.$refs[param].getChosenFile().name
      } else if (param === 'banner') {
        this.store.banner_name = this.$refs[param].getChosenFile().name
      }
    },
    chooseFile (param) {
      this.$refs[param].chooseFile()
    },
    validateData () {
      this.errors = []
      if (!this.store.store_name) {
        this.errors.push(' Store name')
      }
      if (!this.store.contact) {
        this.errors.push(' Phone')
      }
      if (!this.store.address) {
        this.errors.push(' Address')
      }
      if (!this.store.city) {
        this.errors.push(' City')
      }
      if (this.errors.length) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Fields: ' + this.errors + ' can\'t be an empty',
          action1: { label: 'OK', action: 'close' }
        })
        return false
      } else {
        return true
      }
    },
    loadStore () {
      if (this.currentUser && this.currentUser.group_id === 4) {
        this.$bus.$emit('notification-progress-start', 'Loading information...')
        this.$store.dispatch('storeGet', this.currentUser.id).then((res) => {
          if (res.code === 200) {
            Object.assign(this.store, res.result)
            this.loadData = true
            return this.$bus.$emit('notification-progress-stop')
          } else {
            return this.$bus.$emit('notification', {
              type: 'error',
              message: 'Server error',
              action1: { label: 'OK', action: 'close' }
            })
          }
        })
      } else {
        return this.$bus.$emit('notification', {
          type: 'error',
          message: 'User not authorized or user not a seller',
          action1: { label: 'OK', action: 'close' }
        })
      }
    },
    updateStore () {
      if (this.validateData()) {
        this.$bus.$emit('notification-progress-start', 'Saving information...')
        this.$store.dispatch('storeUpdate', this.store).then((res) => {
          Object.assign(this.store, res.result)
          this.$bus.$emit('notification-progress-stop')
          this.$bus.$emit('notification', {
            type: 'success',
            message: i18n.t('Information updated'),
            action1: { label: 'OK', action: 'close' }
          })
        })
      }
    }
  },
  beforeMount () {
    this.loadStore()
  }
}
</script>

<style lang="scss" scoped>
@import "~vue-croppa/dist/vue-croppa.css";
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
@import '~theme/css/variables/colors';
@import '~theme/css/variables/responsive';
@import '~theme/css/helpers/functions/color';

  #my-store {
    .button-white {
      background-color: color(white);
    }
  }
</style>
<style lang="scss">
  #my-store {
    .editr--content {
      min-height: 96px;
    }
  }
</style>

