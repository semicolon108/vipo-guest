<template>
  <div class="select-date-container">
    <div class="select" v-show="!isOnlyMonthAndYear" :class="{ disabled: isDisabled }">
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
        <option v-for="(month, idx) in monthOptions" :key="month" :value="month">
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
import dayjs from "dayjs";

// Define v-model and props
const modelValue = defineModel<string | null>();
const props = defineProps<{
  isOnlyMonthAndYear?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string | null) => void;
  onBlur?: () => void;
}>();

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

// Handle modelValue from parent (for initial load, dynamic updates, and form resets)
watch(
  () => modelValue.value,
  (newVal: any) => {
    if (newVal) {
      const date = dayjs(newVal);
      if (date.isValid()) {
        const formattedDay = date.format("DD");
        const formattedMonth = date.format("MM");
        const formattedYear = date.format("YYYY");

        // Only update field values if they actually differ to avoid recursive loops
        if (dateFieldDay.value !== formattedDay) {
          dateFieldDay.value = formattedDay;
        }
        if (dateFieldMonth.value !== formattedMonth) {
          dateFieldMonth.value = formattedMonth;
        }
        if (dateFieldYear.value !== formattedYear) {
          dateFieldYear.value = formattedYear;
        }
      }
    } else {
      // Clear dropdown fields only if they were previously fully populated (indicating an external form reset)
      const hasFullDate = dateFieldYear.value && dateFieldMonth.value && (props.isOnlyMonthAndYear || dateFieldDay.value);
      if (hasFullDate) {
        dateFieldDay.value = props.isOnlyMonthAndYear ? "01" : "";
        dateFieldMonth.value = "";
        dateFieldYear.value = "";
      }
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
    modelValue.value = fullDate;
    props.onChange?.(fullDate); // notify vee-validate so it clears the error if prop exists
  } else {
    modelValue.value = null;
    props.onChange?.(null); // notify vee-validate of empty value if prop exists
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
