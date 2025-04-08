<template>
  <!-- <div class="modal" :class="{ show: isPopupVisible }"> -->
  <div class="modal" v-if="isPopupVisible">
    <div class="bg"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>ແຊປະກາດວຽກ</h3>
        <div class="close" @click="togglePopup">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div class="modal-body">
        <div class="group">
          <label>ແຊປະກາດວຽກຜ່ານ</label>
          <div class="icons">
            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareLink
              )}`"
              target="_blank"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareLink
              )}`"
              target="_blank"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              :href="`https://wa.me/?text=${encodeURIComponent(shareLink)}`"
              target="_blank"
            >
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <label>ຫຼືກ໋ອບປີ້ລິ້ງ</label>
        <div class="copy-link" :class="{ active: isCopied }">
          <input type="text" readonly v-model="shareLink" ref="copyInput" />
          <button class="button orange" @click="copyLink">
            {{ isCopied ? "Copied" : "Copy" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isPopupVisible = ref(false);
const isCopied = ref(false);
const shareLink = ref("");
const copyInput = ref<HTMLInputElement | null>(null);

defineExpose({ isPopupVisible, shareLink });

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
  if (isCopied.value) {
    isCopied.value = false;
  }
};

const copyLink = () => {
  copyInput.value?.select();
  const success = document.execCommand("copy");
  if (success) {
    isCopied.value = true;
    setTimeout(() => {
      window.getSelection()?.removeAllRanges();
      isCopied.value = false;
    }, 3000);
  }
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(#fff, 0.5);
  }
  .modal-content {
    position: relative;
    background: #fff;
    padding: 25px;
    border-radius: 15px;
    max-width: 380px;
    width: 100%;
    box-shadow: inset 0 0 0 1px var(--orange-800),
      10px 10px 20px 0 var(--orange-200);
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--black-300);
      padding-bottom: 1rem;
      h3 {
        font-size: var(--lg-font);
        font-weight: 700;
      }
      .close {
        background-color: var(--black-200);
        width: 40px;
        height: 40px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        z-index: 999;
        i {
          cursor: pointer;
          color: var(--black-800);
        }
      }
    }
  }
}

.group {
  margin: 1.5rem 0;
}
.icons {
  display: flex;
  gap: 0.5rem;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    min-height: 50px;
    max-width: 50px;
    max-height: 50px;
    border-radius: 999px;
    border: 1px solid var(--orange-300);
    i {
      color: var(--orange-900);
    }
  }
}
.copy-link {
  display: flex;
  gap: 0.5rem;
}
label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: var(--sm-font);
}
</style>
