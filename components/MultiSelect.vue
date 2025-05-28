<template>
  <div class="select-container" ref="target">
    <ul class="selected-list-container" @click="showOptions = !showOptions">
      <li v-if="!selectedList.length" class="blank">Select</li>
      <li v-else class="not-blank">
        <p>
          {{
            fullList
              .filter((i: any) => selectedList.includes(i._id))
              .map((i: any) => i.name)
              .join(", ")
          }}
        </p>
      </li>
    </ul>
    <div class="select-options-container" v-if="showOptions">
      <div class="search">
        <input type="text" v-model="textSearch" placeholder="Search" required />
      </div>
      <div class="select-options">
        <div class="options" v-for="i in filteredList" :key="i._id">
          <p class="option-item" @click="selectParentClick(i._id, 'parent')">
            <span :class="{ checked: selectedList.includes(i._id) }"></span>
            {{ i.name }}
          </p>
          <div v-if="hasChild" style="margin-left: 20px">
            <div class="options" v-for="o in i.item" :key="o._id">
              <p
                class="option-item"
                @click="selectParentClick(o._id, 'child', i._id)"
              >
                <span :class="{ checked: selectedList.includes(o._id) }"></span>
                {{ o.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons" v-if="!isSingle">
        <button class="button small orange" @click="save()">Apply</button>
        <button class="button small light-grey" @click="showOptions = false">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

const showOptions = ref(false);
const selectedList = ref<any[]>([]);
const textSearch = ref("");
const isLoading = ref(true);

const {
  list,
  hasChild = false,
  isSingle = false,
} = defineProps(["list", "hasChild", "isSingle"]);

const modelValue = defineModel();
const target = ref(null);
onClickOutside(target, () => (showOptions.value = false));

const selectParentClick = (id: string, type: string, parentId?: string) => {
  const isSelected = selectedList.value.includes(id);

  if (isSingle) {
    selectedList.value = isSelected ? [] : [id];
    save();
  } else {
    if (isSelected) {
      selectedList.value = selectedList.value.filter((i) => i !== id);
    } else {
      selectedList.value = [...selectedList.value, id];
    }
  }

  if (hasChild) autoSelect(id, type, parentId);
};

const autoSelect = (id: string, type: string, parentId?: string) => {
  if (type === "parent") {
    const parent = list.find((i: any) => i._id === id);
    if (!parent) return;
    const childs = parent.item.map((c: any) => c._id);

    if (selectedList.value.includes(id)) {
      selectedList.value = [...new Set([...selectedList.value, ...childs])];
    } else {
      selectedList.value = selectedList.value.filter(
        (i) => !childs.includes(i)
      );
    }
  }

  if (type === "child" && parentId) {
    const parent = list.find((i: any) => i._id === parentId);
    if (!parent) return;
    const childs = parent.item.map((c: any) => c._id);
    const anyChildSelected = childs.some((id) =>
      selectedList.value.includes(id)
    );

    if (anyChildSelected && !selectedList.value.includes(parentId)) {
      selectedList.value.push(parentId);
    } else if (!anyChildSelected && selectedList.value.includes(parentId)) {
      selectedList.value = selectedList.value.filter((i) => i !== parentId);
    }
  }
};

const fullList = computed(() => {
  if (hasChild) {
    const flatList: any[] = [];
    list.forEach((i: any) => {
      flatList.push({ _id: i._id, name: i.name });
      i.item.forEach((o: any) => {
        flatList.push({ _id: o._id, name: o.name });
      });
    });
    return flatList;
  }
  return list;
});

const filteredList = computed(() => {
  const search = textSearch.value.toLowerCase();
  if (hasChild) {
    return list.filter((i: any) => {
      const parentMatch = i.name.toLowerCase().includes(search);
      const childMatch = i.item.some((o: any) =>
        o.name.toLowerCase().includes(search)
      );
      return parentMatch || childMatch;
    });
  } else {
    return list.filter((i: any) => i.name.toLowerCase().includes(search));
  }
});

const save = () => {
  showOptions.value = false;
  modelValue.value = [...selectedList.value];
};

watch(
  () => showOptions.value,
  (val) => {
    if (!val && !isLoading.value) {
      modelValue.value = [...selectedList.value];
    }
  }
);

watch(
  () => modelValue.value,
  (val) => {
    if (val) {
      selectedList.value = [...val];
    }
  },
  { immediate: true }
);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>

<style lang="scss" scoped>
.select-container {
  position: relative;

  input {
    position: relative;
    z-index: 2;
  }

  ul.selected-list-container {
    li {
      height: 2.8rem;
      border-radius: 6px;
      display: flex;
      align-items: center;
      padding: 0.5rem 1.5rem 0.5rem 0.75rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &::after {
        content: "\f078";
        font-family: "Font Awesome 6 Pro";
        font-size: var(--xsm-font);
        position: absolute;
        right: 0.75rem;
        text-align: center;
        color: var(--black-800);
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(#000, 0.05);
      }

      &.blank {
        background-color: #fff;
        color: var(--black-800);
        box-shadow: 0 0 0 1px var(--black-300);
      }

      &.not-blank {
        background-color: var(--orange-200);
        color: black;
        box-shadow: 0 0 0 1px var(--orange-900);
      }

      p {
        width: 100%;
        overflow: hidden;
        white-space: pre;
        text-overflow: ellipsis;
        padding-right: 0.5rem;
      }
    }
  }

  .select-options-container {
    padding: 0.5rem 0 0;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 8;
    top: 3rem;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 6px 6px 12px 3px rgba(#000, 0.15);

    .search {
      padding: 1rem 1rem 0;
    }

    .select-options {
      max-height: 200px;
      overflow-y: auto;
      padding: 1rem;

      .options {
        padding: 0.15rem 0;

        .option-item {
          user-select: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 2.3rem;
          cursor: pointer;

          &:hover {
            color: var(--orange-900);
          }

          span {
            position: relative;
            display: flex;

            &::before {
              content: "";
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 3px;
              background-color: var(--black-300);
              transition: all ease-in-out 0.15s;
            }

            &.checked::before {
              background-color: var(--orange-900);
            }

            &.checked::after {
              content: "";
              position: absolute;
              left: 5px;
              top: 9px;
              background: #fff;
              width: 2px;
              height: 2px;
              box-shadow: 2px 0 0 #fff, 4px 0 0 #fff, 4px -2px 0 #fff,
                4px -4px 0 #fff, 4px -6px 0 #fff, 4px -8px 0 #fff;
              transform: rotate(45deg);
            }
          }
        }
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--black-100);
      height: 3.5rem;
      padding: 0 1rem;
      box-shadow: 0 -1px 0 0 var(--black-300);
    }
  }
}
</style>
