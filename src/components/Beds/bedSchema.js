import * as yup from 'yup';
const bedSchema = yup.object({
    bedNumber: yup.number().required('This field is required.'),
    bedWidth: yup.number().required('This field is required.'),
    bedLength: yup.number().required('This field is required.'),
    fillDate: yup.string(),
    wormsAddedOn: yup.string(),
    temprature: yup.string(),
    wormCount: yup.string(),
    rakeReminder: yup.number(),
    harvestingReminder: yup.number(),
  });

export default bedSchema;