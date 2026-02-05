import { defineStore } from 'pinia'
import { useForm } from "vee-validate";
import * as yup from "yup";
import useFetchCustom from '@/utils/global-useFetch'

export const usepreferreJobStore = defineStore('preferreJob', () => {
    const isLoading = ref<any>(false)
    const currency = ref<any>("₭")
    const route = useRoute()
    // Step 2
    const schema = yup.object({
        currentJobTitle: yup.string().required("current Job Title field is required"),
        expectedSalary: yup.string().required("expected Salary field is required"),
        provinceId: yup.string().required("provinceId field is required"),
        industryId: yup.string().required("industryId field is required")
    })
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
            currentJobTitle: "",
            expectedSalary: 0,
            provinceId: "",
            industryId: ""
        }
    })

    const [currentJobTitle, currentJobTitleProps] = defineField('currentJobTitle')
    const [expectedSalary, expectedSalaryProps] = defineField('expectedSalary')
    const [provinceId, provinceIdProps] = defineField('provinceId')
    const [industryId, industryIdProps] = defineField('industryId')

    const submitStep2Form = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await handleSubmit(async (values: any, { resetForm }) => {
                    isLoading.value = true
                    const form: any = {
                        currency: currency.value,
                        currentJobTitle: values.currentJobTitle,
                        expectedSalary: values.expectedSalary,
                        genderId: values.genderId,
                        provinceId: [values.provinceId],
                        industryId: [values.industryId],
                        benefitsId: [],
                        jobFunctionId: [],
                        jobLevelId: null,
                        event: route.query.event as string
                    }
                    // Example API call
                    const res = await useFetchCustom('add-seeker-work-preferences-web').post(form).json()
                    // Success
                    isLoading.value = false
                    resolve(res)
                })()
            } catch (error) {
                isLoading.value = false
                console.error(error)
                reject(error)
            }
        })
    }
    //End Step 2

    return {
        isLoading,
        currentJobTitle,
        currency,
        currentJobTitleProps,
        expectedSalary,
        expectedSalaryProps,
        provinceId,
        provinceIdProps,
        industryId,
        industryIdProps,
        setErrors,
        handleReset,
        setFieldValue,
        errors,
        validate,
        submitStep2Form,
    }
})