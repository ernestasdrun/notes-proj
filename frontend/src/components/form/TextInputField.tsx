import React, { useState } from 'react';
import { Typography, TextField, FormHelperText, styled, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

/*
        <>
            <Typography variant="h5" fontSize="1.3rem">{label}</Typography>
            <StyledTextField
                {...props}
                {...register(name, registerOptions)}
                error={!!error}
                />
            {error?.type == "required" && 
                <FormHelperText 
                    error
                    sx={{ pb: 3 }}>Field is required</FormHelperText>}
        </>
*/


const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: "12px",
}))


const TextInputField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => { 
    return (

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel size="small" color="secondary" error={!!error}>{label}</InputLabel>
            <StyledTextField
                {...props}
                label={label}
                {...register(name, registerOptions)}
                error={!!error}
                color="secondary"
            />
            {error?.type == "required" &&
                <FormHelperText
                    error
                >Field is required</FormHelperText>}
        </FormControl>
    );
}

export default TextInputField;