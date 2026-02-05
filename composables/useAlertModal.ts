
import { useI18n } from 'vue-i18n'

type Status = 'success' | 'warning' | 'error' | 'info'

type ModalOptions = {
  title: string
  description: string
  status?: Status
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
}

const visible = ref(false)

const options = ref<ModalOptions>({
  title: '',
  description: '',
  status: 'info',
  cancelText: 'Cancel',
  confirmText: 'OK'
})

function openModal(opts: ModalOptions) {
  options.value = {
    status: 'info',
    cancelText: 'Cancel',
    confirmText: 'OK',
    ...opts
  }
  visible.value = true
}

function closeModal() {
  visible.value = false
}

export function useAlertModal() {
  const router = useRouter()
  const { t } = useI18n()


  const openDefaultConfirmModal = (opts?: any) => {
    openModal({
      title: 'Are you sure?',
      description: 'This action cannot be undone.',
      status: 'warning',
      cancelText: t('cancel-confirm-modal'),
      confirmText: t('ok'),
      ...opts
    })
  }


  const openDefaultLoginModal = (opts?: any) => {
    openModal({
      title: t('login_require_title'),
      description: t('login_require_text'),
      status: 'warning',
      cancelText: t('cancel'),
      confirmText: t('login'),
      onConfirm: () => {
        router.push('/auth/login')
        closeModal()
      },
      ...opts
    })
  }



  const openDefaultModal = (opts?: any) => {
    let title = ''
    let description = ''

    switch (opts.status) {
      case 'success':
        title = 'Success!'
        description = 'Your operation was completed.'
        break
      case 'info':
        title = 'Info!'
        description = 'Your operation was completed.'
        break
      case 'warning':
        title = 'Warning!'
        description = 'Something went wrong.'
        break
      case 'error':
        title = 'Error!'
        description = 'Something went wrong.'
        break
    }

    if (opts.title) title = opts.title
    if (opts.description) description = opts.description

    openModal({
      title,
      description,
      status: opts.status
    })

    // openModal({
    //   title,
    //   description,
    //   status: opts.status,
    //   cancelText: 'Cancel',
    //   confirmText: 'OK',
    //   ...opts
    // })

    setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  return {
    visible,
    options,
    openModal,
    closeModal,

    openDefaultModal,
    openDefaultConfirmModal,
    openDefaultLoginModal
    //  openDefaultLoginModal
  }
}
