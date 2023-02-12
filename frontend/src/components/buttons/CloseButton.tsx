import React from 'react';
import { styled } from '@mui/system';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface CloseButtonProps {
    size?: "small" | "inherit" | "medium" | "large" | undefined,
    [x: string]: any,
}

const StyledIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    padding: 0,
    ":hover": {
        color: theme.palette.neutral.red,
    },

    ":focus-visible": {
        outline: `3px solid ${theme.palette.border.main}`,
    },
}))

const CloseButton = ({ size, ...props }: CloseButtonProps) => {

    return (
        <StyledIconButton
            {...props}
            disableRipple
        >
            <CloseIcon fontSize={size}/>
        </StyledIconButton>
    );
}

export default CloseButton;