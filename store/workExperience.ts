
import { defineStore } from 'pinia'
import { useForm } from "vee-validate";
import * as yup from "yup";
import useFetchCustom from '@/utils/global-useFetch'

export const useWorkExperienceStore = defineStore('workExperience', () => {
    const isLoading = ref<any>(false)
    const route = useRoute()

    // Step 3
    const schema = yup.object({
        _id: yup.string().nullable(),
        company: yup.string().required("Company field is required"),
        position: yup.string().required("Position field is required"),
        startYear: yup.string().required("Start Year field is required"),
        endYear: yup.string().nullable(),
        responsibility: yup.string().required("Responsibility field is required"),
        isCurrentJob: yup.boolean()
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
            _id: "",
            company: "",
            position: "",
            startYear: "",
            endYear: "",
            responsibility: "",
            isCurrentJob: false
        }
    })
    const [_id, _idProps] = defineField('_id')
    const [company, companyProps] = defineField('company')
    const [position, positionProps] = defineField('position')
    const [startYear, startYearProps] = defineField('startYear')
    const [endYear, endYearProps] = defineField('endYear')
    const [responsibility, responsibilityProps] = defineField('responsibility')
    const [isCurrentJob, isCurrentJobProps] = defineField('isCurrentJob')
    const onSubmit = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                await handleSubmit(async (values: any, { resetForm }) => {
                    isLoading.value = true
                    const form: any = {
                        _id: values._id,
                        company: values.company,
                        startYear: values.startYear,
                        endYear: values.endYear,
                        position: values.position,
                        responsibility: values.responsibility,
                        isCurrentJob: values.isCurrentJob,
                        event: route.query.event as string
                    }
                    // Example API call
                    const res = await useFetchCustom('create-workhistory-seeker-web').post(form).json()
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

    const deleteWorkExperienceItem = async (id: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await useFetchCustom('delete-workhistory-seeker-web/' + id).delete().json()
                resolve(res)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    }
    //End Step 3

    return {
        _id,
        company,
        companyProps,
        position,
        positionProps,
        startYear,
        startYearProps,
        endYear,
        endYearProps,
        responsibility,
        responsibilityProps,
        isCurrentJob,
        isCurrentJobProps,
        setErrors,
        handleReset,
        setFieldValue,
        errors,
        validate,
        onSubmit,
        isLoading,
        deleteWorkExperienceItem
    }
})