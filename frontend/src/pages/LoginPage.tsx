import React, { useState, useEffect } from "react";
import { IconButton, InputAdornment, Stack, Typography, Box, Alert } from "@mui/material";
import TextInputField from "../components/form/TextInputField";
import Footer from "../features/footer/Footer";
import Navbar from "../features/navbar/Navbar";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormButton from "../components/form/FormButton";
import * as UserApi from "../network/users_api";
import { useNavigate } from "react-router-dom";
import NavigationLink from "../components/links/NavigationLink";
import { UnauthorizedError } from "../errors/http_errors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, reset } from "../features/auth/authSlice";
import LoadingState from "../components/loading/LoadingState";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserApi.LoginCredentials>({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const { user, isLoading, isSuccess, isError, message } = useAppSelector((state) => state.auth);

  const [errorText, setErrorText] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isError) {
      console.error(message)
    }
    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch])

  if (isLoading) {
    <LoadingState />
  }

  async function onSubmit(input: UserApi.LoginCredentials) {
    try {
      dispatch(loginUser(input));

    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Stack alignItems="center" direction="column" flexGrow={1}>
        <Typography variant="h1" pt={10} pb={5}>Sign in</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="column" alignItems="center">
            {errorText &&
              <Alert severity="error" variant="filled" sx={{ minWidth: "300px", margin: "0 10px 15px 10px" }}>{errorText}</Alert>
            }
            <TextInputField
              isFullWidth={false}
              variant="outlined"
              type="text"
              name="username"
              label="Username"
              size="small"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />
            <TextInputField
              isFullWidth={false}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              size="small"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormButton label="SIGN IN" isDisabled={isSubmitting} sx={{ marginTop: "1rem", width: "140px" }} />
          </Stack>
        </form>
        <Typography variant="body1" mt="10vh" mb="1rem">Forgot password?&nbsp;
          <NavigationLink title="remind password" to="/reset" text="Remind me" />
        </Typography>
        <Typography variant="body2">New User? Create new account&nbsp;
          <NavigationLink title="registration" to="/signup" text="here" />
        </Typography>
      </Stack>
      <Box sx={{ position: "relative", left: 0, bottom: 0, right: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default LoginPage;