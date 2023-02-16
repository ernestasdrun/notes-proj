import { Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState, useEffect } from 'react';
import TextInputField from '../components/form/TextInputField';
import Footer from '../features/footer/Footer';
import Navbar from '../features/navbar/Navbar';
import { useForm } from 'react-hook-form';
import FormButton from '../components/form/FormButton';
import { useNavigate } from 'react-router-dom';
import NavigationLink from '../components/links/NavigationLink';

interface ReminderProps {
  email: string,
}

const RemindPasswordPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReminderProps>({
    defaultValues: {
      email: "",
    }
  });

  const navigate = useNavigate();

  async function onSubmit(input: ReminderProps) {
    try {
      //TODO Add logic for saving user in redux etc...
      //TODO add confirmation if email does not exist in database
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Stack alignItems="center" direction="column" flexGrow={1}>
        <Typography variant="h1" pt={10} pb={5}>Reset password</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="column" alignItems="center">
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
            <FormButton label="SEND RESET LINK" isDisabled={isSubmitting} sx={{ marginTop: "1rem", width: "200px" }} />
          </Stack>
        </form>
        <Typography variant="body1" pt="7vh">New User? Create new account&nbsp;
          <NavigationLink title="registration" to="/signup" text="here" />
        </Typography>
      </Stack>
      <Box sx={{ position: "relative", left: 0, bottom: 0, right: 0 }}>
        <Footer />
      </Box>
    </Box>
  )
}

export default RemindPasswordPage