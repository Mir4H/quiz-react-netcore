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
    username: Yup.string().required("Required"),
  })
  const initialValues = {
    email: "",
    username: "",
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
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  id="username"
                  name="username"
                  label="Username"
                  variant="standard"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
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
