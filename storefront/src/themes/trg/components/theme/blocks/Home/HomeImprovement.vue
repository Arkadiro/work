<template>
  <div class="home-improvement container mt25 mb0 cl-dark-blue col-xs-12">
    <div class="title fs30 weight-900 lh42 mb8">{{ $t('Home Improvement') }}</div>
    <div class="categories-list fs16">
      <div class="row center-xs">
        <div class="item col-xs-12 col-sm-6 col-md-3 pb16">
          <router-link :to="{path: '/magazine'}" class="item-link no-underline height-295 block relative">
            <div class="item-title fs16 lh30 weight-900 p19 absolute">
              <span>{{ $t('Tools') }}</span>
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
            <img class="item-image mw-100" src="/assets/home/improvement-block/drill.jpg" alt="">
          </router-link>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-3 pb16">
          <router-link :to="{path: '/magazine'}" class="item-link no-underline height-295 block relative">
            <div class="item-title fs16 lh30 weight-900 py14 px22 absolute">
              <span>{{ $t('Bath Faucets') }}</span>
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
            <img class="item-image mw-100" src="/assets/home/improvement-block/faucets.jpg" alt="">
          </router-link>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-3 pb16">
          <router-link :to="{path: '/magazine'}" class="item-link no-underline height-295 block relative">
            <div class="item-title fs16 lh30 weight-900 py14 px22 absolute">
              <span>{{ $t('Lawn Mower') }}</span>
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
            <img class="item-image mw-100" src="/assets/home/improvement-block/lawnmower.jpg" alt="">
          </router-link>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-3 pb16">
          <router-link :to="{path: '/magazine'}" class="item-link no-underline height-295 block relative">
            <div class="item-title fs16 lh30 weight-900 py14 px22 absolute">
              <span>{{ $t('Bath Faucets') }}</span>
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
            <img class="item-image mw-100" src="/assets/home/improvement-block/sander.jpg" alt="">
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

  .home-improvement {
    .item-title {
      z-index: 1;
      top:0;
      left: 0;
    }
    .arrow-down {
      transform: rotate(-90deg);
    }
  }
@media (max-width: ($screen__l - 1)) {
  .home-improvement {
    .item:nth-child(1n) {
      text-align: right;
      .item-title {
        left:80px;
      }
    }
    .item:nth-child(2n) {
      text-align: left;
      .item-title {
        left:0;
      }
    }
  }
}
@media (max-width: ($screen__m - 1)) {
  .home-improvement {
    margin-bottom: 35px;
    .item-image {
      display: none;
    }
    .item-link {
      height: auto;
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
      padding-bottom: 0;
      border-bottom: 1px solid $color-gray;
    }
    .item:first-child {
      border-top: 1px solid $color-gray;
    }
    .title {
      font-size: 20px;
    }
  }
}
</style>
