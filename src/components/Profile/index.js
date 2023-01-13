import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { urlConstants } from "src/config";
import useUid from "src/utils/useUid";
import { profileInitialValues, profileSchema } from "./ProfileSchema";

const Profile = () => {
  const uid = useUid();
  const handleSubmit = (values) => {
    axios
      .put(`${urlConstants.usersOps}/${uid}`, {
        ...values,
      })
      .then(() => {
        // console.log(response);
        // setSaving(false);
        // if (response.status === 200) {
        //   handleEditClose();
        // }
      })
      .catch(() => {
        // setSaving(false);
      });
  };
  const formik = useFormik({
    initialValues: profileInitialValues,
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit({
        name: values.name,
        mobile: values.mobile,
        address: values.address,
      });
    },
  });
  return (
    <Box
      component="form"
      sx={{ p: 2 }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Grid container columnGap={2} rowGap={2}>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            type="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
            helperText={formik.errors.name}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            type="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.errors.mobile}
            helperText={formik.errors.mobile}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            type="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
            helperText={formik.errors.address}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="Labout cost per day"
            id="labourCostPerDay"
            name="labourCostPerDay"
            type="number"
            value={formik.values.labourCostPerDay}
            onChange={formik.handleChange}
            error={formik.errors.labourCostPerDay}
            helperText={formik.errors.labourCostPerDay}
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="Dumper(Cow Dung) cost"
            id="dumperCost"
            name="dumperCost"
            type="number"
            value={formik.values.dumperCost}
            onChange={formik.handleChange}
            error={formik.errors.dumperCost}
            helperText={formik.errors.dumperCost}
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="Trolly(Cow Dung) cost"
            id="trollyCost"
            name="trollyCost"
            type="number"
            value={formik.values.trollyCost}
            onChange={formik.handleChange}
            error={formik.errors.trollyCost}
            helperText={formik.errors.trollyCost}
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="Troll(Banana leaves) cost"
            id="trollyBananaLeavesCost"
            name="trollyBananaLeavesCost"
            type="number"
            value={formik.values.trollyBananaLeavesCost}
            onChange={formik.handleChange}
            error={formik.errors.trollyBananaLeavesCost}
            helperText={formik.errors.trollyBananaLeavesCost}
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="Rake reminder in days"
            id="rakeReminderInDays"
            name="rakeReminderInDays"
            type="number"
            value={formik.values.rakeReminderInDays}
            onChange={formik.handleChange}
            error={formik.errors.rakeReminderInDays}
            helperText={formik.errors.rakeReminderInDays}
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="First harverst (after days)"
            id="firstHarvestDays"
            name="firstHarvestDays"
            type="number"
            value={formik.values.firstHarvestDays}
            onChange={formik.handleChange}
            error={formik.errors.firstHarvestDays}
            helperText={formik.errors.firstHarvestDays}
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="Second harverst (after days)"
            id="secondHarvestDays"
            name="secondHarvestDays"
            type="number"
            value={formik.values.secondHarvestDays}
            onChange={formik.handleChange}
            error={formik.errors.secondHarvestDays}
            helperText={formik.errors.secondHarvestDays}
            fullWidth
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            variant="outlined"
            label="Final harverst (after days)"
            id="finalHarvestDays"
            name="finalHarvestDays"
            type="number"
            value={formik.values.finalHarvestDays}
            onChange={formik.handleChange}
            error={formik.errors.finalHarvestDays}
            helperText={formik.errors.finalHarvestDays}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!formik.dirty}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
