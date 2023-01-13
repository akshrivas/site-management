import * as yup from "yup";
import ProfileData from "src/json/profileData";

export const profileSchema = yup.object({
  name: yup.string().required("Name is required."),
  mobile: yup.number().required("This field is reuired."),
  address: yup.string().required("This field is reuired."),
  labourCostPerDay: yup.number().required("This field is reuired."),
  dumperCost: yup.number().required("This field is reuired."),
  trollyCost: yup.number().required("This field is reuired."),
  trollyBananaLeavesCost: yup.number().required("This field is reuired."),
  rakeReminderInDays: yup.number().required("This field is reuired."),
  firstHarvestDays: yup.number().required("This field is reuired."),
  secondHarvestDays: yup.number().required("This field is reuired."),
  finalHarvestDays: yup.number().required("This field is reuired."),
});

export const profileInitialValues = ProfileData;
