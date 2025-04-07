<template>
  <div class="select-date-container">
    <div
      class="select"
      v-show="!isOnlyMonthAndYear"
      :class="{ disabled: isDisabled }"
    >
      <select v-model="dateFieldDay" :disabled="isDisabled">
        <option disabled selected value="">DD</option>
        <option v-for="i in dayOptionsComputed" :value="i">{{ i }}</option>
      </select>
    </div>
    <div class="select" :class="{ disabled: isDisabled }">
      <select v-model="dateFieldMonth" :disabled="isDisabled">
        <option disabled selected value="">MM</option>
        <option v-for="(i, idx) in monthOptions" :value="i">
          {{ monthNames[idx] }}
        </option>
      </select>
    </div>
    <div class="select" :class="{ disabled: isDisabled }">
      <select v-model="dateFieldYear" :disabled="isDisabled">
        <option disabled selected value="">YYYY</option>
        <option v-for="i in yearOptions" :value="i">{{ i }}</option>
      </select>
      {{ dateOfBirthComputed }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
 import { formatStringToDate } from "@/utils/formatter";
import dayjs from "dayjs";

const props = defineProps(["modelValue", "isOnlyMonthAndYear", "isDisabled"]);
const modelValue = defineModel();
const isModelValueSet = ref(false);
const monthNames = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const dateFieldDay = ref("");
const dateFieldMonth = ref("");
const dateFieldYear = ref("");

const fieldDateOfBirth = ref("");

const dayOptions = ref<any>([]);
for (var i = 1; i <= 31; i++) {
  let newOption: any = "";
  newOption = (i < 10 ? "0" : "") + i;
  dayOptions.value.push(newOption);
}

const monthOptions = ref<any>([]);
for (var i = 0; i < monthNames.value.length; i++) {
  let newOption: any = "";
  newOption = (i < 9 ? "0" : "") + (i + 1);
  monthOptions.value.push(newOption);
}

const yearEnd = new Date().getFullYear();
const yearStart = yearEnd - 70;
const yearOptions = ref<any>([]);
for (var i = yearEnd; i >= yearStart; i--) {
  let newOption: any = "";
  newOption = i;
  yearOptions.value.push(newOption);
}

watch(
  () => dateFieldDay.value,
  () => {
    dateChangeHandler();
  }
);

watch(
  () => dateFieldMonth.value,
  () => {
    dateChangeHandler();
  }
);

watch(
  () => dateFieldYear.value,
  () => {
    dateChangeHandler();
  }
);

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue && !isModelValueSet.value) {
      isModelValueSet.value = true;
      dateFieldDay.value = dayjs(props.modelValue).format("DD");
      dateFieldMonth.value = dayjs(props.modelValue).format("MM");
      dateFieldYear.value = dayjs(props.modelValue).format("YYYY");
    }
  }
);

if (props.isOnlyMonthAndYear) dateFieldDay.value = "01";
// watch(
//   () => props.isOnlyMonthAndYear,
//   () => {
//     if (props.isOnlyMonthAndYear) {

//     }
//   }
// );

const dayOptionsComputed = computed(() => {
  return dayOptions.value.filter(function (o: any, i: number) {
    return i < maxDays.value;
  });
});

const dateOfBirthComputed = computed(() => {
  if (fieldDateOfBirth.value) {
    const date = formatStringToDate(fieldDateOfBirth.value);
    modelValue.value = date;
  } else {
    if (isModelValueSet.value) {
      modelValue.value = null;
    }

    return null;
  }
});

const maxDays = ref(31);

const dateChangeHandler = function () {
  const day = parseInt(dateFieldDay.value, 10);
  const month = parseInt(dateFieldMonth.value, 10);
  const year = parseInt(dateFieldYear.value, 10);

  if (month === 2) {
    const isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    maxDays.value = isLeapYear ? 29 : 28;
  } else if ([2, 4, 6, 9, 11].indexOf(month) >= 0) {
    maxDays.value = 30;
  } else {
    maxDays.value = 31;
  }

  if (day > maxDays.value) dateFieldDay.value = "";

  let allSet = true;

  const dateFields = [
    dateFieldYear.value,
    dateFieldMonth.value,
    dateFieldDay.value,
  ];
  dateFields.forEach((field) => {
    const isEmpty = !field;
    if (isEmpty) {
      allSet = false;
    }
  });

  if (allSet) {
    fieldDateOfBirth.value = dateFields
      .map(function (field) {
        return field;
      })
      .join("-");
  } else {
    fieldDateOfBirth.value = "";
  }
};
</script>

<style lang="scss" scoped>
.select-date-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.select {
  flex-grow: 1;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  position: relative;
  &::after {
    content: " ";
    display: block;
    height: 0.5em;
    width: 0.5em;
    border: 0.125em solid var(--primary-900);
    border-right: 0;
    border-top: 0;
    margin-top: -0.25em;
    pointer-events: none;
    position: absolute;
    transform: rotate(-45deg);
    transform-origin: center;
    inset-inline-end: 1em;
    z-index: 4;
  }
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    padding: 0 calc(0.75em - 1px);
    padding-inline-end: 2.25em;
  }
}
</style>
