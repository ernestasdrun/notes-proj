import React from "react";
import { ToggleButtonGroup, ToggleButton, styled } from '@mui/material';
import { Group } from "../../../models/group";

interface MobileSidebarProps {
    alignment: string,
    currentContent: Group | null,
    setAlignment: (alignment: string) => void,
    setCurrentContent: React.Dispatch<React.SetStateAction<Group | null>>,
}

const StyledTogleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    padding: "4px 10px 0 10px",

    "& .MuiToggleButton-root:focus-visible": {
        outline: `3px solid ${theme.palette.border.main}`,
    },
}));

const MobileSidebar = ({ alignment, currentContent, setAlignment, setCurrentContent }: MobileSidebarProps) => {

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string,
    ) => {
        setAlignment(newValue);
    };

    return (
        <StyledTogleGroup
            color="secondary"
            value={alignment}
            exclusive
            fullWidth
            size="small"
        >
            <ToggleButton value="myNotes" disableRipple onClick={handleChange}>My Notes</ToggleButton>
            {currentContent &&
                <ToggleButton value="groupSettings" disableRipple onClick={handleChange}>Manage Group</ToggleButton>
            }
            <ToggleButton value="groups" disableRipple onClick={handleChange}>Groups</ToggleButton>
        </StyledTogleGroup>
    );
};

export default MobileSidebar;