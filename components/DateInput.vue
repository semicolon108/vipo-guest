<template>
  <div class="select-date-container">
    <div
      class="select"
      v-show="!isOnlyMonthAndYear"
      :class="{ disabled: isDisabled }"
    >
      <select v-model="dateFieldDay" :disabled="isDisabled">
        <option disabled value="">DD</option>
        <option v-for="i in dayOptionsComputed" :key="i" :value="i">
          {{ i }}
        </option>
      </select>
    </div>

    <div class="select" :class="{ disabled: isDisabled }">
      <select v-model="dateFieldMonth" :disabled="isDisabled">
        <option disabled value="">MM</option>
        <option
          v-for="(month, idx) in monthOptions"
          :key="month"
          :value="month"
        >
          {{ monthNames[idx] }}
        </option>
      </select>
    </div>

    <div class="select" :class="{ disabled: isDisabled }">
      <select v-model="dateFieldYear" :disabled="isDisabled">
        <option disabled value="">YYYY</option>
        <option v-for="year in yearOptions" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { formatStringToDate } from "@/utils/formatter";
import dayjs from "dayjs";

// Define v-model and props
const modelValue = defineModel<string | null>();
const props = defineProps<{
  isOnlyMonthAndYear?: boolean;
  isDisabled?: boolean;
}>();

const isModelValueSet = ref(false);

// Dropdown field refs
const dateFieldDay = ref("");
const dateFieldMonth = ref("");
const dateFieldYear = ref("");

// Month name display (optional)
const monthNames = [
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
];

// Options for selects
const dayOptions = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

const monthOptions = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

const yearEnd = new Date().getFullYear();
const yearStart = yearEnd - 70;
const yearOptions = Array.from({ length: yearEnd - yearStart + 1 }, (_, i) =>
  (yearEnd - i).toString()
);

// Set default day if only using month/year mode
if (props.isOnlyMonthAndYear) {
  dateFieldDay.value = "01";
}

// Recalculate day limits on month/year change
const maxDays = ref(31);
const dayOptionsComputed = computed(() => dayOptions.slice(0, maxDays.value));

// Handle modelValue from parent (for initial load)
watch(
  () => modelValue.value,
  (newVal) => {
    if (newVal && !isModelValueSet.value) {
      isModelValueSet.value = true;
      const date = dayjs(newVal);
      dateFieldDay.value = date.format("DD");
      dateFieldMonth.value = date.format("MM");
      dateFieldYear.value = date.format("YYYY");
    }
  },
  { immediate: true }
);

// Watch for field changes and update modelValue
watch([dateFieldDay, dateFieldMonth, dateFieldYear], () => {
  const day = parseInt(dateFieldDay.value);
  const month = parseInt(dateFieldMonth.value);
  const year = parseInt(dateFieldYear.value);

  if (month === 2) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    maxDays.value = isLeap ? 29 : 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    maxDays.value = 30;
  } else {
    maxDays.value = 31;
  }

  // Reset day if it exceeds new max
  if (parseInt(dateFieldDay.value) > maxDays.value) {
    dateFieldDay.value = "";
  }

  // Update the model if all fields are filled
  if (
    dateFieldYear.value &&
    dateFieldMonth.value &&
    (props.isOnlyMonthAndYear || dateFieldDay.value)
  ) {
    const fullDate = `${dateFieldYear.value}-${dateFieldMonth.value}-${dateFieldDay.value}`;
    modelValue.value = formatStringToDate(fullDate); // or just `fullDate` if formatting isn't needed
  } else {
    modelValue.value = null;
  }
});
</script>

<style lang="scss" scoped>
.select-date-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
