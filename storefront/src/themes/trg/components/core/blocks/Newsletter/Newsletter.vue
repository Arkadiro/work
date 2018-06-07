<template>
  <div class="newsletter pb53 pt52 bg-cl-white-smoke">
    <div class="container">
      <div class="newsletter-content m0 row">
        <div class="col-md-3 pl0">
          <h3 class="h3 weight-900 m0 lh42 fs30 cl-dark-blue">
            {{ $t('Best offers') }}
          </h3>
        </div>
        <subscribe-links/>
        <form @submit.prevent="subscribe" novalidate class="col-md-6 flex px0">
          <div class="col-md-6 end-md email pr2">
            <base-input
              type="subscribe"
              name="email"
              v-model="email"
              autocomplete="email"
              placeholder="please email"
              :validations="[
                {
                  condition: $v.email.$error && !$v.email.required,
                  text: $t('Field is required.')
                },
                {
                  condition: !$v.email.email && $v.email.$error,
                  text: $t('Please provide valid e-mail address.')
                }
              ]"
            />
          </div>
          <div class="col-md-6 end-md button-wrapper pr0">
            <button-outline
              type="submit"
              class="newsletter-button weight-900 fs14 lh19 cl-dark-blue w-100 height-45 w-100"
              @click.native="$v.email.$touch"
              color="yellow"
            >
              {{ $t('Subscribe') }}
            </button-outline>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonOutline from '../../../theme/ButtonOutline.vue'
import SubscribeLinks from '../../../theme/SubscribeLinks.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from 'core/lib/i18n'

export default {
  name: 'Newsletter',
  data () {
    return {
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  mounted () {
    if (this.$store.state.user.current) {
      this.email = this.$store.state.user.current.email
    }
  },
  methods: {
    subscribe () {
      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      // todo: add user email to newsletter list
      this.$bus.$emit('newsletter-after-subscribe', { email: this.email })

      this.$bus.$emit('notification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed to our newsletter!'),
        action1: { label: 'OK', action: 'close' }
      })

      this.$bus.$emit('modal-hide', 'modal-newsletter')
    }
  },
  components: {
    Modal,
    BaseInput,
    ButtonOutline,
    SubscribeLinks
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/responsive';

h3 {
  font-family: Avenir;
}

.newsletter-button {
  border-radius: 5px;
  border: none;
  max-width: 295px;
}

@media (max-width: $screen__m) {
  h3 {
    width: 100%;
    text-align: center;
    font-size: 20px;
    line-height: 27px;
    padding-bottom: 15px;
  }
  .subscribe-links {
    flex-direction: column-reverse;
    text-align: center;
    order: 3;
  }
  .newsletter {
    padding-top: 20px;
    padding-bottom: 21px;
  }

  .newsletter-button {
    padding-left: 25px;
  }
  .no-mr-mobile {
    margin-right: 0;
  }

  .email {
    max-width: 64%;
  }
  .button-wrapper {
    max-width: 35%;
  }
}
</style>
