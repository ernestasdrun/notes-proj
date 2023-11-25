import React from "react";
import { FormHelperText, styled, OutlinedInput, FormControl, InputLabel } from "@mui/material";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

declare module "@mui/material/InputBase" {
    interface InputBasePropsColorOverrides {
        fieldFocus: true;
    }
}

declare module "@mui/material/FormLabel" {
    interface FormLabelPropsColorOverrides {
        fieldFocus: true;
    }
}

interface TextInputFieldProps {
    variant?: "standard" | "outlined" | "filled" | undefined,
    isFullWidth: boolean,
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    errMessage?: string,
    [x: string]: unknown,
}

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: "12px",
}));

const TextInputField = ({ variant, isFullWidth, name, label, register, registerOptions, error, errMessage, ...props }: TextInputFieldProps) => {
    return (

        <FormControl sx={{ m: "8px 0", minWidth: '25ch' }} fullWidth={isFullWidth} variant={variant}>
            <InputLabel size="small" color="fieldFocus" error={!!error}>{label}</InputLabel>
            <StyledTextField
                {...props}
                label={label}
                {...register(name, registerOptions)}
                error={!!error}
                color="fieldFocus"
            />
            {error?.type == "required" &&
                <FormHelperText
                    error
                >Field is required</FormHelperText>}
            {error?.type != ("required" || undefined) && <FormHelperText error>{errMessage}</FormHelperText>}
        </FormControl>
    );
};

export default TextInputField;