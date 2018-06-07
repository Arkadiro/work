<template>
  <div id="styleguide" class="styleguide">
    <div class="container cl-dark-blue">
      <h1 class="mb10 weight-900 fs40">Style Guide</h1>
      <div class="breadcrumbs-container pb25">
        <h2 class="weight-900 fs18 lh42">Breadcrumbs</h2>
        <div class="breadcrumbs h5 cl-accent hidden-xs fs15 lh18 cl-gray3">
          <span class="fs14 no-underline pointer">Home</span> -
          <span class="fs14 no-underline cl-silver3">Category</span>
        </div>
      </div>
      <div class="modals-container pb35">
        <h2 class="weight-900 fs18 lh42">Modals</h2>
        <button class="bg-cl-blue cl-white brdr-round4 brdr-none py12 px50" @click="visibleModal = !visibleModal"><span class="fs16 weight-900">Open modal</span></button>
        <div :class="[ visibleModal ? 'sg-modal-wrapper' : 'sg-modal-wrapper-hide' ]" @click="visibleModal = !visibleModal">
          <div class="sg-modal width-700 height-120 relative  bg-cl-white" :class="[ visibleModal ? 'modal-show' : '' ]">
            <i slot="close"
               class="btn-close material-icons p15 cl-bg-dark-blue absolute pointer"
               @click.stop="visibleModal = !visibleModal"
            >
              close
            </i>
            <p class="p15 cl-dark-blue fs16">some text</p>
          </div>
        </div>
      </div>
      <div class="links-container pb35">
        <h2 class="weight-900 fs18 lh42">Links</h2>
        <span class="pointer weight-900 cl-blue brdr-bottom brdr-cl-blue fs14 lh19">confirm order</span>
      </div>
      <div class="buttons-container pb35">
        <h2 class="weight-900 fs18 lh42">Buttons</h2>
        <div class="py15">
          <h3 class="weight-900 fs18 lh25">Button group 1</h3>
          <button class="bg-cl-blue cl-white brdr-round4 brdr-none py12 px50 mr15"><span class="fs16 weight-900">Button</span></button>
          <button class="bg-cl-white cl-blue brdr-round4 brdr-1 brdr-cl-blue py12 px50 mr15"><span class="fs16 weight-900">Hover</span></button>
          <button class="bg-cl-white cl-blue brdr-round4 brdr-1 brdr-cl-blue py12 px50 mr15"><span class="fs16 weight-900">Active</span></button>
        </div>
        <div class="py15">
          <h3 class="weight-900 fs18 lh25">Button group 2</h3>
          <button class="bg-cl-white cl-blue brdr-round4 brdr-1 brdr-cl-blue py12 px50 mr15"><span class="fs14">Button</span></button>
          <button class="bg-cl-blue cl-white brdr-round4 brdr-none py12 px50 mr15"><span class="fs14">Hover</span></button>
          <button class="bg-cl-blue cl-white brdr-round4 brdr-none py12 px50 mr15"><span class="fs14">Active</span></button>
        </div>
        <div class="py15">
          <h3 class="weight-900 fs18 lh25">Button group 3</h3>
          <button class="bg-cl-yellow2 cl-dark-blue brdr-round4 brdr-none py12 px50 mr15"><span class="fs14 weight-900">Button</span></button>
          <button class="bg-cl-white cl-dark-blue brdr-round4 brdr-1 brdr-cl-yellow2 py12 px50 mr15"><span class="fs14 weight-900">Hover</span></button>
          <button class="bg-cl-white cl-dark-blue brdr-round4 brdr-1 brdr-cl-yellow2  py12 px50 mr15"><span class="fs14 weight-900">Active</span></button>
        </div>
      </div>
      <div class="forms-container pb35">
        <h2 class="weight-900 fs18 lh42">Forms</h2>
        <div class="col-sm-6">
          <div class="mb20">
            <label><span class="mr65 fs15 width-63">Name<sup class="pl2 fs15">*</sup></span>
            <input type="text" class=" brdr-1 brdr-round4 brdr-cl-lightgray2 py3 px10 fs15 lh30 width-245 ml15"></label>
          </div>
          <div class="mb20">
            <label><span class="mr65 fs15">Password</span>
              <input type="text" class=" brdr-1 brdr-round4 brdr-cl-lightgray2 py3 px10 fs15 lh30 width-245">
            </label>
          </div>
          <div class="mb20">
            <label for="sg-textarea">
              <textarea name="" id="sg-textarea" rows="6" class=" brdr-round4 brdr-cl-lightgray2 py12 px16 fs15 lh30 width-375" placeholder="Textarea"/>
            </label>
          </div>
        </div>
        <div class="py10">
          <checkbox @changed-flag="flag = $event" :is-checked="true" labeltext="Chexbox choice 1"/>
        </div>
        <div class="py10">
          <checkbox @changed-flag="flag = $event" :is-checked="false" labeltext="Chexbox choice 2"/>
        </div>
        <div class="py25">
          <div class="py10">
            <label for="sg-choice1" class="relative fs16">
              <input class="absolute width-18 height-18" id="sg-choice1" name="type-choice" type="radio" checked>
              <span class="radiobtn-custom relative pl35">Radiobutton choice 1</span>
            </label>
          </div>
          <div class="py10">
            <label for="sg-choice2" class="relative fs16">
              <input class="absolute width-18 height-18" id="sg-choice2" name="type-choice" type="radio">
              <span class="radiobtn-custom relative pl35">Radiobutton choice 2</span>
            </label>
          </div>
        </div>
        <!--<div class="dropdown"> Custom dropdown from Category page-->
        <!--<span class="select-wrapper relative flex between-xs pointer brdr-1 brdr-cl-lightgray2 py3 px10 fs15 lh30 width-245 brdr-round4" @click="dropdowntVisible = !dropdowntVisible">-->
        <!--<span class="selected-name fs16 lh25 cursor-pointer weight-400">{{ dropdownName }}</span>-->
        <!--<i class="arrow-down trg-icons keyboard_arrow_down-ico relative fs22 cl-gray7"/>-->
        <!--<div class="dropdown-select bg-cl-white absolute w-100 brdr-1 brdr-cl-gray4 brdr-rounr4" :class="[ dropdowntVisible ? 'show' : 'hide' ]">-->
        <!--<div class="pointer py3 px10" @click="selectDropdown('Value 1')">Value 1</div>-->
        <!--<div class="pointer py3 px10" @click="selectDropdown('Value 2')">Value 2</div>-->
        <!--<div class="pointer py3 px10" @click="selectDropdown('Value 3')">Value 3</div>-->
        <!--<div class="pointer py3 px10" @click="selectDropdown('Value 4')">Value 4</div>-->
        <!--</div>-->
        <!--</span>-->
        <!--</div>-->
        <div class="">
          <label for="sg-select" class="sg-select relative"><i class="pointer arrow-down trg-icons keyboard_arrow_down-ico absolute bg-cl-white fs22 cl-gray7"/>
            <select name="" id="sg-select" class="bg-cl-transparent brdr-1 brdr-cl-lightgray2 py9 px10 fs14 lh30 width-245 brdr-round4 cl-silver3">
              <option class="">reason for return</option>
              <option value="Value1">Value1</option>
              <option value="Value2">Value2</option>
            </select>
          </label>
        </div>
      </div>
      <div class="messages-container pb35">
        <h2 class="weight-900 fs18 lh42">Messages</h2>
        <div class="sg-notification mt30 border-box cl-white info">
          <div class="message p20">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          </div>
          <div class="actions py10 px20 pointer weight-400 uppercase">
            Message info
          </div>
        </div>
        <div class="sg-notification mt30 border-box cl-white success">
          <div class="message p20">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          </div>
          <div class="actions py10 px20 pointer weight-400 uppercase">
            Message success
          </div>
        </div>
        <div class="sg-notification mt30 border-box cl-white warning">
          <div class="message p20">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          </div>
          <div class="actions py10 px20 pointer weight-400 uppercase">
            Message warning
          </div>
        </div>
        <div class="sg-notification mt30 border-box cl-white error">
          <div class="message p20">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          </div>
          <div class="actions py10 px20 pointer weight-400 uppercase">
            Message error
          </div>
        </div>
      </div>
      <div class="pagination-container pb35">
        <h2 class="weight-900 fs18 lh42">Pagination</h2>
        <div class="container pagination pt21">
          <div class="row middle-md center-md weight-900 fs13 lh18 cl-black2">
            <div class="mr21 active pointer">1</div>
            <div class="mr21 pointer">2</div>
            <div class="mr21 pointer">3</div>
            <div class="mr21 pointer">...</div>
            <div class="mr21 pointer">39</div>
          </div>
        </div>
      </div>
      <div class="rating-container pb35">
        <h2 class="weight-900 fs18 lh42">Rating</h2>
        <div class="sg-raiting-producttile">
          <h3 class="weight-900 fs18 lh42">Rating in product tile</h3>
          <no-ssr>
            <vue-stars
              :name="'sg-rating1'"
              :active-color="'#FFDB5E'"
              :inactive-color="'#E1E1E1'"
              :max="5"
              :value="3"
              :readonly="true"
            >
              <svg width="16px" height="17px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                <defs/>
                <g id="Symbols" stroke="#FFC600" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                    <g id="Group" transform="translate(23.000000, 363.000000)">
                      <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                    </g>
                  </g>
                </g>
              </svg>
              <svg width="16px" height="17px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                <defs/>
                <g id="Symbols" stroke="#C8C7CD" stroke-width="1" fill="none" fill-rule="evenodd">
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
        <div class="sg-raiting-product">
          <h3 class="weight-900 fs18 lh42">Rating in product card</h3>
          <no-ssr>
            <vue-stars
              :name="'sg-rating2'"
              :active-color="'#FFDB5E'"
              :inactive-color="'#E1E1E1'"
              :max="5"
              :value="4"
              :readonly="true"
            >
              <svg width="16px" height="17px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="activeLabel">
                <defs/>
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="mini_ONEDAY" transform="translate(-55.000000, -363.000000)" fill="#FFDB5E">
                    <g id="Group" transform="translate(23.000000, 363.000000)">
                      <polygon id="Star-2-Copy" points="38.390072 9.95015528 34.4407903 12 35.195036 7.65835921 32 4.58359214 36.4154311 3.95015528 38.390072 0 40.3647128 3.95015528 44.7801439 4.58359214 41.585108 7.65835921 42.3393536 12"/>
                    </g>
                  </g>
                </g>
              </svg>
              <svg width="16px" height="17px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" slot-scope="props" slot="inactiveLabel">
                <defs/>
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="mini_ONEDAY" transform="translate(-71.000000, -363.000000)" fill="#B6B6B6">
                    <g id="Group" transform="translate(23.000000, 363.000000)">
                      <polygon id="Star-2-Copy-2" points="54.390072 9.95015528 50.4407903 12 51.195036 7.65835921 48 4.58359214 52.4154311 3.95015528 54.390072 0 56.3647128 3.95015528 60.7801439 4.58359214 57.585108 7.65835921 58.3393536 12"/>
                    </g>
                  </g>
                </g>
              </svg>
            </vue-stars>
          </no-ssr>
          <span class="cl-gray2 fs14 relative">(5)</span>
        </div>
      </div>
      <div class="sections-container pb35">
        <h2 class="weight-900 fs18 lh42">Sections</h2>
        <div class="sg-tabs fs16 no-underline lh25 weight-400 cl-dark-blue">
          <ul class="tabs-list container flex p0 pl8 mb0">
            <li @click="activeTab='first'" class="width-210" :class="{'active-tab': activeTab === 'first'}">
              <span>First tab</span>
            </li>
            <li @click="activeTab='second'" class="width-210" :class="{'active-tab': activeTab === 'second'}">
              <span>Second tab</span>
            </li>
            <li @click="activeTab='third'" class="width-210" :class="{'active-tab': activeTab === 'third'}">
              <span>Third tab</span>
            </li>
          </ul>
          <div class="hidden" :class="{'active-tab': activeTab === 'first'}">
            <div class="container about-product">
              <div class="row fs14 lh24 cl-gray2 weight-400 pt22">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker  of Lorem Ipsum.  It was popularised in the
                1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker  of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
            </div>
          </div>
          <div class="hidden" :class="{'active-tab': activeTab === 'second'}">
            <div class="container about-product">
              <div class="row fs14 lh24 cl-gray2 weight-400 pt22">
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker  of Lorem Ipsum.  It was popularised in the
                1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker  of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type

              </div>
            </div>
          </div>
          <div class="hidden" :class="{'active-tab': activeTab === 'third'}">
            <div class="container about-product">
              <div class="row fs14 lh24 cl-gray2 weight-400 pt22">
                specimen book. It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker  of Lorem Ipsum.  It was popularised in the
                1960s with the release of Letraset sheets containing Lorem Ipsum passages,Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                and more recently with desktop publishing software like Aldus PageMaker  of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tables-container pb35">
        <h2 class="weight-900 fs18 lh42">Tables</h2>
        <table class="sg-table">
          <thead class="sg-thead fs-14 lh20 brdr-bottom brdr-cl-gray6 align-left py15">
            <tr class="cl-black2 fs13 lh18">
              <th class="py8">№ invoice</th>
              <th class="py8">Order</th>
              <th class="py8">Product</th>
              <th class="py8">Answer</th>
              <th class="py8">Commis</th>
              <th class="py8">Date</th>
              <th class="fs0">Detail</th>
            </tr>
          </thead>
          <tbody class="sg-tbody cl-gray2">
            <tr class="sg-trow py15 brdr-bottom brdr-cl-gray6 fs15 lh30">
              <td data-label="№ invoice" class="py15 pl15 pr20 fs18 weight-900">
                №000234
              </td>
              <td data-label="Order" class="py15 pr15">
                №46785678
              </td>
              <td data-label="Product" class="py15 pr20">
                MacBook Pro 13, 256 GB
              </td>
              <td data-label="Answer" class="py15 pr40 align-center">
                Admin
              </td>
              <td data-label="Commis" class="py15 pr20">
                Completed
              </td>
              <td data-label="Date" class="py15 pr30">
                20.02.2018-22.02.2018
              </td>
              <td class="py15 pr15">
                <button class="bg-cl-transparent cl-blue brdr-1 brdr-cl-blue brdr-round3 py8 px18 fs14">detail</button>
              </td>
            </tr>
            <tr class="sg-trow py15 brdr-bottom brdr-cl-gray6 fs15 lh30">
              <td data-label="№ invoice" class="pr20 pl15 fs18 weight-900">
                №000234
              </td>
              <td data-label="Order" class="py15 pr15">
                №46785678
              </td>
              <td data-label="Product" class="py15 pr20">
                MacBook Pro 13, 256 GB
              </td>
              <td data-label="Answer" class="py15 pr40 align-center">
                Admin
              </td>
              <td data-label="Commis" class="py15 pr20">
                Completed
              </td>
              <td data-label="Date" class="py15 pr30">
                20.02.2018-22.02.2018
              </td>
              <td class="py15 pr15">
                <button class="bg-cl-transparent cl-blue brdr-1 brdr-cl-blue brdr-round3 py8 px18 fs14">detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="typography-container pb35">
        <h2 class="weight-900 fs18 lh42">Typography</h2>
        <h2 class="weight-900 fs30 lh42">Header level1</h2>
        <h3 class="weight-900 fs18 lh25">Header level2</h3>
        <div class="fs 14 lh24">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Vestibulum tortor quam, feugiat Keyboard input vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
        Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
        Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis.
        Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
        Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Checkbox from '../components/theme/Checkbox'
