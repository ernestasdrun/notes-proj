import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState, useEffect } from 'react';
import TextInputField from '../../components/form/TextInputField';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/Navbar';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../network/users_api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormButton from '../../components/form/FormButton';
import * as UserApi from '../../network/users_api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationLink from '../../components/links/NavigationLink';

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserApi.SignUpCredentials>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  async function onSubmit(input: LoginCredentials) {
    try {
      const user = await UserApi.login(input).then((user) => { console.log(user) });
      //TODO add user logic to sav ein redux etc...
      navigate("/test");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Stack alignItems="center" direction="column" flexGrow={1}>
        <Typography variant="h2" p="5rem 2rem 2.5rem 3rem">Welcome, please Sign Up here</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="column" alignItems="center">
            <TextInputField
              type="text"
              name="username"
              label="Username"
              size="small"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />
            <TextInputField
              type="email"
              name="email"
              label="Email"
              size="small"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
            />
            <TextInputField
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
            <FormButton label="SIGN UP" isDisabled={isSubmitting} sx={{ marginTop: "1rem", width: "140px" }} />
          </Stack>
        </form>
        <Typography variant="body1" pt={4}>Already have account?&nbsp;
          <NavigationLink title="login" to="/login" text="Sign In" />
        </Typography>
      </Stack>
      <Box sx={{ position: "relative", left: 0, bottom: 0, right: 0 }}>
        <Footer />
      </Box>
    </Box>
  )
}

export default SignUpPage;