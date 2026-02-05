import { defineStore } from 'pinia'
import * as yup from "yup"
import useFetchCustom from '@/utils/global-useFetch'

export const useSkillStore = defineStore('skill', () => {
    const isLoading = ref(false)
    const skills = ref<any[]>([]) // new field
    const errorsList = ref<any[]>([])
    const route = useRoute()
    // ✅ Yup schema for array of skills
    const schema = yup.object({
        skills: yup.array().of(
            yup.object({
                keySkill: yup.string().required("Skill field is required"),
                skillLevelId: yup.string().required("Skill Level field is required")
            })
        )
    })

    const submitStep6Form = async () => {
        try {
            errorsList.value = []

            // Validate with yup
            await schema.validate({ skills: skills.value }, { abortEarly: false })

            // If valid, submit
            isLoading.value = true
            const form = { skills: skills.value, event: route.query.event as string }

            const res = await useFetchCustom('update-skills-seeker-web').post(form).json()
            isLoading.value = false

            return res
        } catch (err: any) {
            if (err.inner && Array.isArray(err.inner)) {
                const tempErrors: any[] = []
                err.inner.forEach((e: any) => {
                    const match = e.path.match(/skills\[(\d+)\]\.(.*)/)
                    if (match) {
                        const index = Number(match[1])
                        const field = match[2]
                        if (!tempErrors[index]) tempErrors[index] = {}
                        tempErrors[index][field] = e.message
                    }
                })
                errorsList.value = tempErrors
            } else {
                isLoading.value = false
                console.error(err)
            }
        }
    }

    return {
        skills,
        errorsList,
        isLoading,
        submitStep6Form
    }
})