import VueStars from 'vue-stars'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'Styleguide',
  data () {
    return {
      dropdowntVisible: false,
      activeTab: 'first',
      selectedValue: '',
      dropdownName: 'Select',
      visibleModal: false
    }
  },
  components: {
    Checkbox,
    VueStars,
    'no-ssr': NoSSR
  },
  methods: {
    selectDropdown (value) {
      this.dropdownName = value
    }
  }
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/variables/responsive';
@import '~theme/css/helpers/functions/color';
$color-white: color(white);
$color-white2: color(white2);
$color-white-smoke2: color(white-smoke2);
$color-blue: color(blue);
$color-silver3: color(silver3);
$color-silver4: color(silver4);
$color-gray2: color(gray2);
$color-gray4: color(gray4);
$color-error: color(error);
$color-success: color(success);
$color-warning: color(warning);
$color-info: color(accent);
$color-action: color(black);
.styleguide {
  .sg-modal-wrapper {
    position:fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }
  .sg-modal-wrapper-hide {
    position: absolute;
    width: 0;
    height: 0;
  }
  .sg-modal {
    transform: translateY(-400%);
    i {
      right: 0;
      z-index: 11;
    }
  }
  .modal-show {
    margin: 5rem auto;
    transform: translateY(0);
    transition-duration: .2s;
    transition-property: transform,visibility;
    transition-timing-function: ease;
  }
  .links-container {
    span:hover,
    span:active {
      border-color: transparent;
    }
  }
  .forms-container {
    .show {
      display: block;
    }
    .hide {
      display: none;
    }
    .dropdown-select {
      top: -4px;
      left: 1px;
    }
    .sg-select{
      select {
        font-style: italic;
      }
      i {
        top: -4px;
        right: 1px;
      }
      option {
        font-style: normal;
      }
    }
    sup {
      vertical-align: middle;
    }
    textarea::-webkit-input-placeholder {
      font-style: italic;
      color: $color-silver3;
    }
    textarea::-moz-placeholder {
      font-style: italic;
      color: $color-silver3;
    }
    textarea::-ms-input-placeholder {
      font-style: italic;
      color: $color-silver3;
    }
    input[type=text]:focus,
    input[type=text]:active,
    input[type=number]:focus,
    input[type=number]:active,
    textarea:focus,
    textarea:active,
    select:focus,
    select:active{
      outline: none;
      border-color: $color-gray4;
    }
    input[type=radio] {
      opacity: 0;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .radiobtn-custom:before {
      content: '';
      position: absolute;
      display: block;
      width: 22px;
      height: 22px;
      top: -5px;
      border-radius: 50%;
      border: 1px solid $color-silver3;
    }
    input[type=radio]:hover + .radiobtn-custom:before {
      border: 1px solid $color-blue;
    }
    input[type=radio]:checked ~ .radiobtn-custom:before {
      content: '';
      position: absolute;
      display: block;
      width: 22px;
      height: 22px;
      top: -5px;
      border-radius: 50%;
      border: 1px solid $color-blue;
    }
    input[type=radio]:checked ~ .radiobtn-custom:after {
      content: '';
      position: absolute;
      display: block;
      width: 16px;
      height: 16px;
      top: -1px;
      left: 4px;
      background: $color-blue;
      border-radius: 50%;
    }
  }
  .messages-container {
    .sg-notification {
      box-shadow: 0px 0px 35px -5px rgba($color-action, .7);
    }
    .actions {
      background: rgba($color-action, .2);
    }
    .success {
      background: $color-success;
    }
    .error {
      background: $color-error;
    }
    .warning {
      background: $color-warning;
    }
    .info {
      background: $color-info;
    }
  }
  .pagination {
    .active {
      padding-top: 9px;
      padding-bottom: 9px;
      width: 35px;
      border-radius: 5px;
      background-color: $color-silver4;
      font-size: 16px;
    }
  }
  .sg-raiting-producttile {
    .vue-stars label {
      margin-right: 3px;
    }
  }
  .sg-raiting-product {
    .vue-stars label {
      margin-right: 6px;
    }
    span {
      bottom: 3px;
    }
  }
  .sg-table {
    border-collapse: collapse;
  }
  .sg-trow:hover {
    background-color: $color-white2;
  }
  .sg-tbody button:hover {
    background-color: $color-blue;
    color: $color-white;
  }
  .tabs-list {
    list-style-type: none;
    background: linear-gradient(180deg, $color-white 0%, $color-white-smoke2 100%);
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
}
</style>
