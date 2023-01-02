import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import userApi from "../api/modules/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { useFormik } from "formik";

function PasswordUpdate() {
  const [onRequest, setOnRequest] = useState(false);
  const { themeMode } = useSelector((state) => state.themeMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Minium 8 characters")
        .required("Password is required"),
      newPassword: Yup.string()
        .min(8, "Minium 8 characters")
        .required("Password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "confirmNewPassword not match")
        .min(8, "Minium 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => onPasswordChange(values),
  });

  const onPasswordChange = async (values) => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, error } = await userApi.passwordUpdate(values);

    if (error) {
      toast.error(error.message);
      setOnRequest(false);
    }
    if (response) {
      form.resetForm();
      navigate("/");
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success("New password changed. Re-login");
    }
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={"Change password"}>
        <Box onSubmit={form.handleSubmit} maxWidth={"400"} component={"form"}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder="New password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />

            <TextField
              type="password"
              placeholder="Confirm password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              loading={onRequest}
              variant={themeMode === "dark" ? "text" : "contained"}
            >
              Change
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default PasswordUpdate;
