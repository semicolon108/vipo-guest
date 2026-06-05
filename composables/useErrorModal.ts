
const isErrorVisible = ref(false)
const errorTitle = ref('')
const errorDesc = ref('')

const openError = (title: string, desc: string) => {
  errorTitle.value = title
  errorDesc.value = desc
  isErrorVisible.value = true
}

const closeError = () => {
  isErrorVisible.value = false
}

export function useErrorModal() {
  return {
    isErrorVisible,
    errorTitle,
    errorDesc,
    openError,
    closeError
  }
}
