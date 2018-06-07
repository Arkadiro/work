<template>
  <div class="reg-page container fs15 pt30 cl-gray2">
    <breadcrumbs :routes="[]" active-route="Registration"/>
    <div class="form-content container flex flex-wrap top-xs" v-if="!b2b">
      <form class="reg-content col-lg-4 col-md-5 col-sm-5 col-xs-12" @submit.prevent="register">
        <div class="modal-header fs30 lh42 cl-dark-blue weight-900 my22">
          {{ $t('Registration') }}
        </div>
        <!-- Reg form -->
        <div class="wrap-input flex row between-md">
          <div class="input-title lh40 ">
            {{ $t('Name') }}
          </div>
          <base-input
            class="mb20 h40 login-input w-100"
            type="text"
            name="fist-name"
            autocomplete="given-name"
            v-model="firstName"
            :validation="{
              condition: !$v.firstName.required && $v.firstName.$error,
              text: $t('Field is required.')
            }"
          />
        </div>
        <div class="wrap-input flex row between-md">
          <div class="input-title lh40">
            {{ $t('Last Name') }}
          </div>
          <base-input
            class="mb20 login-input w-100"
            type="text"
            name="last-name"
            autocomplete="last-name"
            v-model="lastName"
            :validation="{
              condition: !$v.lastName.required && $v.lastName.$error,
              text: $t('Field is required.')
            }"
          />
        </div>
        <div class="wrap-input flex row between-md">
          <div class="input-title lh40">
            {{ $t('Phone Number') }}
          </div>
          <base-input
            class="mb20 login-input w-100"
            type="text"
            name="phone"
            v-model="phone"
          />
        </div>
        <div class="wrap-input flex row between-md">
          <div class="input-title lh40">
            {{ $t('E-mail') }}
          </div>
          <base-input
            class="mb20 login-input w-100"
            type="email"
            name="email"
            autocomplete="email"
            v-model="email"
            focus
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
            autocomplete="new-password"
            v-model="password"
            :validation="{
              condition: !$v.password.required && $v.password.$error,
              text: $t('Field is required.')
            }"
          />
        </div>
        <div class="wrap-input flex row between-md">
          <div class="input-title lh40">
            {{ $t('Password again') }}
          </div>
          <base-input
            class="mb20 login-input w-100"
            type="password"
            name="password-confirm"
            autocomplete="new-password"
            v-model="rPassword"
            :validations="[
              {
                condition: !$v.rPassword.required && $v.rPassword.$error,
                text: $t('Field is required.')
              },
              {
                condition: !$v.rPassword.sameAsPassword,
                text: $t('Passwords must be identical.')
              }
            ]"
          />
        </div>
        <div class="wrap-btn mb20 flex row end-md">
          <button-full class="center-md brdr-r-5 fs16 weight-900" type="submit">
            {{ $t('Register') }}
          </button-full>
        </div>

        <div class="wrap-btn mb20 flex row end-md">
          <div class="wrap-agree">
            <base-checkbox
              class="mb35"
              id="terms"
              v-model="conditions"
              @click="conditions = !conditions"
              @blur="$v.conditions.$reset()"
              @change="$v.conditions.$touch()"
              :validation="{
                condition: !$v.conditions.required && $v.conditions.$error,
                text: $t('You must accept the terms and conditions.')
              }"
            >
              <div class="desc-agree align-left">
                <div class="mb16">
                  {{ $t('I consent to the processing of my personal data.') }}
                </div>
                <div>
                  {{ $t('By clicking "Register" I give my consent to the processing of personal data in accordance with the conditions specified here.') }}
                </div>
              </div>
            </base-checkbox>
          </div>
        </div>
      </form>
      <!-- Splitter -->
      <div class="pl24 login-separate center-md center-self col-md-1 relative col-xs-12 align-center col-sm-2">
        {{ $t('or') }}
      </div>
      <!-- Auth form -->
      <div class="auth-content col-lg-4 col-md-5 col-sm-5 w-100 flex flex-wrap top-xs">
        <login reg-page class="w-100"/>
        <div class="wrap-btn log-btns mb20 flex flex-wrap end-md w-100">
          <button-full class="flex flex-wrap middle-xs brdr-r-5 bg-cl-blue4 fs-medium-small mb10">
            <div class="wrap-icon brdr-r-1">
              <svg width="11px" height="21px" viewBox="0 0 11 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="mobile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="checkout_1_mob" transform="translate(-79.000000, -1244.000000)" fill="#FFFFFF">
                    <g id="Facebook" transform="translate(79.000000, 1244.000000)">
                      <path fill="color(wihte)" d="M7.07215254,20.991693 L7.07215254,11.4545027 L10.2649527,11.4545027 L10.7429614,7.73770331 L7.07215254,7.73770331 L7.07215254,5.36463801 C7.07215254,4.28856032 7.3702157,3.55515552 8.90936953,3.55515552 L10.8723571,3.55424684 L10.8723571,0.229996714 C10.5327061,0.184865664 9.36754093,0.0836994186 8.01195776,0.0836994186 C5.18176754,0.0836994186 3.24415563,1.81574227 3.24415563,4.99672404 L3.24415563,7.73780427 L0.0430983211,7.73780427 L0.0430983211,11.4546037 L3.24405494,11.4546037 L3.24405494,20.991794 L7.07215254,20.991693 L7.07215254,20.991693 L7.07215254,20.991693 Z" id="f"/>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div class="btn-title align-left pl10">
              {{ $t('Sign in with Facebook') }}
            </div>
          </button-full>
          <button-full class="flex flex-wrap middle-xs brdr-r-5 tw-btn fs-medium-small mb10">
            <div class="wrap-icon brdr-r-1">
              <svg width="21px" height="17px" viewBox="0 0 21 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="mobile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="checkout_1_mob" transform="translate(-75.000000, -1297.000000)" fill="#FFFFFF">
                    <g id="Twitter" transform="translate(75.000000, 1297.000000)">
                      <path d="M18.3324627,2.61485528 C19.213125,2.1015538 19.887786,1.28815273 20.2063316,0.320070536 C19.3837017,0.795464696 18.4715754,1.14075323 17.4994914,1.32670254 C16.7225174,0.520583108 15.6145661,0.0172938747 14.3887898,0.0172938747 C12.0359748,0.0172938747 10.1278364,1.87384219 10.1278364,4.16530736 C10.1278364,4.48998246 10.1654062,4.80673343 10.2376304,5.11084862 C6.69578381,4.93758863 3.55570841,3.28621099 1.45389039,0.776939369 C1.08688359,1.38977432 0.876811806,2.10230338 0.876811806,2.86253783 C0.876811806,4.30146316 1.62925275,5.57103702 2.77257354,6.31472718 C2.07403947,6.29352478 1.41703569,6.10687943 0.841992366,5.7961251 L0.841992366,5.84854214 C0.841992366,7.85848659 2.31073465,9.53443974 4.26040326,9.91560102 C3.90225259,10.0111189 3.52638967,10.0610195 3.13754508,10.0610195 C2.86262003,10.0610195 2.59589101,10.0356944 2.33532279,9.987989 C2.87763694,11.6354046 4.45149763,12.8345715 6.31579536,12.8684632 C4.85728438,13.9813214 3.01950003,14.6446994 1.02346051,14.6446994 C0.679666668,14.6446994 0.339888341,14.6247285 0.00632580663,14.5855897 C1.89257133,15.7628582 4.13218191,16.4501157 6.53890381,16.4501157 C14.3771833,16.4501157 18.6639899,10.1294454 18.6639899,4.64809024 C18.6639899,4.46813757 18.6599194,4.28952343 18.6510083,4.11155179 C19.4859597,3.52382776 20.209137,2.79346941 20.7801648,1.96143593 C20.0160623,2.29146517 19.1953577,2.51457222 18.3324627,2.61485528 Z" id="Shape" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div class="btn-title align-left pl10">
              {{ $t('Sign in with Facebook') }}
            </div>
          </button-full>
          <button-full class="flex flex-wrap middle-xs brdr-r-5 gl-btn fs-medium-small mb10">
            <div class="wrap-icon brdr-r-1">
              <svg width="24px" height="16px" viewBox="0 0 24 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="mobile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="checkout_1_mob" transform="translate(-73.000000, -1347.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g id="google-plus" transform="translate(73.000000, 1347.000000)">
                      <path d="M8.7750405,9.65042402 L12.6825747,9.65042402 C11.9966795,11.589255 10.1390261,12.9793417 7.96421378,12.9632985 C5.32537014,12.9438174 3.14340792,10.8332037 3.04096299,8.19676462 C2.9311499,5.37069882 5.19885584,3.03657114 8.00149129,3.03657114 C9.28295337,3.03657114 10.4523646,3.52474401 11.3339804,4.32466867 C11.5427999,4.51418626 11.8606685,4.51538678 12.0660495,4.32210394 L13.5012608,2.97157965 C13.72569,2.76034366 13.7265087,2.40362713 13.5027345,2.19168175 C12.1045823,0.867350499 10.229027,0.0418876145 8.16075303,0.00150667088 C3.7493448,-0.084602963 0.0309270651,3.53161968 0.000199046473,7.94296493 C-0.0308018675,12.3874335 3.56339389,16 8.00149129,16 C12.2695203,16 15.7561407,12.6588043 15.9896846,8.44996405 C15.9959066,8.39719598 16,6.61383163 16,6.61383163 L8.7750405,6.61383163 C8.47889445,6.61383163 8.23885568,6.8538254 8.23885568,7.14991594 L8.23885568,9.11433971 C8.23885568,9.41043025 8.47894903,9.65042402 8.7750405,9.65042402 Z" id="Shape" />
                      <path d="M21.7194499,7.28055006 L21.7194499,5.44843213 C21.7194499,5.20075008 21.5186999,5 21.2710178,5 L19.7289822,5 C19.4813001,5 19.2805501,5.20075008 19.2805501,5.44843213 L19.2805501,7.28055006 L17.4484321,7.28055006 C17.2007501,7.28055006 17,7.48130014 17,7.72898219 L17,9.27101781 C17,9.51869986 17.2007501,9.71944994 17.4484321,9.71944994 L19.2805501,9.71944994 L19.2805501,11.5515679 C19.2805501,11.7992499 19.4813001,12 19.7289822,12 L21.2710178,12 C21.5186999,12 21.7194499,11.7992499 21.7194499,11.5515679 L21.7194499,9.71944994 L23.5515679,9.71944994 C23.7992499,9.71944994 24,9.51869986 24,9.27101781 L24,7.72898219 C24,7.48130014 23.7992499,7.28055006 23.5515679,7.28055006 L21.7194499,7.28055006 Z" id="Shape" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div class="btn-title align-left pl10">
              {{ $t('Sign in with Facebook') }}
            </div>
          </button-full>
        </div>
      </div>
    </div>

    <div class="b2b" v-else>
      <div class="modal-header fs30 lh42 cl-dark-blue weight-900 my22">
        {{ $t('Registration in TRG International Market Place') }}
      </div>

      <form class="form-content container flex flex-wrap top-xs pl0" @submit.prevent="registerSeller">
        <div class="reg-content col-lg-5 col-md-5 col-sm-5 col-xs-12">

          <div class="wrap-input flex row between-md">
            <div class="input-title lh40 ">
              {{ $t('Name') }}
            </div>
            <base-input
              class="mb20 h40 login-input w-100"
              type="text"
              name="fist-name"
              autocomplete="given-name"
              v-model="firstName"
              :validation="{
                condition: !$v.firstName.required && $v.firstName.$error,
                text: $t('Field is required.')
              }"
            />
          </div>
          <div class="wrap-input flex row between-md">
            <div class="input-title lh40">
              {{ $t('Last Name') }}
            </div>
            <base-input
              class="mb20 login-input w-100"
              type="text"
              name="last-name"
              autocomplete="last-name"
              v-model="lastName"
              :validation="{
                condition: !$v.lastName.required && $v.lastName.$error,
                text: $t('Field is required.')
              }"
            />
          </div>
          <div class="wrap-input flex row between-md">
            <div class="input-title lh40">
              {{ $t('E-mail') }}
            </div>
            <base-input
              class="mb20 login-input w-100"
              type="email"
              name="email"
              autocomplete="email"
              v-model="email"
              focus
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
              autocomplete="new-password"
              v-model="password"
              :validation="{
                condition: !$v.password.required && $v.password.$error,
                text: $t('Field is required.')
              }"
            />
          </div>
          <div class="wrap-input flex row between-md">
            <div class="input-title lh40">
              {{ $t('Password again') }}
            </div>
            <base-input
              class="mb20 login-input w-100"
              type="password"
              name="password-confirm"
              autocomplete="new-password"
              v-model="rPassword"
              :validations="[
                {
                  condition: !$v.rPassword.required && $v.rPassword.$error,
                  text: $t('Field is required.')
                },
                {
                  condition: !$v.rPassword.sameAsPassword,
                  text: $t('Passwords must be identical.')
                }
              ]"
            />
          </div>

          <div class="wrap-btn mb20 flex row end-md">
            <div class="wrap-agree">
              <div class="desc-agree fs12 lh18 cl-gray2 weight-400 align-left">
                <div>
                  {{ $t('By clicking "Register" I give my consent to the processing of personal data in accordance with the conditions specified here.') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="reg-content col-lg-5 col-md-5 col-sm-5 col-lg-offset-1 col-md-offset-1 col-xs-12">

          <div class="wrap-input flex row between-md">
            <div class="input-title lh40 ">
              {{ $t('Store Name') }}
            </div>
            <base-input
              class="mb20 h40 login-input w-100"
              type="text"
              name="store-name"
              autocomplete="given-name"
              v-model="storeName"
            />
          </div>
          <div class="wrap-input flex row between-md">
            <div class="input-title lh40">
              {{ $t('City') }}
            </div>
            <base-input
              class="mb20 login-input w-100"
              type="text"
              name="city"
              v-model="city"
            />
          </div>
          <div class="wrap-input flex row between-md">
            <div class="input-title lh40">
              {{ $t('Address') }}
            </div>
            <base-input
              class="mb20 login-input w-100"
              type="text"
              name="address"
              v-model="address"
            />
          </div>
          <div class="wrap-input flex row between-md">
            <div class="input-title lh40">
              {{ $t('Phone') }}
            </div>
            <base-input
              class="mb20 login-input w-100"
              type="text"
              name="phone"
              v-model="phone"
            />
          </div>
          <div class="wrap-input flex row between-md">
            <div class="input-title lh40">
              {{ $t('Bank name') }}
            </div>
            <base-input
              class="mb20 login-input w-100"
              type="text"
              name="bankName"
              v-model="bankName"
            />
          </div>

          <div class="wrap-btn flex row end-md">
            <div class="wrap-agree">
              <base-checkbox
                class="mb22"
                id="terms"
                v-model="conditions"
                @click="conditions = !conditions"
                @blur="$v.conditions.$reset()"
                @change="$v.conditions.$touch()"
                :validation="{
                  condition: !$v.conditions.required && $v.conditions.$error,
                  text: $t('You must accept the terms and conditions.')
                }"
              >
                <div class="desc-agree align-left">
                  <div class="fs14 lh18 weight-400 cl-gray2">
                    {{ $t('I consent to the processing of my personal data.') }}
                  </div>
                </div>
              </base-checkbox>
            </div>
          </div>

          <div class="wrap-btn mb20 flex row end-md">
            <button-full class="center-md brdr-r-5 fs16 weight-900" type="submit">
              {{ $t('Register') }}
            </button-full>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import Login from 'theme/components/core/blocks/Auth/Login.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import i18n from 'core/lib/i18n'

export default {
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      rPassword: '',
      storeName: '',
      phone: '',
      conditions: false,
      city: '',
      address: '',
      bankName: '',
      b2bGroup: 4
    }
  },
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    conditions: {
      required
    }
  },
  props: {
    b2b: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    },
    registerSeller () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      const seller = {
        customer: {
          email: this.email,
          firstname: this.firstName,
          group_id: this.b2bGroup,
          lastname: this.lastName,
          created_in: 'Default Store View (English version)',
          website_id: 1
        },
        password: this.password
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('registerSeller', seller).then((res) => {
        const customerId = res.result.id

        if (customerId) {
          this.$store.dispatch('storeUpdate', { customer_id: customerId, store_name: this.storeName, city: this.city, address: this.address, bank_name: this.bankName, contact: this.phone }).then((response) => {
            this.$bus.$emit('notification-progress-stop')
            if (response.code === 200) {
              this.$store.dispatch('user/login', { username: this.email, password: this.password }).then(result => {
                this.$bus.$emit('notification', {
                  type: 'success',
                  message: i18n.t('You are logged in!'),
                  action1: { label: 'OK', action: 'close' }
                })
              })
              this.close()
            } else {
              this.$bus.$emit('notification', {
                type: 'error',
                message: i18n.t('Internal Error'),
                action1: { label: 'OK', action: 'close' }
              })
            }
          })
        } else {
          this.$bus.$emit('notification-progress-stop')
          this.$bus.$emit('notification', {
            type: 'error',
            message: res.result.message ? res.result.message : i18n.t('Internal Error'),
            action1: { label: 'OK', action: 'close' }
          })
        }
      }).catch(err => {
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
      })
    },
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))

      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName }).then((result) => {
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: result.result,
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
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
      })
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput,
    Breadcrumbs,
    Login
  }
}
</script>

