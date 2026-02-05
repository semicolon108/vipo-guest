
import { defineStore } from 'pinia'
import { useForm } from "vee-validate";
import * as yup from "yup";
import useFetchCustom from '@/utils/global-useFetch'

export const useEducationStore = defineStore('education', () => {
    const isLoading = ref<any>(false)
    const route = useRoute()
    // Step 4
    const schema = yup.object({
        _id: yup.string().nullable(),
        subject: yup.string().required("Subject field is required"),
        school: yup.string().required("School field is required"),
        startYear: yup.string().required("Start Year field is required"),
        endYear: yup.string().nullable(),
        qualifications: yup.string().required("Qualifications field is required"),
        currentlyStudying: yup.boolean()
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
            subject: "",
            school: "",
            startYear: "",
            endYear: "",
            qualifications: "",
            currentlyStudying: false
        }
    })

    // Define fields for binding
    const [_id, _idProps] = defineField('_id')
    const [subject, subjectProps] = defineField('subject')
    const [school, schoolProps] = defineField('school')
    const [startYear, startYearProps] = defineField('startYear')
    const [endYear, endYearProps] = defineField('endYear')
    const [qualifications, qualificationsProps] = defineField('qualifications')
    const [currentlyStudying, currentlyStudyingProps] = defineField('currentlyStudying')

    // Submit function
    const onSubmit = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                await handleSubmit(async (values: any) => {
                    isLoading.value = true

                    const form = {
                        _id: values._id,
                        subject: values.subject,
                        school: values.school,
                        startYear: values.startYear,
                        endYear: values.endYear,
                        qualifications: values.qualifications,
                        currentlyStudying: values.currentlyStudying,
                        event: route.query.event as string
                    }

                    const res = await useFetchCustom('create-educations-seeker-web').post(form).json()

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

    const deleteEducationItem = async (id: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await useFetchCustom('delete-educations-seeker-web/' + id).delete().json()
                resolve(res)
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    }
    //End Step 4
    return {
        _id,
        _idProps,
        subject,
        subjectProps,
        school,
        schoolProps,
        startYear,
        startYearProps,
        endYear,
        endYearProps,
        qualifications,
        qualificationsProps,
        currentlyStudying,
        setErrors,
        handleReset,
        setFieldValue,
        errors,
        validate,
        onSubmit,
        isLoading,
        deleteEducationItem
    }
})