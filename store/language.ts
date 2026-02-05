import { defineStore } from 'pinia'
import * as yup from "yup"
import useFetchCustom from '@/utils/global-useFetch'

export const useLanguageStore = defineStore('language', () => {
    const isLoading = ref(false)
    const languageSkill = ref<any[]>([])
    const errorsList = ref<any[]>([])
    const route = useRoute()
    const schema = yup.object({
        languages: yup.array().of(
            yup.object({
                LanguageId: yup.string().required("Language field is required"),
                LanguageLevelId: yup.string().required("Language Level field is required")
            })
        )
    })

    // ✅ Validation & submit
    const submitStep5Form = async () => {
        try {
            errorsList.value = []

            // Validate with yup
            await schema.validate({ languages: languageSkill.value }, { abortEarly: false })

            // If valid, submit
            isLoading.value = true
            const form = { languages: languageSkill.value, event: route.query.event as string }

            const res = await useFetchCustom('update-language-skills-seeker-web').post(form).json()
            isLoading.value = false

            return res
        } catch (err: any) {
            isLoading.value = false
            if (err.inner && Array.isArray(err.inner)) {
                const tempErrors: any[] = []
                err.inner.forEach((e: any) => {
                    const match = e.path.match(/languages\[(\d+)\]\.(.*)/)
                    if (match) {
                        const index = Number(match[1])
                        const field = match[2]
                        if (!tempErrors[index]) tempErrors[index] = {}
                        tempErrors[index][field] = e.message
                    }
                })
                errorsList.value = tempErrors
            } else {
                console.error(err)
            }
            throw err
        }
    }

    return {
        languageSkill,
        errorsList,
        isLoading,
        submitStep5Form
    }
})