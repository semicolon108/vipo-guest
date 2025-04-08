import { ref, reactive } from 'vue'

const toasts = ref<any[]>([])
const timeout = 5000

const showToast = (message: string, type: string = 'success') => {
    const id = Date.now()

    // Wrap the toast in reactive()
    const toast = reactive({
        id,
        message,
        type,
        active: false,
    })

    toasts.value.push(toast)

    // Let Vue catch reactivity
    setTimeout(() => {
        toast.active = true
    }, 10)

    setTimeout(() => {
        toast.active = false
    }, timeout)

    setTimeout(() => {
        const i = toasts.value.findIndex(t => t.id === id)
        if (i !== -1) toasts.value.splice(i, 1)
    }, timeout + 400)
}

const removeToast = (index: number) => {
    const toast = toasts.value[index]
    if (toast) {
        toast.active = false
        setTimeout(() => {
            toasts.value.splice(index, 1)
        }, 400)
    }
}

const getIcon = (type: string) => {
    switch (type) {
        case 'success': return 'check-circle-fill'
        case 'error': return 'x-circle-fill'
        case 'warning': return 'exclamation-triangle-fill'
        case 'info': return 'info-circle-fill'
        default: return 'check-circle-fill'
    }
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export function useToast() {
    return {
        toasts,
        showToast,
        removeToast,
        getIcon,
        capitalize,
    }
}
