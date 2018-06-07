<template>
  <div id="product">
    <section class="bg-cl-white pb30 pt21 px0">
      <div class="container">
        <breadcrumbs :routes="breadcrumbs.routes" :active-route="productName"/>
        <section class="row py35 m0 data-wrapper">
          <div class="col-sm-12 mobile-title hidden-md fs20 lh27 weight-900 cl-dark-blue">
            <div class="row middle-md between-xs">
              <div class="col-xs-11">{{ productName | htmlDecode }}</div>
              <div class="col-xs-1">
                <add-to-favorite :product="product"/>
              </div>
            </div>
            <no-ssr>
              <vue-stars
                class="pb28"
                :name="`productId_${product.id}`"
                :active-color="'#FFDB5E'"
                :inactive-color="'#E1E1E1'"
                :max="5"
                :value="3"
                :readonly="true">
                <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                      <g id="Group" transform="translate(23.000000, 363.000000)">
                        <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                      </g>
                    </g>
                  </g>
                </svg>
                <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                      <g id="Group" transform="translate(23.000000, 363.000000)">
                        <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </vue-stars>
            </no-ssr>
          </div>
          <div class="col-xs-12 col-md-6 center-xs middle-xs w-50">
            <div class="row">
              <div class="col-md-2 col-sm-12 image-wrap relative">
                <div class="absolute zoom-btn" @click="toggleZoom">
                  <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs/>
                    <g id="desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="product" transform="translate(-427.000000, -233.000000)" stroke="#CDCDCD">
                        <g id="Лупа" transform="translate(429.000000, 235.000000)">
                          <circle id="Oval-2" stroke-width="2.72727273" cx="7.36363636" cy="7.36363636" r="7.36363636"/>
                          <path d="M13,13 L17.307965,17.3512172" id="Line" stroke-width="2.72727273" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.36363636,4.09090909 L7.36363636,10.6363636" id="Line-2" stroke-width="1.81818182" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10.5459679,7.36363636 L4.13929087,7.36363636" id="Line-2" stroke-width="1.81818182" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <no-ssr>
                  <carousel v-bind="config" class="row product-detail-slider">
                    <slide v-for="(slide, index) in imageSlides" v-if="isDesktop || (!isDesktop && slide.type !== '3d' && slide.type !== 'video')" :key="'a'+index" class="col-md-12">
                      <img :src="slide.thumbnail" @click="setActive(slide)" :class="{active : activeSlide.thumbnail === slide.thumbnail}">
                    </slide>
                  </carousel>
                </no-ssr>
              </div>
              <div class="col-md-10 full-image">
                <div class="wrapper-3d" v-if="activeSlide.type === '3d' && isDesktop">
                  <model-obj class="view-3d" :width="500" :height="500" :src="activeSlide.src"/>
                </div>

                <div>
                  <zoom-on-hover
                    :img-normal="activeSlide.src && !activeSlide.type ? activeSlide.src : null"
                    :img-zoom="activeSlide.src && !activeSlide.type ? activeSlide.src : null"
                    :scale="2"
                    :disabled="zoomDisabled"/>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xs-12 px15 data relative">
            <add-to-favorite :product="product" class="absolute favorite-desktop"/>
            <h1 class="mb0 mt0 product-name fs30 weight-900 lh42 cl-dark-blue">
              {{ productName | htmlDecode }}
            </h1>
            <no-ssr>
              <vue-stars
                class="pb28"
                :name="`productId_${product.id}`"
                :active-color="'#FFDB5E'"
                :inactive-color="'#E1E1E1'"
                :max="5"
                :value="3"
                :readonly="true">
                <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                      <g id="Group" transform="translate(23.000000, 363.000000)">
                        <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                      </g>
                    </g>
                  </g>
                </svg>
                <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                      <g id="Group" transform="translate(23.000000, 363.000000)">
                        <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </vue-stars>
            </no-ssr>

            <div class="row">
              <div class="col-md-6 about pr45">
                <div class="brand pb35">
                  <svg class="pr13" version="1.1" id="Layer_1" height="17" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 399.8 73.3" style="enable-background:new 0 0 399.8 73.3;" xml:space="preserve">
                    <path style="fill:#4A7EC0" d="M40.6,27.1c0,9.1-4.4,15.3-15.6,15.3h-3.5V13.3c1.3-0.1,2.4-0.1,3.5-0.1C35.6,13.3,40.6,18.3,40.6,27.1
                      M29.1,55.1c20,0,32.7-10.3,32.7-28.3C61.8,7.1,48.2,0,26.2,0C17.7,0,7.4,0.6,0,1.5v70.4h21.5V55.1H29.1z M316.8,27.1
                    c0,9.1-4.4,15.3-15.6,15.3h-3.5V13.3c1.2-0.1,2.4-0.1,3.5-0.1C311.8,13.3,316.8,18.3,316.8,27.1 M305.4,55.1
                    c20,0,32.6-10.3,32.6-28.3C338,7.1,324.5,0,302.4,0c-8.5,0-18.8,0.6-26.2,1.5v70.4h21.5V55.1H305.4z M366,19.4c0-3.8,3.8-5.6,10-5.6
                    c6.8,0,14.1,1.5,19.1,3.5l-1.8-15.3C387.7,0.9,382.7,0,373.6,0c-17.4,0-29.1,6.8-29.1,21.2c0,24.7,33.5,19.7,33.5,31.2
                    c0,4.4-3.2,6.8-11.2,6.8c-7,0-17.9-2.4-24.4-5.6l2.4,16.2c6.5,2.4,15.3,3.5,22.4,3.5c17.9,0,32.7-5.9,32.7-23.6
                    C399.8,26.2,366,30.6,366,19.4 M260.1,1.5h-21.5v70.4h21.5V1.5z M173,1.5h-21.5v70.4H173V1.5z M210.3,57.7V1.5h-21.5v70.4h38.8
                    l3.2-14.1H210.3z M135.6,1.5h-21.5v28H91.8v-28H70.3v70.4h21.5V44.2h22.4v27.7h21.5V1.5z"/>
                  </svg>
                  <router-link :to="{ name: 'home'}" class="no-underline default-underline fs14 weight-900 lh19 cl-dark-blue">
                    {{ $t('All product brand') }}
                  </router-link>
                </div>
                <div class="lh25 fs18 weight-900 cl-dark-blue">
                  {{ $t('About the product') }}
                </div>
                <ul class="about-list lh28 fs15 cl-gray2 pl0">
                  <li>Both models:</li>
                  <li>True Tone display</li>
                  <li>Wide color display (P3)</li>
                  <li>3D Touch</li>
                  <li>625 cd/m2 max brightness (typical)</li>
                  <li>Dual-domain pixels for wide viewing angles</li>
                  <li>Fingerprint-resistant oleophobic coating</li>
                  <li>+ all specification</li>
                </ul>
              </div>
              <div class="col-md-6 col-sm-12 params brdr-2 brdr-r-7 pt32 pb20 px20">
                <div class="param-name lh18 fs13 weight-900 cl-black2 pb4">
                  {{ $t('Size') }}
                </div>
                <size-selector
                  v-for="(s, i) in options.size"
                  :key="i"
                  :id="s.id"
                  :label="s.label"
                  context="product"
                  code="size"
                  class="mr10 mb10 px10 fs15 lh10"
                  :class="{ active: s.id == configuration.size.id }"
                  v-focus-clean
                />
                <div class="param-name lh18 fs13 weight-900 cl-black2 pb4">
                  {{ $t('Color') }}
                </div>
                <color-selector
                  v-for="(c, i) in options.color"
                  :key="i+'color'"
                  :id="c.id"
                  :label="c.label"
                  context="product"
                  code="color"
                  class="color-param"
                  :class="{ active: c.id == configuration.color.id }"
                />
                <div class="flex middle-md pt25 star-chat">
                  <i class="trg-icons shopping-cart-ico fs16 cl-blue pr13"/>
                  <span class="fs14 weight-900 lh19 cl-lightblue pr13">
                    {{ $t('NAME SUPERSHOP') }}
                  </span>
                  <router-link :to="{ name: 'home'}" class="cl-lightblue fs14 lh19 weight-900 blue-link">
                    {{ $t('Start chat') }}
                  </router-link>
                </div>
                <div class="flex middle-md pt5 pb28 shippping">
                  <i class="trg-icons delivery-truck-ico fs22 cl-blue weight-900 pr10"/>
                  <span class="cl-lightblue fs14 lh22 weight-900">3 - 5 days ($19,90)</span>
                </div>
                <div class="flex middle-md between-xs">
                  <div class="lh42 weight-900 fs30 cl-dark-blue">{{ priceProduct | price }}</div>
                  <div class="fs18">
                    <span class="lh22 weight-700 cl-suva-gray2 pr21">-</span>
                    <span class="cl-dark-blue lh30 weight-900 pr21">1</span>
                    <span class="lh22 weight-700 cl-suva-gray2">+</span>
                  </div>
                </div>
                <div class="py10">
                  <add-to-cart
                    :product="product"
                    class="add-to-cart brdr-r-5 fs16 weight-900 cl-white lh22 height-46 pb0 pt0"
                  />
                </div>
                <div class="align-center no-mobile">
                  <router-link :to="{ name: 'home'}" class="fs14 weight-900 lh19 cl-dark-blue no-underline default-underline">
                    from $100 to $159 — 27 Sellers Refurbished from 50$
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-lg-offset-6 align-center pt8 pb30 share" v-on-click-outside="closeSocial">
              <social-sharing :url="'https://trg.kt-team.de' + $route.path"
                              title="Best shop for me"
                              description="Some information about my favoutite product"
                              quote="Some information about my favourite product"
                              hashtags="trg,store, trgstore"
                              twitter-user="trg"
                              inline-template
                              v-show="showSocialShare">
                <div class="absolute bg-cl-white social-wrap">
                  <network network="facebook" class="mr20 pointer">
                    <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>Facebook</title>
                      <desc>Created with Sketch.</desc>
                      <defs/>
                      <g id="desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Facebook">
                          <circle id="Oval-4" fill="#EEEEEE" cx="25" cy="25" r="25"/>
                          <path d="M27.0290542,35.9079936 L27.0290542,26.3708033 L30.2218544,26.3708033 L30.6998631,22.6540039 L27.0290542,22.6540039 L27.0290542,20.2809386 C27.0290542,19.2048609 27.3271174,18.4714561 28.8662712,18.4714561 L30.8292588,18.4705474 L30.8292588,15.1462973 C30.4896077,15.1011662 29.3244426,15 27.9688594,15 C25.1386692,15 23.2010573,16.7320429 23.2010573,19.9130246 L23.2010573,22.6541049 L20,22.6541049 L20,26.3709042 L23.2009566,26.3709042 L23.2009566,35.9080946 L27.0290542,35.9079936 L27.0290542,35.9079936 L27.0290542,35.9079936 Z" id="f" fill="#666666"/>
                        </g>
                      </g>
                    </svg>
                  </network>
                  <network network="twitter" class="mr20 pointer">
                    <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>Twitter</title>
                      <desc>Created with Sketch.</desc>
                      <defs/>
                      <g id="desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Twitter">
                          <circle id="Oval-4" fill="#EEEEEE" cx="25" cy="25" r="25"/>
                          <path d="M32.3261369,18.5975614 C33.2067992,18.0842599 33.8814602,17.2708589 34.2000058,16.3027767 C33.3773759,16.7781708 32.4652496,17.1234594 31.4931656,17.3094087 C30.7161916,16.5032892 29.6082403,16 28.382464,16 C26.029649,16 24.1215106,17.8565483 24.1215106,20.1480135 C24.1215106,20.4726886 24.1590804,20.7894396 24.2313046,21.0935547 C20.689458,20.9202948 17.5493826,19.2689171 15.4475646,16.7596455 C15.0805578,17.3724804 14.870486,18.0850095 14.870486,18.845244 C14.870486,20.2841693 15.6229269,21.5537432 16.7662477,22.2974333 C16.0677137,22.2762309 15.4107099,22.0895856 14.8356666,21.7788312 L14.8356666,21.8312483 C14.8356666,23.8411927 16.3044088,25.5171459 18.2540775,25.8983071 C17.8959268,25.993825 17.5200639,26.0437256 17.1312193,26.0437256 C16.8562942,26.0437256 16.5895652,26.0184005 16.328997,25.9706951 C16.8713111,27.6181107 18.4451718,28.8172776 20.3094696,28.8511693 C18.8509586,29.9640275 17.0131742,30.6274055 15.0171347,30.6274055 C14.6733409,30.6274055 14.3335625,30.6074346 14,30.5682958 C15.8862455,31.7455643 18.1258561,32.4328218 20.532578,32.4328218 C28.3708575,32.4328218 32.6576641,26.1121515 32.6576641,20.6307964 C32.6576641,20.4508437 32.6535936,20.2722296 32.6446825,20.0942579 C33.4796339,19.5065339 34.2028112,18.7761755 34.773839,17.9441421 C34.0097365,18.2741713 33.1890319,18.4972783 32.3261369,18.5975614 Z" id="Shape" fill="#666666"/>
                        </g>
                      </g>
                    </svg>
                  </network>
                  <network network="pinterest" class="mr20 pointer">
                    <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>pint</title>
                      <desc>Created with Sketch.</desc>
                      <defs/>
                      <g id="desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="pint">
                          <circle id="Oval-4" fill="#EEEEEE" cx="25" cy="25" r="25"/>
                          <path d="M25.0000802,14 C18.925281,14 14,18.9247999 14,24.9999198 C14,29.5041037 16.7085077,33.3735149 20.584253,35.0748211 C20.5533041,34.3067117 20.5787206,33.3846597 20.7757191,32.5489599 C20.9872298,31.6559325 22.1911089,26.5551409 22.1911089,26.5551409 C22.1911089,26.5551409 21.8396869,25.852858 21.8396869,24.8147076 C21.8396869,23.1846801 22.7845095,21.9672508 23.961128,21.9672508 C24.9615945,21.9672508 25.4449101,22.7187632 25.4449101,23.6186058 C25.4449101,24.6244442 24.8034827,26.1289123 24.4735484,27.5223333 C24.1979751,28.6891701 25.0586104,29.6408881 26.2097322,29.6408881 C28.2938904,29.6408881 29.6974941,26.9641311 29.6974941,23.792593 C29.6974941,21.3817878 28.0737204,19.577292 25.120428,19.577292 C21.7837223,19.577292 19.7050163,22.0656297 19.7050163,24.8450953 C19.7050163,25.8033879 19.9875651,26.4792921 20.43015,27.0025366 C20.633723,27.2429115 20.6619459,27.3396869 20.5882619,27.615661 C20.5355045,27.8180314 20.4143549,28.3052757 20.3641632,28.4984256 C20.2909602,28.7769655 20.065258,28.8765471 19.8134175,28.7736781 C18.2765573,28.1462819 17.5607242,26.4632564 17.5607242,24.5712859 C17.5607242,21.446572 20.196029,17.6998338 25.4222998,17.6998338 C29.621966,17.6998338 32.3860373,20.738837 32.3860373,24.0010569 C32.3860373,28.3160998 29.9870986,31.5398341 26.4508288,31.5398341 C25.263306,31.5398341 24.14626,30.8978454 23.7635684,30.1687829 C23.7635684,30.1687829 23.1249472,32.703143 22.9896861,33.1925522 C22.7565273,34.0406796 22.2999913,34.8882458 21.8825823,35.5489161 C22.8719842,35.8410062 23.9169497,36 25.0000802,36 C31.0743983,36 35.9994388,31.0751199 35.9994388,24.9999198 C35.9994388,18.9247999 31.0743983,14 25.0000802,14" id="Fill-1" fill="#666666"/>
                        </g>
                      </g>
                    </svg>
                  </network>
                  <network network="googleplus" class="pointer">
                    <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>google-plus</title>
                      <desc>Created with Sketch.</desc>
                      <defs/>
                      <g id="desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="google-plus">
                          <circle id="Oval-4" fill="#EEEEEE" cx="25" cy="25" r="25"/>
                          <path d="M21.7750405,26.650424 L25.6825747,26.650424 C24.9966795,28.589255 23.1390261,29.9793417 20.9642138,29.9632985 C18.3253701,29.9438174 16.1434079,27.8332037 16.040963,25.1967646 C15.9311499,22.3706988 18.1988558,20.0365711 21.0014913,20.0365711 C22.2829534,20.0365711 23.4523646,20.524744 24.3339804,21.3246687 C24.5427999,21.5141863 24.8606685,21.5153868 25.0660495,21.3221039 L26.5012608,19.9715796 C26.72569,19.7603437 26.7265087,19.4036271 26.5027345,19.1916817 C25.1045823,17.8673505 23.229027,17.0418876 21.160753,17.0015067 C16.7493448,16.915397 13.0309271,20.5316197 13.000199,24.9429649 C12.9691981,29.3874335 16.5633939,33 21.0014913,33 C25.2695203,33 28.7561407,29.6588043 28.9896846,25.449964 C28.9959066,25.397196 29,23.6138316 29,23.6138316 L21.7750405,23.6138316 C21.4788944,23.6138316 21.2388557,23.8538254 21.2388557,24.1499159 L21.2388557,26.1143397 C21.2388557,26.4104303 21.478949,26.650424 21.7750405,26.650424 Z" id="Shape" fill="#666666" fill-rule="nonzero"/>
                          <path d="M34.7194499,24.2805501 L34.7194499,22.4484321 C34.7194499,22.2007501 34.5186999,22 34.2710178,22 L32.7289822,22 C32.4813001,22 32.2805501,22.2007501 32.2805501,22.4484321 L32.2805501,24.2805501 L30.4484321,24.2805501 C30.2007501,24.2805501 30,24.4813001 30,24.7289822 L30,26.2710178 C30,26.5186999 30.2007501,26.7194499 30.4484321,26.7194499 L32.2805501,26.7194499 L32.2805501,28.5515679 C32.2805501,28.7992499 32.4813001,29 32.7289822,29 L34.2710178,29 C34.5186999,29 34.7194499,28.7992499 34.7194499,28.5515679 L34.7194499,26.7194499 L36.5515679,26.7194499 C36.7992499,26.7194499 37,26.5186999 37,26.2710178 L37,24.7289822 C37,24.4813001 36.7992499,24.2805501 36.5515679,24.2805501 L34.7194499,24.2805501 Z" id="Shape" fill="#666666" fill-rule="nonzero"/>
                        </g>
                      </g>
                    </svg>
                  </network>
                </div>
              </social-sharing>
              <span class="mr30 pointer fs14 weight-900 share-btn cl-lightblue lh19" @click="showSocialShare = !showSocialShare">
                Share
              </span>
              <router-link :to="{ name: 'home'}" class="fs14 weight-900 cl-lightblue lh19 blue-link">
                Print
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section>
      <div class="product-detail-tabs fs16 no-underline lh25 weight-400 cl-dark-blue">
        <ul class="tabs-list container flex p0 pl8 mb0">
          <li @click="activeTab='first'" class="width-210" :class="{'active-tab': activeTab === 'first'}">
            <span>{{ $t('Prices from sellers') }}</span>
          </li>
          <li @click="activeTab='second'" class="width-160" :class="{'active-tab': activeTab === 'second'}">
            <span>{{ $t('About product') }}</span>
          </li>
          <li @click="activeTab='third'" class="width-170" :class="{'active-tab': activeTab === 'third'}">
            <span>{{ $t('Product reviews') }}</span>
          </li>
        </ul>

        <div class="tab-content" :class="{'active-tab': activeTab === 'first'}">
          <div class="container pt12 hidden tab-mobile px0 fs20 lh27 weight-400 cl-dark-blue" @click="activeTab='first'">
            <div class="row ml16 pb12 mr2 brdr-bottom brdr-cl-lightgray2 between-xs pr12">
              {{ $t('Prices from sellers') }}
              <div class="arrow height-10 width-12">
                <svg width="12px" height="7px" viewBox="0 0 12 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="futer-mob" transform="translate(-356.000000, -79.000000)" fill="#2F353D">
                      <path d="M359.287116,87.7166329 C358.937558,87.3383798 358.937558,86.7251709 359.287116,86.3469178 L362.836475,82.5133938 L359.262617,78.6527594 C358.912461,78.2751518 358.912461,77.6612974 359.262617,77.2836898 C359.612772,76.9054367 360.179833,76.9054367 360.529989,77.2836898 L364.737831,81.8285362 C365.08739,82.2067893 365.08739,82.8199982 364.737831,83.1982513 L360.555085,87.7166329 C360.380007,87.9057595 360.150554,88 359.9211,88 C359.691647,88 359.462193,87.9057595 359.287116,87.7166329 Z" id="Page-1" transform="translate(362.000000, 82.500000) rotate(90.000000) translate(-362.000000, -82.500000)"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div class="hidden" :class="{'active-tab': activeTab === 'first'}">
            <div class="container table-head pt18">
              <div class="row brdr-bottom mx2 brdr-cl-lightgray2 pt23 pb3">
                <div class="col-md-4 fs16 lh18 cl-dark-blue weight-400 pl0">
                  <input type="checkbox" id="available" class="available-checkbox" v-model="available">
                  <label class="pointer" for="available">Available in my region in the catalog</label>
                </div>
                <div class="pointer relative col-md-4 fs13 lh18 weight-900 cl-dark-blue"
                     @click="sortParam='delivery', sortDeliveryDirectionAsc = !sortDeliveryDirectionAsc"
                     :class="{'direction-asc': sortParam === 'delivery' && sortDeliveryDirectionAsc, 'direction-desc': sortParam === 'delivery' && !sortDeliveryDirectionAsc}">
                  {{ $t('Day delivery') }}
                </div>
                <div class="pointer relative col-md-3 fs13 lh18 weight-900 cl-dark-blue"
                     @click="sortParam='price', sortPriceDirectionAsc = !sortPriceDirectionAsc"
                     :class="{'direction-asc': sortParam === 'price' && sortPriceDirectionAsc, 'direction-desc': sortParam === 'price' && !sortPriceDirectionAsc}">
                  Price
                </div>
              </div>
            </div>
            <div class="row table-row" v-for="(shop, index) in sortedList" :key="'shop'+index">
              <div class="container" v-if="available && shop.available || !available">
                <div class="row shop py17 mx2 middle-xs relative brdr-bottom brdr-cl-lightgray2">
                  <div class="col-md-4 col-xs-8 fs16 lh30 weight-900 cl-dark-blue pl25">
                    {{ shop.name }}
                  </div>
                  <div class="col-md-4 col-xs-8 fs15 lh30 cl-gray2 weight-400">
                    Delivery: {{ shop.delivery.duration[0] }}
                    <template v-if="shop.delivery.duration.length > 1">
                      - {{ shop.delivery.duration[1] }} days
                    </template>
                    <template v-else>day</template>
                    <template v-if="shop.delivery.cost">
                      ({{ shop.delivery.cost }})
                    </template>
                  </div>
                  <div class="col-md-2 col-xs-8 lh25 fs18 weight-900 cl-dark-blue flex middle-md">
                    <span :class="{'cl-red mr16' : shop.sale}">
                      ${{ shop.price }}
                    </span>
                    <template v-if="shop.sale" >
                      <span class="fs15 lh30 cl-dark-blue weight-400 sale-price mr13">
                        {{ shop.sale.oldprice }}
                      </span>
                      <span class="lh25 fs14 weight-900 cl-white bg-cl-red px7">{{ shop.sale.perecent }}% </span>
                    </template>
                  </div>
                  <div class="col-md-2 pr25 buy-now">
                    <button-full class="brdr-r-5 cl-white fs14 lh19 pt7 pb7 brdr-1 brdr-cl-silver3">
                      {{ $t('Buy now') }}
                    </button-full>
                  </div>
                </div>
              </div>
            </div>
            <div class="container pagination pt21">
              <div class="row middle-md center-md weight-900 fs13 lh18 cl-black2">
                <div class="mr22 active pointer">1</div>
                <div class="mr22 pointer">2</div>
                <div class="mr22 pointer">3</div>
                <div class="mr22 pointer">...</div>
                <div class="mr22 pointer">39</div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" :class="{'active-tab': activeTab === 'second'}">
          <div class="container pt12 hidden tab-mobile px0 fs20 lh27 weight-400 cl-dark-blue" @click="activeTab='second'">
            <div class="row ml16 pb12 mr2 brdr-bottom brdr-cl-lightgray2 between-xs pr12">
              {{ $t('About product') }}
              <div class="arrow height-10 width-12">
                <svg width="12px" height="7px" viewBox="0 0 12 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="futer-mob" transform="translate(-356.000000, -79.000000)" fill="#2F353D">
                      <path d="M359.287116,87.7166329 C358.937558,87.3383798 358.937558,86.7251709 359.287116,86.3469178 L362.836475,82.5133938 L359.262617,78.6527594 C358.912461,78.2751518 358.912461,77.6612974 359.262617,77.2836898 C359.612772,76.9054367 360.179833,76.9054367 360.529989,77.2836898 L364.737831,81.8285362 C365.08739,82.2067893 365.08739,82.8199982 364.737831,83.1982513 L360.555085,87.7166329 C360.380007,87.9057595 360.150554,88 359.9211,88 C359.691647,88 359.462193,87.9057595 359.287116,87.7166329 Z" id="Page-1" transform="translate(362.000000, 82.500000) rotate(90.000000) translate(-362.000000, -82.500000)"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div class="hidden" :class="{'active-tab': activeTab === 'second'}">
            <div class="container about-product">
              <div class="row fs14 lh24 cl-gray2 weight-400 pt22">
                <div class="col-md-12 col-sm-12" v-html="productDescription"/>
              </div>
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <img src="/assets/product/about_1.jpg" alt="image" class="mt42 w-100">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" :class="{'active-tab': activeTab === 'third'}">
          <div class="container pt12 hidden tab-mobile px0 fs20 lh27 weight-400 cl-dark-blue" @click="activeTab='third'" >
            <div class="row ml16 pb12 mr2 brdr-bottom brdr-cl-lightgray2 between-xs pr12">
              {{ $t('Product reviews') }}
              <div class="arrow height-10 width-12">
                <svg width="12px" height="7px" viewBox="0 0 12 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="futer-mob" transform="translate(-356.000000, -79.000000)" fill="#2F353D">
                      <path d="M359.287116,87.7166329 C358.937558,87.3383798 358.937558,86.7251709 359.287116,86.3469178 L362.836475,82.5133938 L359.262617,78.6527594 C358.912461,78.2751518 358.912461,77.6612974 359.262617,77.2836898 C359.612772,76.9054367 360.179833,76.9054367 360.529989,77.2836898 L364.737831,81.8285362 C365.08739,82.2067893 365.08739,82.8199982 364.737831,83.1982513 L360.555085,87.7166329 C360.380007,87.9057595 360.150554,88 359.9211,88 C359.691647,88 359.462193,87.9057595 359.287116,87.7166329 Z" id="Page-1" transform="translate(362.000000, 82.500000) rotate(90.000000) translate(-362.000000, -82.500000)"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div class="hidden" :class="{'active-tab': activeTab === 'third'}">
            <div class="container pt12">
              <div class="reviews pr8 mr8 pt32">

                <div class="row hidden filter">
                  <div class="lh34 col-xs-12 fs16 weight-900 cl-dark-blue">15 reviews</div>
                  <div class="col-xs-12 filter-select pr0">
                    <select class="w-100 bg-cl-white brdr-r-5 height-30 no-outline weight-400 fs15 lh30 cl-gray2" name="rew">
                      <option value="popular">Popular</option>
                      <option value="funny">Funny</option>
                      <option value="nopopular">No popular</option>
                    </select>
                  </div>
                </div>

                <div class="row fs14 lh24 cl-gray2 weight-400 pt22 relative">
                  <div class="col-md-3 col-xs-8">
                    <div class="fs18 weight-900 lh25 cl-dark-blue review-author">Konstantin Konstantinov</div>
                    <div class="lh20 fs14 weight-400 cl-gray2 review-date">21.12.2017 (15:37)</div>
                  </div>

                  <div class="col-md-8 col-xs-12">
                    <div class="fs18 lh25 weight-900 cl-dark-blue pb7 review-title">This is a great product and seller.</div>
                    <div class="lh20 fs14 cl-gray2 weight-400 review-text">
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s.
                    </div>
                    <no-ssr>
                      <vue-stars
                        class="pb18"
                        :name="`productId_${product.id}`"
                        :active-color="'#FFDB5E'"
                        :inactive-color="'#E1E1E1'"
                        :max="5"
                        :value="3"
                        :readonly="true">
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </vue-stars>
                    </no-ssr>
                  </div>
                </div>

                <div class="row fs14 lh24 cl-gray2 weight-400 pt22 relative">
                  <div class="col-md-3 col-xs-8">
                    <div class="fs18 weight-900 lh25 cl-dark-blue review-author">Andrey Putin</div>
                    <div class="lh20 fs14 weight-400 cl-gray2 review-date">21.12.2017 (15:37)</div>
                  </div>

                  <div class="col-md-8 col-xs-12">
                    <div class="fs18 lh25 weight-900 cl-dark-blue pb7 review-title">This is a great product and seller.</div>
                    <div class="lh20 fs14 cl-gray2 weight-400 review-text">
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s.
                    </div>
                    <no-ssr>
                      <vue-stars
                        class="pb18"
                        :name="`productId_${product.id}`"
                        :active-color="'#FFDB5E'"
                        :inactive-color="'#E1E1E1'"
                        :max="5"
                        :value="3"
                        :readonly="true">
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </vue-stars>
                    </no-ssr>
                  </div>
                </div>

                <div class="row fs14 lh24 cl-gray2 weight-400 pt22 relative">
                  <div class="col-md-3 col-xs-8">
                    <div class="fs18 weight-900 lh25 cl-dark-blue review-author">Artem Malgin</div>
                    <div class="lh20 fs14 weight-400 cl-gray2 review-date">21.12.2017 (15:37)</div>
                  </div>

                  <div class="col-md-8 col-xs-12">
                    <div class="fs18 lh25 weight-900 cl-dark-blue pb7 review-title">This is a great product and seller.</div>
                    <div class="lh20 fs14 cl-gray2 weight-400 review-text">
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s.
                    </div>
                    <no-ssr>
                      <vue-stars
                        class="pb18"
                        :name="`productId_${product.id}`"
                        :active-color="'#FFDB5E'"
                        :inactive-color="'#E1E1E1'"
                        :max="5"
                        :value="3"
                        :readonly="true">
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </vue-stars>
                    </no-ssr>
                  </div>
                </div>

                <div class="row fs14 lh24 cl-gray2 weight-400 pt22 relative">
                  <div class="col-md-3 col-xs-8">
                    <div class="fs18 weight-900 lh25 cl-dark-blue review-author">Konstantin Konstantinov</div>
                    <div class="lh20 fs14 weight-400 cl-gray2 review-date">21.12.2017 (15:37)</div>
                  </div>

                  <div class="col-md-8 col-xs-12">
                    <div class="fs18 lh25 weight-900 cl-dark-blue pb7 review-title">This is a great product and seller.</div>
                    <div class="lh20 fs14 cl-gray2 weight-400 review-text">
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s.
                    </div>
                    <no-ssr>
                      <vue-stars
                        class="pb18"
                        :name="`productId_${product.id}`"
                        :active-color="'#FFDB5E'"
                        :inactive-color="'#E1E1E1'"
                        :max="5"
                        :value="3"
                        :readonly="true">
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </vue-stars>
                    </no-ssr>
                  </div>
                </div>

                <div class="row fs14 lh24 cl-gray2 weight-400 pt22 relative">
                  <div class="col-md-3 col-xs-8">
                    <div class="fs18 weight-900 lh25 cl-dark-blue review-author">Konstantin Konstantinov</div>
                    <div class="lh20 fs14 weight-400 cl-gray2 review-date">21.12.2017 (15:37)</div>
                  </div>

                  <div class="col-md-8 col-xs-12">
                    <div class="fs18 lh25 weight-900 cl-dark-blue pb7 review-title">This is a great product and seller.</div>
                    <div class="lh20 fs14 cl-gray2 weight-400 review-text">
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s.
                    </div>
                    <no-ssr>
                      <vue-stars
                        class="pb18"
                        :name="`productId_${product.id}`"
                        :active-color="'#FFDB5E'"
                        :inactive-color="'#E1E1E1'"
                        :max="5"
                        :value="3"
                        :readonly="true">
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <svg width="18px" height="18px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                          <defs/>
                          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#E1E1E1">
                              <g id="Group" transform="translate(23.000000, 363.000000)">
                                <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </vue-stars>
                    </no-ssr>
                  </div>
                </div>

                <div class="row hidden show-reviews brdr-bottom brdr-cl-lightgray2 pb42 pt20 middle-xs">
                  <div class="col-xs-2 brdr-bottom brdr-cl-lightgray2"/>
                  <div class="col-xs-8">
                    <button-full class="brdr-r-5 cl-dark-blue fs14 lh19 brdr-1 brdr-cl-yellow">
                      {{ $t('Show more') }}
                    </button-full>
                  </div>
                  <div class="col-xs-2 brdr-bottom brdr-cl-lightgray2"/>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="product-description pt42">
      <div class="container">
        <div class="row px8 product-description-title fs30 weight-900 lh42 cl-dark-blue pb12">{{ $t('Product description') }}</div>
        <div class="row">
          <div class="col-md-6 col-xs-12 fs18 weight-900 lh25 cl-dark-blue">
            <div class="lh25 weight-900 cl-dark-blue fs18 product-description-title_column">{{ $t('General characteristic') }}</div>
            <div class="row px8 lh30 fs14 cl-dark-blue weight-400 product-description-properties" v-for="(characteristic, name, index) in productDescriptionTab.general" :key="index+'characteristic'">
              <div class="product-description-property">{{ name }}</div>
              <div class="col-md col-xs border-dotted brdr-cl-dark-blue height-20"/>
              <div class="product-description-property align-right">{{ characteristic }}</div>
            </div>
          </div>
          <div class="col-md-6 col-xs-12 fs18 weight-900 lh25 cl-dark-blue">
            <div class="lh25 weight-900 cl-dark-blue fs18 product-description-title_column">{{ $t('Peculiar properties') }}</div>
            <div class="row px8 lh30 fs14 cl-dark-blue weight-400 product-description-properties" v-for="(property, name, index) in productDescriptionTab.properties" :key="index+'property'">
              <div class="product-description-property">{{ name }}</div>
              <div class="col-md col-xs border-dotted brdr-cl-dark-blue height-20"/>
              <div class="product-description-property align-right">{{ property }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <similar-product category="electronics" class="mt43 similar-product"/>
    <products-slider
      :products="products"
      :config="sliderAccesoriesConfig"
      title="Accessories"
      :accessories="true"
      class="accessories pb25"
      v-if="products.length"
    />
    <newsletter/>
    <watched-products/>
  </div>
</template>

<script>
import { corePage, themeComponent } from 'core/lib/themes'
import Composite from 'core/mixins/composite'
import AddToCart from '../components/core/AddToCart.vue'
import GenericSelector from 'core/components/GenericSelector.vue'
import ColorSelector from '../components/core/ColorSelector.vue'
import SizeSelector from '../components/core/SizeSelector.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import ProductAttribute from '../components/core/ProductAttribute.vue'
import ProductTile from '../components/core/ProductTile.vue'
import ProductLinks from '../components/core/ProductLinks.vue'
import focusClean from 'theme/components/theme/directives/focusClean'
import ZoomOnHover from 'theme/components/theme/blocks/Product/ZoomOnHover.vue'
import VueStars from 'vue-stars'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
// import slides from 'theme/resource/product_detail_slider.json'
import shops from 'theme/resource/shops_list.json'
import productDescriptionTab from 'theme/resource/product_description.json'
// import productDescription from 'theme/resource/product_description.json'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import AddToFavorite from 'theme/components/theme/blocks/Product/AddToFavorite'
import WatchedProducts from '../components/theme/blocks/Home/WatchedProducts.vue'
import Newsletter from '../components/core/blocks/Newsletter/Newsletter.vue'
import SimilarProduct from '../components/theme/blocks/Product/SimilarProduct.vue'
import ProductsSlider from 'theme/components/core/ProductsSlider.vue'
import builder from 'bodybuilder'
import SocialSharing from 'vue-social-sharing'
import { mixin as onClickOutside } from 'vue-on-click-outside'
import { ModelObj } from 'vue-3d-model'
import AdaptiveWidthClient from 'theme/components/theme/AdaptiveWidthClient'

export default {
  data () {
    return {
      showSocialShare: false,
      config: {
        perPage: 6,
        navigationNextLabel: '',
        navigationPrevLabel: '',
        paginationSize: 7,
        perPageCustom: [[320, 1], [768, 1], [1024, 6], [1200, 6], [2560, 6]],
        navigationEnabled: true,
        paginationEnabled: true,
        paginationActiveColor: '#2F2F2F',
        paginationColor: '#9EA19A',
        loop: false,
        scrollPerPage: false
      },
      activeSlide: {src: '', thumbnail: ''},
      zoomDisabled: true,
      sortParam: '',
      sortPriceDirectionAsc: false,
      sortDeliveryDirectionAsc: false,
      available: false,
      activeTab: 'first',
      sliderAccesoriesConfig: {
        perPage: 4,
        perPageCustom: [[320, 2], [768, 2], [1024, 3], [1200, 4], [2560, 4]],
        paginationEnabled: true,
        navigationEnabled: true,
        loop: true,
        navigationNextLabel: '',
        navigationPrevLabel: '',
        paginationActiveColor: '#2F2F2F',
        paginationColor: '#9EA19A',
        paginationSize: 7,
        paginationPadding: 3
      },
      products: []
    }
  },
  asyncData ({ store, route }) {
    // this is for SSR purposes to prefetch data
  },
  computed: {
    shops () {
      return shops
    },
    productDescriptionTab () {
      return productDescriptionTab
    },
    productDescription () {
      if (this.product.values) {
        let description = this.product.values['description-textarea-raw']
          ? (this.product.values['description-textarea-raw']['ecommerce']
            ? this.product.values['description-textarea-raw']['ecommerce']['en_US'] : '') : ''
        description = description === '' ? this.product.values['description-textarea']
          ? (this.product.values['description-textarea']['ecommerce']
            ? this.product.values['description-textarea']['ecommerce']['en_US'] : '') : '' : description
        return description
      } else {
        return ''
      }
    },
    sortedList () {
      let self = this
      switch (this.sortParam) {
        case 'price': return shops.sort(function (d1, d2) {
          if (self.sortPriceDirectionAsc) {
            return (d1.price > d2.price) ? 1 : -1
          } else {
            return (d1.price < d2.price) ? 1 : -1
          }
        })
        case 'delivery': return shops.sort(function (d1, d2) {
          if (self.sortDeliveryDirectionAsc) {
            return (d1.delivery.duration[0] > d2.delivery.duration[0]) ? 1 : -1
          } else {
            return (d1.delivery.duration[0] < d2.delivery.duration[0]) ? 1 : -1
          }
        })
        default: return shops
      }
    }
  },
  beforeMount () {
    let self = this
    this.setActive(this.imageSlides[0])
    let inspirationsQuery = builder().query('match', 'category.name', 'Tees').build()

    self.$store.dispatch('product/list', {
      query: inspirationsQuery,
      size: 12,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        self.products = res.items
      }
    })
  },
  watch: {
    imageSlides (val, oldVal) {
      this.setActive(this.imageSlides[0])
    }
  },
  directives: { focusClean },
  methods: {
    showDetails (event) {
      const details = this.$refs.details
      details.style.maxHeight = `${details.children[0].offsetHeight}px`
      event.target.classList.add('hidden')
    },
    setActive (slide) {
      this.activeSlide = slide
    },
    toggleZoom () {
      this.zoomDisabled = !this.zoomDisabled
    },
    closeSocial () {
      this.showSocialShare = false
    }
  },
  components: {
    AddToCart,
    GenericSelector,
    ColorSelector,
    SizeSelector,
    Breadcrumbs,
    ProductAttribute,
    ProductTile,
    ProductLinks,
    ZoomOnHover,
    VueStars,
    'no-ssr': NoSSR,
    Carousel,
    Slide,
    ButtonFull,
    AddToFavorite,
    WatchedProducts,
    Newsletter,
    ProductsSlider,
    SimilarProduct,
    SocialSharing,
    ModelObj
  },
  mixins: [corePage('Product'), Composite, themeComponent('theme/ProductModel'), onClickOutside, AdaptiveWidthClient]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/responsive';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.mobile-title {
  @media (max-width: $screen__l ) {
    display: block;
    .vue-stars {
      display: flex;
    }
  }
}
.data-wrapper {
  @media (max-width: $screen__l ) {
    padding-top: 21px;
    padding-bottom: 0;
  }
}

