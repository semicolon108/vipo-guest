
const isConfirmVisible = ref(false)
const confirmTitle = ref('')
const confirmDesc = ref('')
const confirmResolve = ref<((value: boolean) => void) | null>(null)
const isSubmitting = ref(false)

const openConfirm = (title: string, desc: string): Promise<boolean> => {
  confirmTitle.value = title
  confirmDesc.value = desc
  isConfirmVisible.value = true
  isSubmitting.value = false
  return new Promise((resolve) => {
    confirmResolve.value = resolve
  })
}

const handleConfirm = () => {
  isConfirmVisible.value = false
  if (confirmResolve.value) {
    confirmResolve.value(true)
    confirmResolve.value = null
  }
}

const handleCancel = () => {
  isConfirmVisible.value = false
  if (confirmResolve.value) {
    confirmResolve.value(false)
    confirmResolve.value = null
  }
}

const closeConfirm = () => {
  isConfirmVisible.value = false
  confirmResolve.value = null
}

export function useConfirmModal() {
  return {
    isConfirmVisible,
    confirmTitle,
    confirmDesc,
    isSubmitting,
    openConfirm,
    handleConfirm,
    handleCancel,
    closeConfirm
  }
}
