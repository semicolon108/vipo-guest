<template>
  <div class="toast-container">
    <div
      class="toast active"
      v-for="(toast, index) in toasts"
      :key="toast.id"
      :class="['toast', toast.type, { active: toast.active }]"
    >
      <div class="toast-content">
        <div class="icon">
          <i
            class="fa-solid"
            :class="['fa-solid', `fa-${getIcon(toast.type)}`]"
          />
        </div>

        <div class="message">
          <span class="text text-1">{{ capitalize(toast.type) }}</span>
          <span class="text text-2">{{ toast.message }}</span>
        </div>
      </div>
      <i class="bi bi-x-lg close" @click="removeToast(index)" />
      <div class="progress" :class="{ active: toast.active }"></div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "@/composables/useToast";

const { toasts, removeToast, getIcon, capitalize } = useToast();
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 25px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.toast {
  position: relative;
  width: 320px;
  border-radius: 12px;
  background: #fff;
  padding: 20px 35px 20px 25px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow-x: hidden;
  align-items: center;
  transform: translateX(calc(100% + 30px));
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
}

.toast.active {
  transform: translateX(0%);
}

.toast .toast-content {
  display: flex;
  align-items: center;
}

.toast-content .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--deep-blue-900);
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
  border-radius: 999px;
  color: #fff;
}

.toast-content .message {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.message .text {
  font-size: var(--md-font);
  font-weight: 400;
  color: #666666;
  font-optical-sizing: auto;
}

.message .text.text-1 {
  font-weight: 700;
  color: var(--black-900);
}

.toast .close {
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
}

.toast .close:hover {
  opacity: 1;
}

.toast .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
}

.toast .progress:before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: var(--deep-blue-900);
}

.progress.active:before {
  animation: progress 5s linear forwards;
}

@keyframes progress {
  100% {
    right: 100%;
  }
}

.toast.success .icon {
  color: rgb(25 135 84);
}
.toast.error .icon {
  color: rgb(220 53 69);
}
.toast.warning .icon {
  color: rgb(255 193 7);
}
.toast.info .icon {
  color: rgb(13 202 240);
}

.toast.success .progress:before {
  background: rgb(25 135 84);
}
.toast.error .progress:before {
  background: rgb(220 53 69);
}
.toast.warning .progress:before {
  background: rgb(255 193 7);
}
.toast.info .progress:before {
  background: rgb(13 202 240);
}
</style>
