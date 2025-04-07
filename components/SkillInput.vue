<template>
  <div class="input-group">
    <div class="multi-selector-container">
      <div class="input-box" @click="toggleSelectOption">
        <input

            v-model="selectedSkill"
            style="width: 20vw"
            type="text"
            placeholder="Enter or select skill"
        />
      </div>

      <div
          class="option-container"
          v-if="showSelectOption"
          style="overflow: auto; height: 400px"
      >
        <ul>
          <li
              @click="selectSkill(i.name)"
              :class="{ selected: selectedSkill === i.name }"
              v-for="i in skills"
              :key="i._id"
          >
            <span></span>{{ i.name }}
          </li>
          <!-- <li><span></span>Inter/Student</li>
        <li><span></span>Experienced (non-manager)</li>
        <li><span></span>Manager</li>
        <li><span></span>Director and above</li> -->
        </ul>
      </div>
    </div>
    <!-- <button @click="hideEmployerFunc" class="button primary">Add</button> -->
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from "vue";


const { isAuth } = useAuth();
const { $apiFetch } = useNuxtApp();

const selectedSkill = ref("");

const skills = ref<any>([]);

const modelValue = defineModel();

const selectSkill = (name: string) => {
  selectedSkill.value = name;

  showSelectOption.value = false;
};

const showSelectOption = ref(false);
const toggleSelectOption = () => {
  showSelectOption.value = !showSelectOption.value;
};

const getSkill = async () => {
  const { data }: any = await useAsyncData('getKeySkills', () =>
      $apiFetch('/get-keyskills-job-seeker-vipo', {
        query: { lang: 'LA', page: 1, perPage: 100, search: selectedSkill.value },
      })
  );

  skills.value = data.value.getKeySkill;
};

watch(
    () => selectedSkill.value,
    () => {
      modelValue.value = selectedSkill.value;
      getSkill();
    }
);

watch(
    () => modelValue.value,
    () => {
      selectedSkill.value = modelValue.value as string;
    }
);

//onMounted(() => {
  await getSkill();
// });
</script>

<style lang="scss" scoped>
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
      display: block;

      li {
        white-space: nowrap;
        flex-wrap: nowrap;
        display: flex;
        align-items: center;
        justify-content: left;
        padding: 0 1rem;
        cursor: pointer;
        position: relative;
        line-height: 2.5rem;
        transition: all ease-in-out 0.15s;

        // border-radius: 6px;
        &:hover {
          background-color: var(--light-primary-color);
        }

        &.selected {
          span {
            &::before {
              background-color: var(--primary-color);
            }

            &::after {
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
          }
        }

        span {
          position: relative;
          margin-right: 8px;

          &::before {
            content: "";
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            border-radius: 18px;
            border: 1px solid var(--primary-color);
            transition: all 0.25s ease 0s;
          }
        }
      }

      // li
    }

    // ul
  }
}
</style>

<style lang="scss" scoped>
.search-option {
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  h3 {
    margin-bottom: 0.5rem;
  }
  .input-group {
    display: flex;
    gap: 10px;
  }
  ul {
    margin-top: 1rem;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    li {
      height: 2.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      padding: 0 1rem;
      border: 1px solid var(--border-color);
      background-color: #fff;
      gap: 10px;
      i {
        color: var(--alert-color);
        cursor: pointer;
      }
    }
  }
}
</style>
