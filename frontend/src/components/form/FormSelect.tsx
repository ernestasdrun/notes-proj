import React from "react";
import { FormHelperText, styled, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { IUser } from "../../features/auth/authSlice";
import { Group } from "../../models/group";

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

interface FormSelectProps {
    variant?: "standard" | "outlined" | "filled" | undefined,
    isFullWidth: boolean,
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    errMessage?: string,
    categoryContainer: IUser | Group,
    [x: string]: unknown,
}

const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: "12px",
}));

const FormSelect = ({ variant, isFullWidth, name, label, register, registerOptions, error, errMessage, categoryContainer, ...props }: FormSelectProps) => {
    const user = useAppSelector((state) => state.auth.user) as IUser;

    return (
        <FormControl sx={{ m: "8px 0", minWidth: '25ch' }} fullWidth={isFullWidth} variant={variant}>
            <InputLabel size="small" color="fieldFocus" error={!!error}>{label}</InputLabel>
            <StyledSelect
                {...props}
                label={label}
                {...register(name, registerOptions)}
                error={!!error}
                color="fieldFocus"
            >
                {categoryContainer &&
                    categoryContainer.categories.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))
                }
            </StyledSelect>
            {error?.type == "required" &&
                <FormHelperText
                    error
                >Field is required</FormHelperText>}
            {error?.type != ("required" || undefined) && <FormHelperText error>{errMessage}</FormHelperText>}
        </FormControl>
    );
};

export default FormSelect;