<template>
  <span>
    <div class="price-slider mt20">
      <div class="input-price middle-xs pl27 pr2 flex between-xs mw-100">
        <input class="brdr-1 brdr-cl-lightgray2 p7 align-center width-110" @keyup.enter="switchFilter(id, from, to)" placeholder="from">
        <input class="brdr-1 brdr-cl-lightgray2 p7 align-center width-110" @keyup.enter="switchFilter(id, from, to)" placeholder="to">
      </div>
    </div>
  </span>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default { // TODO: move logic to parent component
  name: 'PriceSelector',
  mixins: [coreComponent('PriceSelector')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/responsive';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-event: color(tertiary);
  $color-active: color(accent);

  .price-selector {
    width: 20px;
    height: 20px;

    &:hover,
    &:focus {
      .square {
        background-color: $color-event;
      }
    }

    &.active {
      .square {
        background-color: $color-active;
      }
    }
  }

  .square {
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  @media (max-width: $screen__xl - 1) {
    input {
      width: 80px;
    }
  }
  @media (max-width: $screen__l - 1) {
    .input-price {
      width: 60%;
    }
    input {
      width: 45%;
    }
  }
  @media (max-width: $screen__s - 1) {
    .input-price {
      width: 100%;
    }
    input {
      width: 45%;
    }
  }
</style>
