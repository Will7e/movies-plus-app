import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";
import * as Yup from "yup";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "password minium 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .min(8, "password minium 8 characters")
        .required("Confirm password is required"),
      username: Yup.string()
        .min(8, "username minium 8 characters")
        .required("Username is required"),

      displayName: Yup.string()
        .min(8, "username minium 8 characters")
        .required("Username is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      dispatch(setGlobalLoading(true))
      const { response, error } = await userApi.signup(values);
      setIsLoginRequest(false);
      dispatch(setGlobalLoading(false))
      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign up success");
      }

      if (error) setErrorMessage(error.message);
    },
  });
  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="User name"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.username &&
            signupForm.errors.username !== undefined
          }
          helperText={signupForm.touched.username && signupForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="Confirm passWord"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword !== undefined
          }
          helperText={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword
          }
        />
        <TextField
          type="displayName"
          placeholder="Display name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.displayName &&
            signupForm.errors.displayName !== undefined
          }
          helperText={
            signupForm.touched.displayName && signupForm.errors.displayName
          }
        />
      </Stack>

      <LoadingButton
        loading={isLoginRequest}
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
      >
        Sign Up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign in
      </Button>

      {errorMessage && (
        <Box>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
