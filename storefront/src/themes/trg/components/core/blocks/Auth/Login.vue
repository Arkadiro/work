<template>

  <div class="login-page fs15" :class="{container: !regPage}">
    <breadcrumbs class="pt30" :routes="[]" active-route="Login" v-if="!regPage"/>
    <header class="modal-header fs30 lh42 cl-dark-blue weight-900 my22">
      {{ $t('Enter the site') }}
    </header>
    <div class="page-content">
      <form @submit.prevent="login" novalidate class="cl-gray2">
        <div class="form-content flex flex-wrap">
          <div class="auth-content col-xs-12" :class="{'col-md-5 col-sm-6': !regPage}">
            <div class="wrap-input flex row between-md">
              <div class="input-title lh40 ">
                {{ $t('E-mail') }}
              </div>
              <base-input
                class="mb20 h40 login-input w-100"
                type="email"
                name="email"
                focus
                v-model="email"
                :validations="[
                  {
                    condition: !$v.email.required && $v.email.$error,
                    text: $t('Field is required.')
                  },
                  {
                    condition: !$v.email.email && $v.email.$error,
                    text: $t('Please provide valid e-mail address.')
                  }
                ]"
              />
            </div>
            <div class="wrap-input flex row between-md">
              <div class="input-title lh40">
                {{ $t('Password') }}
              </div>
              <base-input
                class="mb20 login-input w-100"
                type="password"
                name="password"
                v-model="password"
                :validation="{
                  condition: !$v.password.required && $v.password.$error,
                  text: $t('Field is required.')
                }"
              />
            </div>
            <div class="wrap-btn mb20 flex row end-md">
              <button-full class="center-md brdr-r-5 fs16 weight-900" :class="{'auth-btn': regPage}" type="submit">
                {{ $t('Enter the site') }}
              </button-full>
            </div>

            <div class="wrap-btn mb20 flex row end-sm center-xs">
              <a href="#" @click.prevent="remindPassword" class="rec-pass center-xs no-underline">
                {{ $t('Forgot your password?') }}
              </a>
            </div>

          </div>
          <div v-if="!regPage" class="login-siparate center-md center-self col-md-1 relative col-xs-12 align-center col-sm-1">
            {{ $t('or') }}
          </div>
          <div v-if="!regPage" class="reg-content col-md-3 flex flex-wrap col-sm-5 col-xs-12 middle-sm">
            <div class="reg-desc w-100 col-xs-12">
              Creating an account offers many benefits:
              faster checkout, the ability to store more
              than one address, track orders and more.
            </div>
            <router-link :to="{name: 'register'}" class="align-center  mt20 col-xs-12 block reg-btn center-md lh40 brdr-r-5 brdr-1 brdr-cl-blue3 cl-blue3 mb58 w-100 bottom-self no-underline">
              {{ $t('Register') }}
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from 'core/lib/i18n'

export default {
  props: {
    regPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      remember: false,
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  mixins: [coreComponent('blocks/Auth/Login')],
  methods: {
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'register')
    },
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Reset password feature does not work while offline!'),
          action1: { label: 'OK', action: 'close' }
        })
      } else {
        this.$store.commit('ui/setAuthElem', 'forgot-pass')
      }
    },
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: i18n.t(result.result),
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          this.$bus.$emit('notification', {
            type: 'success',
            message: i18n.t('You are logged in!'),
            action1: { label: 'OK', action: 'close' }
          })
          this.close()
        }
      }).catch(err => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput,
    Breadcrumbs
  }
}
</script>

<style lang="scss">
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  .login-page {
    min-height: 60vh;
    .input-title {
      height: 40px;
    }
    .login-input {
      height: 40px;
      @media (min-width: 768px) {
        width: 250px;
      }
    }
    .wrap-btn {
      button {
        @media (min-width: 768px) {
          width: 250px;
        }
        padding: 0;
        height: 42px;
      }
    }
    .login-siparate {
      @media (max-width: 768px) {
        margin: 30px 0;
      }
      &:before {
        display: block;
        content: "";
        height: 60px;
        width: 1px;
        border-right: 1px solid color(gray2);
        margin: -5px 0 10px 50%;
        @media (max-width: 768px) {
          position: absolute;
          left: -45px;
          top: -17px;
          transform: rotate(90deg);
        }
      }
      &:after {
        display: block;
        content: "";
        width: 1px;
        height: 60px;
        border-right: 1px solid color(gray2);
        margin: 10px 0 51px 50%;
        @media (max-width: 768px) {
          position: absolute;
          left: 44px;
          top: -31px;
          transform: rotate(90deg);
        }
      }
    }
    .reg-btn {
      height: 42px;
    }
    .rec-pass {
      @media (min-width: 768px) {
        width: 250px;
      }
    }
  }
</style>