.about-list {
  list-style: none;
}

.params {
  border: 2px solid color(lightgray2);

  .size-selector {
    border-radius: 5px;
    border: 1px solid color(gray4);
    height: 30px;
    min-width: 40px;
    width: auto;

    @media (max-width: $screen__l ) {
      height: 37px;
    }
  }
  @media (max-width: $screen__l ) {
    padding-top: 15px;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 7px;
    .param-name {
      padding-top: 10px;
    }
    .star-chat {
      padding-top: 20px;
    }
    .shipping {
      padding-bottom: 16px;
    }
  }
  .color-param {
    border-radius: 7px;
    height: 30px;
    width: 30px;
    &.active {
      border-color: color(night-rider2);
    }
    @media (max-width: $screen__l ) {
      height: 34px;
      width: 34px;
    }
  }
}
.share {
  .share-btn {
    text-decoration: underline;
  }
  .social-wrap {
    z-index: 1;
  }
  @media (max-width: $screen__l ) {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.blue-link:after, .blue-link:hover:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: color(lightblue);
}

.add-to-cart {
  background-color: color(lightblue);
}

.default-underline {
  text-decoration: underline;
}

.zoom-btn {
  left: 82px;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
}
.product-detail-tabs {
  .tab-content {
    box-shadow: 0px -14px 30px -10px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: $screen__l ) {
    .tab-content:not(:nth-child(2)) {
      box-shadow: none;
    }
  }

  .tabs-list {
    list-style-type: none;
    @media (max-width: $screen__l ) {
      display: none;
    }
    li {
      &:hover {
        cursor: pointer;
      }

      &.active-tab span{
        border-bottom: 4px solid color(lightblue);
        font-size: 18px;
        font-weight: 900;
      }
    }
  }

  .hidden.active-tab {
    display: block;
  }

  .table-row:hover {
    background-color: color(white2);
  }
  .table-row {
    @media (max-width: $screen__l ) {
      display: block;
      padding-left: 14px;

      .shop {
        padding-top: 5px;
        padding-bottom: 5px;

        div {
          padding-left: 0;
        }
      }
    }
  }
  .tab-mobile {
    @media (max-width: $screen__l ) {
      display: block;
    }
  }
  .shop-name {
    @media (max-width: $screen__l ) {
      padding-left: 0;
    }
  }
}
.pagination {
  @media (max-width: $screen__l ) {
    display: none;
  }
  .active {
    padding-top: 9px;
    padding-bottom: 9px;
    width: 35px;
    border-radius: 5px;
    background-color: color(silver4);
    font-size: 16px;
  }
}

.buy-now > button {
  max-width: 90px;
  margin-left: auto;
  color: color(lightblue);
  background-color: color(white);
  &:hover {
    background-color: color(lightblue);
    color: color(white);
    border-color: color(lightblue);
  }
}

.table-head {
  @media (max-width: $screen__l ) {
    display: none;
  }
}
.sale-price {
  text-decoration: line-through;
}
.arrow {
  float: right;
  svg {
    transform: none;
  }
}
.active-tab .arrow {
  svg {
    transform: rotate(180deg);
  }
}
.border-dotted {
  border-bottom: 1px dotted;
}

.reviews {
  max-height: 543px;
  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  .vue-stars {
    display: flex;
  }

  &::-webkit-scrollbar-thumb {
    background-color: color(silver3);
  }
  @media (max-width: $screen__l ) {
    max-height: none;
    padding-left: 8px;
    padding-top: 0;
    .review-author {
      font-size: 14px;
    }
    .review-date {
      font-size: 12px;
    }
    .review-title {
      font-size: 14px;
    }
    .vue-stars {
      position: absolute;
      top: 20px;
      right: 0;
    }
    .show-reviews {
      display: flex;
      button {
        background-color: color(white);
      }
    }
    .filter {
      display: flex;
    }

  }
}

.direction-asc:before, .direction-desc:before {
  content: '';
  background: url(/assets/icons/triangle.svg) no-repeat center center;
  height: 9px;
  width: 9px;
  position: absolute;
  left: -11px;
  top: 4px;
}
.direction-desc:before {
  transform: rotate(180deg);
}

.available-checkbox {
  display: none;
  &+label {
    position: relative;
    padding: 0 0 0 28px;
  }
  &+label:before {
    content: '';
    position: absolute;
    left: 0;
    top: -2px;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: 1px solid color(silver3);
  }
  &:checked + label:before {
    content: '';
    position: absolute;
    left: 0;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border: 1px solid color(lightblue);
    background: url(/assets/icons/сheck.svg) no-repeat center center;
    background-color: color(lightblue);
  }
  &:checked + label {
    color: color(dark-blue);
  }
}
.favorite-desktop {
  left: 5px;
  top: -25px;
  z-index: 2;
}
@media (max-width: $screen__l ) {
  .about, .zoom-btn, .full-image, .product-name, .vue-stars {
    display: none;
  }
  .params {
    border: none;
  }
  .favorite {
    margin-top: -34px;
  }
  .about-product {
    padding-right: 14px;
    padding-left: 14px;
    img {
      margin-top: 10px;
    }
  }
  .buy-now {
    position: absolute;
    right: 10px;
    padding-right: 0;
  }
  .favorite-desktop {
    display: none;
  }
  .product-description {
    padding-top: 36px;
    padding-left: 8px;
    &-title {
      font-size: 20px;
      line-height: 27px;
      padding-bottom: 0;
    }
    &-title_column {
      padding-top: 15px;
      font-size: 16px;
      line-height: 22px;
    }
    .border-dotted {
      border: none;
      display: none;
    }
    &-properties {
      font-size: 14px;
      line-height: 19px;
      padding-top: 15px;
    }
    &-property {
      width: 50%
    }
  }
  .similar-product {
    margin-top: 30px;
  }
}
@media (max-width: $screen__m ) {
  .favorite {
    margin-top: -12px;
  }
  .accessories {
    padding-bottom: 0;
  }
}
</style>

<style lang="scss">
@import '~theme/css/variables/responsive';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
.params .color-param {
  .color-inside {
    border-radius: 5px;
    height: 25px;
    width: 25px;
    @media (max-width: $screen__l ) {
      height: 30px;
      width: 30px;
    }
  }
}

</style>

<style lang="scss">
#product {
  .zoom-on-hover {
    .normal {
      max-width: 100%;
      max-height: 500px;
      width: auto;
    }
  }
  .full-image {
    .wrapper-3d .view-3d {
      canvas {
        max-width: 100%;
        min-height: 100%;
        height: auto !important;
      }
    }
  }
}
</style>
