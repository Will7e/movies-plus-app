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

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchemaa: Yup.object({
      username: Yup.string()
        .min(8, "username minium 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minium 8 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.errorMessage);
    },
  });

  return (
    <Box component="form">
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
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
        Sign in
      </LoadingButton>
      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default SigninForm;
