import * as yup from 'yup'

export const taskSchema = yup.object().shape({
  title: yup
    .string()
    .max(50, '最大50文字です。')
    .required('タイトルは必須項目です。'),
  description: yup.string().max(100, '最大100文字です。'),
  completed: yup.boolean(),
})
