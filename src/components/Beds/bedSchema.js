import * as yup from 'yup';

const validationSchema = yup.object({
    bedNumber: yup.number().required('This field is required.').nullable(),
    createDate: yup.string().required('This field is required.'),
    status: yup.string().required('This field is required.'),
    bedWidth: yup.number().required('This field is required.'),
    bedLength: yup.number().required('This field is required.'),
    fillDate: yup.string().when("status", {
      is: (a) => a !== 'Empty',
      then: yup.string().required('This field is required')
    }),
    wormsAddedOn: yup.string().when("status", {
      is: (a) => !['Empty', 'Filled'].includes(a),
      then: yup.string().required('This field is required')
    }),
    requiredWorms: yup.string(),
    temperature: yup.string().when("status", {
      is: (a) => a === 'In Progress',
      then: yup.string().required('This field is required')
    }),
    wormCount: yup.string(),
  });

export const initialValues = {
  bedNumber: null,
  createDate: '',
  status: 'Empty',
  bedWidth: '',
  bedLength: '',
  fillDate: '',
  wormsAddedOn: '',
  requiredWorms: '',
  temperature: '',
  wormCount: '',
};

// const schema = {
//   initialValues,
//   validationSchema
// };

export default validationSchema;