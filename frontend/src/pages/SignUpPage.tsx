import React, { useState } from "react";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextInputField from "../components/form/TextInputField";
import Footer from "../features/footer/Footer";
import Navbar from "../features/navbar/Navbar";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormButton from "../components/form/FormButton";
import * as UserApi from "../network/users_api";
import { useNavigate } from "react-router-dom";
import NavigationLink from "../components/links/NavigationLink";
import { useDispatch } from "react-redux";
import { setUser } from "../state";

const SignUpPage = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UserApi.SignUpCredentials>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  async function onSubmit(input: UserApi.SignUpCredentials) {
    try {
      if (input.password === input.passwordConfirm) {
        delete input["passwordConfirm"];
        await UserApi.signUp(input).then((user) => dispatch(setUser(user)));
        navigate("/home");
      } else {
        setError("passwordConfirm", {
          type: "manual",
          message: "Passwords do not match"
        });
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Stack alignItems="center" direction="column" flexGrow={1} textAlign="center">
        <Typography variant="h1" fontSize="2.5rem" p="8vh 2rem 2.5rem 3rem">Welcome, please Sign Up here</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="column" alignItems="center">
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
              type="email"
              name="email"
              label="Email"
              size="small"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
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
            <TextInputField
              isFullWidth={false}
              variant="outlined"
              type="password"
              name="passwordConfirm"
              label="Confirm password"
              size="small"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.passwordConfirm}
              errMessage={errors?.passwordConfirm?.message}
            />
            <FormButton label="SIGN UP" isDisabled={isSubmitting} sx={{ marginTop: "2rem", width: "140px" }} />
          </Stack>
        </form>
        <Typography variant="body1" mt="5vh">Already have account?&nbsp;
          <NavigationLink title="login" to="/login" text="Sign In" />
        </Typography>
      </Stack>
      <Box sx={{ position: "relative", left: 0, bottom: 0, right: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default SignUpPage;