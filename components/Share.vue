<template>
  <div>

    <div class="popup" :class="{ show: isPopupVisible }">
      <header>
        <span>Share Modal</span>
        <div class="close" @click="togglePopup">
          <i class="uil uil-times"></i>
        </div>
      </header>

      <div class="content">
        <p>Share this link via</p>
        <ul class="icons">
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`" target="_blank">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`" target="_blank">
            <i class="fab fa-twitter"></i>
          </a>
          <a :href="`https://wa.me/?text=${encodeURIComponent(shareLink)}`" target="_blank">
            <i class="fab fa-whatsapp"></i>
          </a>

        </ul>

        <p>Or copy link</p>
        <div class="field" :class="{ active: isCopied }">
          <i class="url-icon uil uil-link"></i>
          <input type="text" readonly v-model="shareLink" ref="copyInput" />
          <button @click="copyLink">{{ isCopied ? 'Copied' : 'Copy' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const isPopupVisible = ref(false)
const isCopied = ref(false)
const shareLink = ref('')
const copyInput = ref<HTMLInputElement | null>(null)

defineExpose({isPopupVisible, shareLink})

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value
  if (isCopied.value) {
    isCopied.value = false
  }
}

const copyLink = () => {
  copyInput.value?.select()
  const success = document.execCommand('copy')
  if (success) {
    isCopied.value = true
    setTimeout(() => {
      window.getSelection()?.removeAllRanges()
      isCopied.value = false
    }, 3000)
  }
}


</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://unicons.iconscout.com/release/v3.0.6/css/line.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body {
  background: #9143f8;
}
.view-modal,
.popup {
  position: absolute;
  left: 50%;
  z-index: 9999999;
}
button {
  outline: none;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  border: 2px solid transparent;
  transition: background 0.1s linear, border-color 0.1s linear, color 0.1s linear;
}
.view-modal {
  top: 10%;
  left: 90%;
  color: #e8e4ee;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 25px;
  background: rgb(113, 5, 156);
  transform: translate(-50%, -50%);
}
.popup {
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  top: 10%;
  max-width: 380px;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%) scale(1.2);
  transition: top 0s 0.2s ease-in-out, opacity 0.2s 0s ease-in-out, transform 0.2s 0s ease-in-out;
}
.popup.show {
  top: 50%;
  left: 50%;
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
  transition: top 0s 0s ease-in-out, opacity 0.2s 0s ease-in-out, transform 0.2s 0s ease-in-out;
}
.popup :is(header, .icons, .field) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.popup header {
  padding-bottom: 15px;
  border-bottom: 1px solid #ebedf9;
}
header span {
  font-size: 21px;
  font-weight: 600;
}
header .close,
.icons a {
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}
header .close {
  color: #878787;
  font-size: 17px;
  background: #f3f3f3;
  height: 33px;
  width: 33px;
  cursor: pointer;
}
header .close:hover {
  background: #ebedf9;
}
.popup .content {
  margin: 20px 0;
}
.popup .icons {
  margin: 15px 0 20px 0;
}
.content p {
  font-size: 16px;
}
.content .icons a {
  height: 50px;
  width: 50px;
  font-size: 20px;
  text-decoration: none;
  border: 1px solid transparent;
}
.icons a i {
  transition: transform 0.3s ease-in-out;
}
.icons a:nth-child(1) {
  color: #1877f2;
  border-color: #b7d4fb;
}
.icons a:nth-child(1):hover {
  background: #1877f2;
}
.icons a:nth-child(2) {
  color: #46c1f6;
  border-color: #b6e7fc;
}
.icons a:nth-child(2):hover {
  background: #46c1f6;
}
.icons a:nth-child(3) {
  color: #e1306c;
  border-color: #f5bccf;
}
.icons a:nth-child(3):hover {
  background: #e1306c;
}
.icons a:nth-child(4) {
  color: #25d366;
  border-color: #bef4d2;
}
.icons a:nth-child(4):hover {
  background: #25d366;
}
.icons a:nth-child(5) {
  color: #0088cc;
  border-color: #b3e6ff;
}
.icons a:nth-child(5):hover {
  background: #0088cc;
}
.icons a:hover {
  color: #fff;
  border-color: transparent;
}
.icons a:hover i {
  transform: scale(1.2);
}
.content .field {
  margin: 12px 0 -5px 0;
  height: 45px;
  border-radius: 4px;
  padding: 0 5px;
  border: 1px solid #757171;
}
.field.active {
  border-color: #7d2ae8;
}
.field i {
  width: 50px;
  font-size: 18px;
  text-align: center;
}
.field.active i {
  color: #7d2ae8;
}
.field input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 15px;
}
.field button {
  color: #fff;
  padding: 5px 18px;
  background: #7d2ae8;
}
.field button:hover {
  background: #8d39fa;
}
</style>
