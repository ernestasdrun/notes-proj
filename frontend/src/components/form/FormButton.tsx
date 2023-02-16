import React from 'react';
import { Typography, TextField, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

interface FormButtonProps {
    label: string,
    isDisabled: boolean,
    [x: string]: any,
}

const StyledFormButton = styled(Button)(({ theme }) => ({
    borderRadius: "8px",
    transitionProperty: "box-shadow, transform, background-color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
    ":hover": {
        boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.5)",
        transform: "translateY(-1px)",
        backgroundColor: theme.palette.button.light,
    },
    ":active": {
        boxShadow: "none",
        transform: "translateY(1px)",
        backgroundColor: theme.palette.button.dark,
    },
    ":focus-visible": {
        backgroundColor: theme.palette.button.light,
        outline: `3px solid ${theme.palette.border.main}`,
        outlineOffset: "3px",
    },
}))

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        button: true;
    }
}

const FormButton = ({ label, isDisabled, ...props }: FormButtonProps) => {

    return (
        <StyledFormButton
            {...props}
            disableRipple
            type="submit"
            variant="contained"
            disabled={isDisabled}
            disableElevation
            color="button"
        >
            {label}
        </StyledFormButton>
    );
}

export default FormButton;