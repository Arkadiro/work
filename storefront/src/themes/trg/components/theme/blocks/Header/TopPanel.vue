<template>
  <div class="bg-cl-dark-blue first-line py8 fs12 cl-white top-panel">
    <div class="container">
      <div class="row px10 flex between-xs wrapper">
        <div class="col-sm-6 col-lg-6 flex between-xs middle-xs links-left">
          <div class="phone item flex center-xs middle-xs">
            <i class="trg-icons phone-ico fs18 mr5" />
            <a href="tel:+1 456 234-23-23" class="no-underline cl-white2 fs14 lh17 weight-400">+1 456 234-23-23</a>
          </div>
          <div class="flex item center-xs middle-xs">
            <i class="trg-icons map-ico fs18 mr5" />
            <location-icon class="location">
              <div v-if="!currentLocation" slot="title" class="cl-white2 fs14 lh17 weight-400">{{ $t('New York') }}</div>
              <div v-if="currentLocation" slot="title" class="cl-white2 fs14 lh17 weight-400" >{{ currentLocation }}</div>
            </location-icon>
            <div class="language">
              <div class="flex">
                <span>(</span>
                <select-language class="select-lang hidden px0">
                  <div slot="title" class="fs14 lh17 cl-white2 weight-400">English</div>
                </select-language>
                <div class="language-title pointer fs14 lh17 cl-white2 weight-400" @click="isHidden = !isHidden">{{ LanguageSelect }}</div>
                <span>)</span>
              </div>
              <div class="language-bar p20 mt10 align-left" v-show="!isHidden">
                <span class="pt10 pb10 pointer" @click="changeLanguage(language.name, language.locale)" v-for="(language, key) in LanguageList" :key="key">{{ language.name }}</span>
              </div>
            </div>
          </div>

          <div class="item">
            <router-link class="underline cl-white2 fs14 lh17 weight-400" :to="{ name: 'home'}">$ (USA Dollar)</router-link>
          </div>
        </div>
        <ul class="col-sm-6 col-lg-6 flex between-xs my0 links-right">
          <li class="bottom-xs flex item">
            <i class="trg-icons worldwide-ico fs20 mr7" />
            <router-link to="/delivery" class="underline cl-white2 fs14 lh17 weight-400">{{ $t('Worldwide shipping') }}</router-link>
          </li>
          <li class="bottom-xs flex item">
            <i class="trg-icons credit-card-ico fs18 mr7" />
            <router-link to="/payment" class="underline cl-white2 fs14 lh17 weight-400">{{ $t('Accept all cards') }}</router-link>
          </li>
          <li class="bottom-xs flex item item-last">
            <i class="trg-icons support-ico fs20 mr7"/>
            <router-link to="/order" class="underline cl-white2 fs14 lh17 weight-400">{{ $t('Multilingual support') }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LocationIcon from 'theme/components/theme/blocks/Header/LocationIcon'
import SelectLanguage from 'theme/components/theme/blocks/Header/SelectLanguage'
import LanguageList from 'theme/resource/languageList.json'
export default {
  components: {
    LocationIcon,
    SelectLanguage
  },
  data () {
    return {
      currentLocation: 'New York',
      LanguageList: LanguageList.language,
      LanguageSelect: 'English',
      isHidden: true
    }
  },
  methods: {
    changeLanguage (language, locale) {
      this.LanguageSelect = language
      this._i18n.locale = locale
      this.isHidden = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/variables/responsive';
@import '~theme/css/helpers/functions/color';
.mobile-top-panel.top-panel {
  height: auto;
  background-color: color(dark-blue);
  font-family: Helvetica;
  &>div {
    margin: 0;
  }
  .select-lang {
    display: inherit;
  }
  .language-title, .language-bar {
    display: none;
  }
  .wrapper {
    flex-direction: column;
    .links-left, .links-right {
      width: 100%;
      flex-basis: 100%;
      flex-direction: column;
      align-items: flex-start;
      .item {
        padding-top: 29px;
        &-last {
          padding-bottom: 20px;
        }
      }
    }
  }
}
.language {
    position: relative;

  .language-bar {
    border: 1px solid #CDCDCD;
    border-radius: 10px;
    background-color: #FFFFFF;
    position: absolute;
    min-width: 238px;
    z-index: 6;
    &::before, &::after {
        content: '';
        position: absolute;
        left: 20px;
        top: -20px;
        border: 10px solid transparent;
        border-bottom: 10px solid #CDCDCD;
    }
    &::after {
        border-bottom: 10px solid #FFFFFF;
        top: -19px;
    }
    span {
      color: #48475A;
      display: block;
      font-size: 14px;
      line-height: 100%;
      text-transform: none;
    }
  }
}

.location div {
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.language {
  position: relative;
  &-title {
    max-width: 160px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .language-bar {
    border: 1px solid #CDCDCD;
    border-radius: 10px;
    background-color: #FFFFFF;
    position: absolute;
    min-width: 238px;
    z-index: 6;
    &::before, &::after {
        content: '';
        position: absolute;
        left: 20px;
        top: -20px;
        border: 10px solid transparent;
        border-bottom: 10px solid #CDCDCD;
    }
    &::after {
        border-bottom: 10px solid #FFFFFF;
        top: -19px;
    }
    span {
      color: #48475A;
      display: block;
      font-size: 14px;
      line-height: 100%;
      text-transform: none;
    }
  }
}

.first-line {
    font-family: 'Helvetica';
    ul {
        list-style-type: none;
    }
}
.links-right {
  padding-left: 9%;
  @media ( max-width: $screen__xl ) {
      padding-left: 5px;
  }
}
.links-left {
  padding-right: 7%;
  @media ( max-width: $screen__xl ) {
      padding-right: 0;
  }
}
.language-title:after {
  content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #bdbdbd;
}

</style>
