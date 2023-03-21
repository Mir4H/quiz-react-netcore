import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { Button, TextField, Typography, Box } from '@mui/material'
import * as Yup from 'yup'
import { createAPIendpoint, ENDPOINTS } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { context, setContext, resetContext } = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    resetContext()
  }, [])

  const submitForm = (values) => {
    createAPIendpoint(ENDPOINTS.player)
      .post(values)
      .then((res) => {
        setContext({ playerId: res.data.playerId })
        navigate('/quiz')
      })
      .catch((err) => console.log(err))
    console.log(JSON.stringify(values, null, 2))
  }
  const validationFields = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    name: Yup.string().required('Required')
  })
  const initialValues = {
    email: '',
    name: ''
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationFields} onSubmit={submitForm}>
      {({ values, touched, handleChange, errors, setFieldValue }) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Box
              sx={{
                borderRadius: 6,
                backgroundColor: '#262626',
                p: 5
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
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    mt: 2
                  }}
                >
                  Submit
                </Button>
              </Form>
            </Box>
          </Box>
        )
      }}
    </Formik>
  )
}

export default Login