<style lang="scss">
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  .reg-page {
    min-height: 60vh;
    .input-title, .login-input {
      height: 40px;
    }

    .wrap-btn {
      button {
        padding: 0;
        height: 42px;
      }
    }
    .login-separate {
      &:before {
        display: block;
        content: "";
        height: 137px;
        width: 1px;
        border-right: 1px solid color(gray2);
        margin: -5px 0 10px 50%;
      }
      &:after {
        display: block;
        content: "";
        width: 1px;
        height: 144px;
        border-right: 1px solid color(gray2);
        margin: 10px 0 178px 50%;
      }
    }
    .auth-btn {
      background-color: color(white);
      border: 1px solid color(blue3);
      color: color(blue3);
    }
    .reg-btn {
      height: 42px;
    }
    .wrap-icon {
      border-right: 1px solid color(white);
      width: 40px;
      height: 21px;
    }
    .btn-title {
      width: 170px;
    }
    .login-page {
      min-height: inherit;
    }
    .log-btns {
      button {
        display: flex;
      }

    }
    .tw-btn {
      background-color: color(blue5);
    }
    .gl-btn {
      background-color: color(red3);
    }
    .wrap-agree {
      .cl-error {
        margin-bottom: -25px;
      }
    }

    //
    //  Desktop
    //  _____________________________________________

    @media (max-width: 1024px){
      .input-title, .login-input {
        width: 100%;
        margin-bottom: 0;
      }
    }

    @media (min-width: 768px) {
      .wrap-btn {
        button {
            width: 250px;
        }
      }
      .rec-pass, .reg-btn, .login-input, .wrap-agree  {
        width: 250px;
      }

      .b2b {
        .rec-pass, .reg-btn, .login-input, .wrap-agree  {
          width: 295px;
        }
        .wrap-btn {
          button {
              width: 295px;
          }
        }
      }
    }

    //
    //  Mobile
    //  _____________________________________________

    @media (max-width: 1024px){
      .input-title, .login-input {
        width: 100%;
        margin-bottom: 0;
      }
      .wrap-btn, .reg-btn {
        margin-top: 33px;
      }
    }

    @media (max-width: 768px) {
      .modal-header {
        text-align: center;
        padding: 0;
      }

      .login-separate {
        margin: 30px 0;
        padding-left: 8px;
        &:before {
          position: absolute;
          height: 60px;
          left: -45px;
          top: -17px;
          transform: rotate(90deg);
          margin: -5px 0 10px 50%;
        }
        &:after {
          position: absolute;
          height: 60px;
          left: 44px;
          top: -31px;
          margin: 10px 0 51px 50%;
          transform: rotate(90deg);
        }
      }
      .auth-content {
        min-width: 100%;
      }
    }
  }

</style>
