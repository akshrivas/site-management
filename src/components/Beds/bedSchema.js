import moment from "moment";
import * as yup from "yup";

const validationSchema = yup.object({
  bedNumber: yup.number().required("This field is required.").nullable(),
  // createDate: yup.string().required("This field is required."),
  // status: yup.string().required("This field is required."),
  // bedWidth: yup.number().required("This field is required."),
  // bedLength: yup.number().required("This field is required."),
  // fillDate: yup.string().when("status", {
  //   is: (a) => a !== "Empty",
  //   then: yup.string().required("This field is required"),
  // }),
  // wormsAddedOn: yup.string().when("status", {
  //   is: (a) => !["Empty", "Filled"].includes(a),
  //   then: yup.string().required("This field is required"),
  // }),
  // requiredWorms: yup.string(),
  // temperature: yup.string().required(),
  // wormCount: yup.string(),
});

export const initialValues = {
  bedNumber: null,
  status: "Filled",
  bedWidth: 4,
  bedLength: 40,
  // fillDate: moment().format(DATE_FORMAT_FIELDS),
  wormsAddedOn: moment(),
  // requiredWorms: "",
  // temperature: "",
  // wormCount: "",
};

// const schema = {
//   initialValues,
//   validationSchema
// };

export default validationSchema;
