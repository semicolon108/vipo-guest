<template>
  <div class="input-group">
    <div class="multi-selector-container">
      <div class="input-box" @click="toggleSelectOption">
        <input v-model="selectedSkill" type="text" placeholder="Enter or select skill" style="width: 100%"
          @keydown.enter.prevent="toggleSelectOption" />
      </div>

      <div ref="target" class="option-container" v-if="showSelectOption" style="overflow: auto; height: 400px">
        <ul>
          <li v-for="skill in skills" :key="skill._id" @click="selectSkill(skill.name)"
            :class="{ selected: selectedSkill === skill.name }">
            <span></span>{{ skill.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onClickOutside } from "@vueuse/core";

const target = ref<any>();
onClickOutside(target, (event) => (showSelectOption.value = false));

// v-model
const modelValue = defineModel<string>();

// Refs
const selectedSkill = ref("");
const showSelectOption = ref(false);
const skills = ref<any[]>([]);

// Nuxt / API
const { $apiFetch } = useNuxtApp();

// Functions
const toggleSelectOption = () => {
  showSelectOption.value = !showSelectOption.value;
};

const selectSkill = (name: string) => {
  selectedSkill.value = name;
  showSelectOption.value = false;
};

// Fetch skill suggestions
const getSkills = async () => {
  const { data }: any = await useAsyncData("getKeySkills", () =>
    $apiFetch("/get-keyskills-job-seeker-vipo", {
      query: { lang: "LA", page: 1, perPage: 100, search: selectedSkill.value },
    })
  );
  skills.value = data.value?.getKeySkill || [];
};

// Sync input to v-model
watch(() => selectedSkill.value, (newVal: any) => {
  modelValue.value = newVal;
  getSkills();
}
);

// Sync v-model to input
watch(
  () => modelValue.value,
  (newVal: any) => {
    if (newVal !== selectedSkill.value) {
      selectedSkill.value = newVal || "";
    }
  },
  { immediate: true }
);

// Initial load
await getSkills();
</script>

<style scoped lang="scss">
.input-group {
  flex-grow: 1;
  width: 100%;
}

.multi-selector-container {
  position: relative;

  .input-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    position: relative;

    &::after {
      content: "\f078";
      font-family: "Font Awesome 6 Pro";
      position: absolute;
      right: 0.75rem;
      font-size: var(--sm-font);
      color: var(--grey-text-color);
    }
  }

  .option-container {
    background-color: #fff;
    width: 100%;
    position: absolute;
    z-index: 9;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem 0;
    overflow-y: auto;
    max-height: 200px;

    ul {
      li {
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 1rem;
        cursor: pointer;
        position: relative;
        line-height: 2.5rem;
        transition: all 0.15s ease-in-out;

        &:hover {
          background-color: var(--light-primary-color);
        }

        &.selected span::before {
          background-color: var(--primary-color);
        }

        &.selected span::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 4px;
          border-bottom: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-45deg) scale(1);
          top: 6px;
          left: 5.5px;
        }

        span {
          position: relative;
          margin-right: 8px;

          &::before {
            content: "";
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 1px solid var(--primary-color);
            display: block;
          }
        }
      }
    }
  }
}
</style>
