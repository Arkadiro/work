<template>
  <div>

    <div class="range-input data-selector middle-xs mb14 flex between-xs px17">
      <div class="title">Срок поставки</div>
      <div class="min-input">
        <input class="align-center" placeholder="от">
      </div>
      <div class="opacity5 cl-black">-</div>
      <div class="max-input brdr-r-1 brdr-cl-black-border pr4">
        <input class="align-center pr0" placeholder="до">
      </div>
      <div class="relative px9">
        <select name="delivery-time-select" class="dropdown brdr-none bg-cl-transparent cl-black fs14 lh14 px5">
          <option v-for="row in deliveryTimes" :key="row.name" class="pb5 fs12 weight-400" selected>{{ row.name }}</option>
        </select>
        <i class="lanit-icons arrow-down-ico absolute fs18 cl-black" />
      </div>
    </div>
  </div>
</template>

<script>
// import DeliveryTimes from 'src/themes/lanit/resource/delivery-time.json'

export default { // TODO: move logic to parent component
  name: 'DataSelector',
  data () {
    return {
      deliveryTimes: null
      // deliveryTimes: DeliveryTimes
    }
  }
}
</script>

<style lang="scss" scoped>

.dropdown {
  -webkit-appearance: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
}
.data-selector {
  .min-input input{
    text-align: left;
  }
  .max-input input {
    text-align: right;
  }
  input {
    max-width: 37px;
  }
}
</style>
