<template>
  <input ref="inputRef" type="text" />
</template>

<script setup lang="ts">
import { useCurrencyInput } from 'vue-currency-input'
import { watch } from 'vue'
import { watchDebounced } from '@vueuse/core'

// Props
const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const options = {
  locale: 'en-US',
  currency: 'USD',
  currencyDisplay: 'hidden',
  valueRange: {min: 0},
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: false,
  useGrouping: true,
  accountingSign: true
}

// ✅ Setup currency input (include setValue)
const {inputRef, numberValue, setValue} = useCurrencyInput(options, false)

// ✅ Emit value to parent (debounced)
watchDebounced(
    numberValue,
    (val) => emit('update:modelValue', val),
    {debounce: 0}
)

// ✅ Update input when parent modelValue changes
watch(
    () => props.modelValue,
    (val) => {
      if (val !== numberValue.value) {
        numberValue.value = val       // internal sync
        setValue(val)                 // visual update
      }
    },
    {immediate: true}
)
</script>
