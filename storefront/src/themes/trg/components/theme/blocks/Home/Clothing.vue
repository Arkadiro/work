<template>
  <div class="clothing-block container mt25 mb21 cl-dark-blue col-xs-12">
    <div class="title fs30 weight-900 lh42 mb8">{{ $t('Clothing, Shoes & Accessories') }}</div>
    <div class="categories-list fs16">
      <div class="row center-xs">
        <div class="item col-xs-12 col-lg-6 pb16">
          <div class="item-half-block col-xs-12 pb11 px0">
            <router-link :to="{path: '/magazine'}" class="item-link no-underline height-298 mw-100 block relative">
              <div class="item-title fs16 lh30 weight-900 p19 absolute">
                <span>{{ $t('Product category') }}</span>
                <div class="no-desktop arrow-down pt10 height-10 width-12" @click="showItems('showBuyers')">
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
              <img class="item-image mw-100" src="/assets/products/9.jpg" alt="">
            </router-link>
          </div>
          <div class="item-min-block col-xs-12 px0 flex between-xs">
            <router-link :to="{path: '/magazine'}" class="item-link no-underline height-295 block relative mw-100 mr1">
              <div class="item-title fs16 lh30 weight-900 cl-white p19 absolute">
                <span>{{ $t('Product category') }}</span>
                <div class="no-desktop arrow-down pt10 height-10 width-12" @click="showItems('showBuyers')">
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
              <img class="item-image mw-100" src="/assets/products/10.jpg" alt="">
            </router-link>
            <router-link :to="{path: '/magazine'}" class="item-link no-underline height-295 block relative mw-100">
              <div class="item-title fs16 lh30 weight-900 p19 absolute">
                <span>{{ $t('Product category') }}</span>
                <div class="no-desktop arrow-down pt10 height-10 width-12" @click="showItems('showBuyers')">
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
              <img class="item-image mw-100" src="/assets/products/11.jpg" alt="">
            </router-link>
          </div>
        </div>
        <div class="item col-xs-12 col-lg-6 pb16">
          <router-link :to="{path: '/magazine'}" class="item-link no-underline height-604 block relative width-604 mw-100">
            <div class="product-promotion fs14 absolute bg-cl-blue2 pl13 pr15 py6 brdr-r-top-left-20 brdr-r-bottom-left-20">
              <span class="product-promotion-text weight-900 cl-white">
                <svg width="14px" height="14px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs/>
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#fff">
                      <g id="Group" transform="translate(23.000000, 364.000000)">
                        <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                      </g>
                    </g>
                  </g>
                </svg>
                {{ $t('Promoted product') }}
              </span>
            </div>
            <div class="item-title fs16 lh30 weight-900 cl-white p19 absolute">
              <span>{{ $t('Product category') }}</span>
              <div class="no-desktop arrow-down pt10 height-10 width-12" @click="showItems('showBuyers')">
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
            <img class="item-image mw-100" src="/assets/products/12.jpg" alt="">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '~theme/css/variables/responsive';
  @import '~theme/css/helpers/functions/color';
  @import '~theme/css/variables/colors';
  $color-gray: color(lightgray4);
  $color-black: color(dark-blue);

  .clothing-block {
    .item-title {
      z-index: 1;
      top:0;
      left: 0;
    }
    .arrow-down {
      transform: rotate(-90deg);
    }
    .product-promotion {
      top: 20px;
      right: 0;
    }
  }
  @media (max-width: ($screen__xxl - 1)) {
    .clothing-block {
      .item-half-block {
        padding-bottom: 0;
      }
    }
  }
  @media (max-width: ($screen__xl - 1)) {
    .clothing-block {
      .item-half-block,
      .item:last-child {
        display: flex;
        justify-content: space-around;
      }
      .item-half-block {
        padding-bottom: 10px;
      }
      .item-min-block {
        justify-content: center;
        .item-link:first-child {
          padding-right: 15px;
        }
      }
    }
  }
  @media (max-width: ($screen__l - 1)) {
    .clothing-block {
      .item-title {
        left:0;
      }
    }
  }
  @media (max-width: ($screen__m - 1)) {
    .clothing-block {
      margin-bottom: 35px;
      .item-min-block {
        flex-wrap: wrap;
        .item-link:first-child {
          padding-right: 0;
        }
      }
      .title {
        font-size: 20px;
      }
      .item-image,
      .product-promotion {
        display: none;
      }
      .item-link {
        height: auto;
        width: 100%;
        border-bottom: 1px solid $color-gray;
      }
      .item-title {
        position: static;
        display: flex;
        justify-content: space-between;
        padding-left: 80px;
        font-size: 16px;
        line-height: 22px;
        padding-top: 17px;
        padding-bottom: 16px;
      }
      .item {
        padding: 0;
      }
      .item-half-block {
        padding-bottom: 0;
      }
      .item:first-child {
        border-top: 1px solid $color-gray;
      }
      .item-title span {
        color: $color-black;
      }
    }
  }
</style>

