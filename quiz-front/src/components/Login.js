import React from "react";
import { Formik, Form } from "formik";
import { Button, TextField, Typography, Box } from "@mui/material";
import * as Yup from "yup";

const Login = () => {
  const submitForm = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };
  const validationFields = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  })
  const initialValues = {
    email: "",
    password: "",
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationFields}
      onSubmit={submitForm}
    >
      {({ values, touched, handleChange, errors, setFieldValue }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
          >
            <Box
              sx={{
                borderRadius: 6,
                backgroundColor: "#262626",
                p: 5,
              }}
            >
              <Typography variant="h3" sx={{ pb: 2 }}>
                Quiz App
              </Typography>

              <Form>
                <TextField
                  fullWidth
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.password)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    mt: 2,
                  }}
                >
                  Submit
                </Button>
              </Form>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Login;
