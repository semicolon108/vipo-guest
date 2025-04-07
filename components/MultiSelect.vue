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
        <div class="options" v-for="i in filteredList">
          <p class="option-item" @click="selectParentClick(i._id, 'parent')">
            <span :class="{ checked: selectedList.includes(i._id) }"></span>
            {{ i.name }}
          </p>
          <div v-if="hasChild" style="margin-left: 20px">
            <div class="options" v-for="o in i.item">
              <p class="option-item" @click="selectParentClick(o._id, 'child')">
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
import { computed, onMounted, ref, useModel, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

const showOptions = ref(false);
const selectParentClick = (id: string, type: string) => {
  if (selectedList.value.includes(id)) {
    const idx = selectedList.value.findIndex((i: any) => i === id);
    selectedList.value.splice(idx, 1);
  } else {
    selectedList.value.push(id);
  }
  if (isSingle) {
    selectedList.value = [id];
    save();
  }
  autoSelect(type);
};

const modelValue = defineModel();

const textSearch = ref("");

const isLoading = ref(true);

const {
  list,
  hasChild = false,
  isSingle = false,
} = defineProps(["list", "hasChild", "isSingle"]);

const fullList = computed(() => {
  if (hasChild) {
    const l: any = [];
    list.map((i: any) => {
      l.push({
        _id: i._id,
        name: i.name,
      });
      i.item.map((o: any) => {
        l.push({
          _id: o._id,
          name: o.name,
        });
      });
    });
    return l;
  } else {
    return list;
  }
});

const filteredList = computed(() => {
  if (hasChild) {
    const nList = list.filter((i: any) => {
      const parent = i.name
        .toLowerCase()
        .includes(textSearch.value.toLowerCase());
      const child = i.item
        .map((o: any) => o.name)
        .join(" ")
        .toLowerCase()
        .includes(textSearch.value.toLowerCase());
      return parent || child;
    });

    return nList;
  } else {
    const nList = list.filter((i: any) => {
      const parent = i.name
        .toLowerCase()
        .includes(textSearch.value.toLowerCase());
      return parent;
    });
    return nList;
  }
});

const selectedList = ref<any>([]);

const autoSelect = (type: string) => {
  if (!hasChild) return;

  if (type === "child") {
    const childs = [];
    const parents = list.map((i: any) => {
      const c = i.item.map((i: any) => i._id);
      childs.push([...c]);
      return {
        parent: i._id,
        childs: c,
      };
    });

    const parentsMapped = parents.map((i: any) => i.parent);

    for (let i = 0; i < parentsMapped.length; i++) {
      const parent = parentsMapped[i];
      const childs = parents[i].childs;

      if (childs.some((o: any) => selectedList.value.includes(o))) {
        selectedList.value = [...selectedList.value, parent];
      } else {
        selectedList.value = selectedList.value.filter(
          (o: any) => o !== parent
        );
      }
    }
  } else {
    const childs = [];
    const parents = list.map((i: any) => {
      const c = i.item.map((i: any) => i._id);
      childs.push([...c]);
      return {
        parent: i._id,
        childs: c,
      };
    });
    const parentsMapped = parents.map((i: any) => i.parent);

    for (let i = 0; i < parentsMapped.length; i++) {
      const parent = parentsMapped[i];
      const childs = parents[i].childs;

      if (selectedList.value.includes(parent)) {
        selectedList.value = [...selectedList.value, ...childs];
      } else {
        selectedList.value = selectedList.value.filter(
          (o: any) => !childs.includes(o)
        );
      }
    }
  }
};

const save = () => {
  showOptions.value = false;
};

watch(
  () => showOptions.value,
  () => {
    if (!isLoading.value) {
      modelValue.value = selectedList.value;
    }
  }
);

watch(
  () => modelValue.value,
  () => {
    if (modelValue.value) {
      selectedList.value = modelValue.value;
    }
  },
  { immediate: true }
);

const target = ref(null);
onClickOutside(target, (event) => (showOptions.value = false));

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
      height: 2.5rem;
      border-radius: 6px;
      display: flex;
      align-items: center;
      padding-top: calc(0.5rem - 1px);
      padding-bottom: calc(0.5rem - 1px);
      padding-left: calc(0.75rem - 1px);
      padding-right: 1.5rem;
      cursor: pointer;
      position: relative;
      border-radius: 6px;
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

      &:hover {
        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(#000, 0.05);
        }
      }

      &.blank {
        background-color: #fff;
        color: var(--black-800);
        box-shadow: 0 0 0 1px var(--black-300);
      }

      &.not-blank {
        background-color: var(--orange-900);
        color: #fff;
        &::after {
          color: #fff;
        }
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
    border: 1px solid var(--border-color);
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
        overflow-y: auto;
        padding: 0.15rem 0;

        .option-item {
          user-select: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 2.3rem;
          cursor: pointer;

          &:hover {
            color: var(--primary-900);
          }

          span {
            position: relative;
            display: flex;

            &::before {
              content: "";
              display: inline-block;
              vertical-align: text-top;
              width: 20px;
              height: 20px;
              border-radius: 3px;
              background-color: var(--black-300);
              transition: all ease-in-out 0.15s;
            }

            &.checked {
              &::before {
                background-color: var(--orange-900);
              }

              &::after {
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
    }

    .buttons {
      position: relative;
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
