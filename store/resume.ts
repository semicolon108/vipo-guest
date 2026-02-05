import { defineStore } from 'pinia'
import { useForm } from "vee-validate";
import * as yup from "yup";
import useFetchCustom from '@/utils/global-useFetch'
import { useUserStore } from '@/store/user'

export const useResumeStore = defineStore('resume', () => {
    const userStore = useUserStore() // ✅ Access user store instance
    const route = useRoute()
    const isLoading = ref<boolean>(false)
    const error = ref<any>()
    const cvError = ref<any>()
    const checkUploadResume = ref<any>(false)
    const schema = yup.object({
        cv: yup
            .mixed()
            .required("CV file is required")
            .nullable(), // since default is null
        vipoCVStatus: yup
            .boolean()
            .required()
    })

    // ✅ vee-validate form setup
    const {
        handleSubmit,
        setFieldValue,
        errors,
        defineField,
        validate,
        setErrors,
        handleReset,
    } = useForm({
        validationSchema: schema,
        initialValues: {
            cv: null,
            vipoCVStatus: false,
        },
    })

    // ✅ Define fields
    const [cv, cvProps] = defineField('cv')
    const [vipoCVStatus, vipoCVStatusProps] = defineField('vipoCVStatus')


    // ✅ Submit handler
    const submitStep7Form = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await handleSubmit(async (values: any) => {
                    isLoading.value = true

                    const form = {
                        cv: null,
                        vipoCVStatus: values.vipoCVStatus,
                        event: route.query.event as string
                    }

                    if (checkUploadResume.value && !values.vipoCVStatus) form.cv = values.cv

                    if (!checkUploadResume.value && !values.vipoCVStatus && !userStore?.seekerInfo?.cv?.src) {
                        cvError.value = "Please upload your CV file first"
                        isLoading.value = false
                        setTimeout(() => { cvError.value = "" }, 4000)
                        return reject(cvError.value)
                    }

                    const { data } = await useFetchCustom('update-resume-file').post(form).json()

                    isLoading.value = false
                    if (!data.value) {
                        error.value = "Please review your information step by step and update it before creating your CV."
                        reject(error.value)
                    }
                    resolve(data.value)
                })()
            } catch (error) {

                isLoading.value = false

                console.error(error)
                reject(error)
            }
        })
    }

    return {
        isLoading,
        error,
        cvError,
        // fields
        cv,
        cvProps,
        vipoCVStatus,
        vipoCVStatusProps,
        checkUploadResume,
        // form helpers
        setErrors,
        handleReset,
        setFieldValue,
        errors,
        validate,
        submitStep7Form
    }
})
