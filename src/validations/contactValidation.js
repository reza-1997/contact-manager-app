import * as yup from 'yup'

export const contactSchema=yup.object().shape({
    fullname:yup.string().required('نام و نام خانوادگی الزامی میباشد'),
    photo:yup.string().url(' آدرس معتبر نیست').required('تصویر مخاطب الزامی است'),
    mobile:yup.number().required('شماره موبایل الزامی است'),
    email:yup.string().email('آدرس ایمیل معتبر نیست').required(' ادرس ایمیل الزامی است'),
    job: yup.string().nullable(),
    group:yup.string().required('انتخاب گروه الزامی است'),
})