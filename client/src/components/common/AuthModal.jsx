import React, { useEffect, userState } from "react";
import { Box, Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

export const AuthModal = ({ theme }) => {
  const actionState = {
    signin: "signin",
    signup: "signup",
  };

  const { authModalOpen } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();
  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [actionState.signin, authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  console.log("authModalOpen", authModalOpen);

  const switchAuthState = (state) => setAction(state);
  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <Logo theme={theme} />
          </Box>
          {action === actionState.signin && (
            <SigninForm
              switchAuthState={() => switchAuthState(actionState.signup)}
            />
          )}
          {action === actionState.signup && (
            <SignupForm
              switchAuthState={() => switchAuthState(actionState.signin)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
