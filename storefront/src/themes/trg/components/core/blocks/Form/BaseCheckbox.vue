<template>
  <div>
    <div class="flex">

      <input
        class="hidden"
        type="checkbox"
        :id="id"
        :checked="value"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        :disabled="disabled"
      >
      <label
        class="lh18 fs14 pointer flex"
        :for="id"
      >
        <div class="check-agree mr12">
          <svg width="24" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle r="10" cx="11" cy="11" fill="white" stroke="#3399FF" stroke-width="1" />
            <circle r="7" cx="11" cy="11" class="circle-agree" :class="{hidden: !value}" fill="#3399FF"/>
          </svg>
        </div>
        <slot/>
      </label>
    </div>
    <template v-if="validation">
      <span
        class="block cl-error h6 align-center mt10"
        v-if="validation.condition"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
export default {
  mixins: [coreComponent('blocks/Form/BaseCheckbox')]
}
</script>

