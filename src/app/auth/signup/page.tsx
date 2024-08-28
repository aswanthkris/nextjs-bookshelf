"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUserApi } from "api/auth/[...nextauth]";
import Link from "next/link";
const Signup: React.FC = () => {
  const [signupLoading, setSignupLoading] = useState(false);
  const initialValues = {
    name: "",
    phoneno: "",
    email: "",
    password: "",
  };
  const onSubmit = (values: object) => {
    signupApiCall(values);
  };
  const signupValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phoneno: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  //API CALL FUNCTIONS>>>
  const signupApiCall = async (payload: object) => {
    setSignupLoading(true);
    console.log("signup payload", payload);
    const response = await signupUserApi(payload);
    setSignupLoading(false);
    console.log("response", response);
  };
  return (
    <Box className={styles.outerContainer}>
      <Container className={styles.container} maxWidth="md">
        <Box className={styles.headingSection}>
          <Typography variant="h3" component="h1">
            Get Started with Your Book Adventures: Sign Up or Log In
          </Typography>
        </Box>
        <Box className={styles.formSection}>
          <Box className={styles.signupSection}>
            <Typography variant="h4" component="h2" gutterBottom color="white">
              Signup
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={signupValidationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="name"
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Full name"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{ style: { color: "white" } }}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Field
                    as={TextField}
                    name="phoneno"
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Phone Number"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{ style: { color: "white" } }}
                    error={touched.phoneno && !!errors.phoneno}
                    helperText={touched.phoneno && errors.phoneno}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Field
                    as={TextField}
                    name="email"
                    fullWidth
                    margin="normal"
                    type="text"
                    label="Email"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{ style: { color: "white" } }}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Field
                    as={TextField}
                    name="password"
                    fullWidth
                    margin="normal"
                    type="password"
                    label="Password"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{ style: { color: "white" } }}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    className={styles.gradientButton}
                    disabled={signupLoading}
                  >
                    Signup
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
        <Box>
          <Link href="/auth/login">Already a member? Please login.</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
