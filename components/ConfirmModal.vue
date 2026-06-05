<template>
  <Teleport to="body">
    <div class="confirm-modal" v-if="isConfirmVisible" @click.self="handleCancel">
      <div class="confirm-modal-box">
        <div class="confirm-modal-icon">
          <i class="fa-regular fa-circle-question"></i>
        </div>
        <h3 class="confirm-modal-title">{{ confirmTitle }}</h3>
        <p class="confirm-modal-desc" v-html="confirmDesc"></p>
        <div class="confirm-modal-actions">
          <button class="btn-confirm-cancel" @click="handleCancel">
            ຍົກເລີກ
          </button>
          <button class="btn-confirm-ok" @click="handleConfirm">
            ຍືນຍັນ
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useConfirmModal } from '~/composables/useConfirmModal'

const { isConfirmVisible, confirmTitle, confirmDesc, handleConfirm, handleCancel } = useConfirmModal()
</script>

<style scoped lang="scss">
.confirm-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  .confirm-modal-box {
    background-color: #fff;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    padding: 1.75rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: modalScale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .confirm-modal-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--primary-100);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    i {
      font-size: 1.75rem;
      color: var(--primary-500);
    }
  }

  .confirm-modal-title {
    font-size: var(--lg-font);
    font-weight: 700;
    color: var(--black-900);
    margin-bottom: 0.5rem;
    font-family: var(--font-family);
  }

  .confirm-modal-desc {
    font-size: var(--sm-font);
    color: var(--black-700);
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-family: var(--font-family);

    strong {
      color: var(--primary-500);
      font-weight: 700;
    }
  }

  .confirm-modal-actions {
    display: flex;
    width: 100%;
    gap: 0.75rem;

    button {
      flex: 1;
      height: 42px;
      border-radius: 21px;
      font-size: var(--sm-font);
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: var(--font-family);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }

    .btn-confirm-cancel {
      background-color: var(--black-100);
      border: 1px solid var(--black-300);
      color: var(--black-700);

      &:hover:not(:disabled) {
        background-color: var(--black-200);
        color: var(--black-900);
      }
    }

    .btn-confirm-ok {
      background-color: var(--primary-500);
      border: 1px solid var(--primary-500);
      color: #fff;
      box-shadow: 0 4px 10px rgba(255, 109, 0, 0.2);

      &:hover:not(:disabled) {
        background-color: var(--primary-600);
        border-color: var(--primary-600);
        box-shadow: 0 6px 14px rgba(255, 109, 0, 0.3);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
}

@keyframes modalScale {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
