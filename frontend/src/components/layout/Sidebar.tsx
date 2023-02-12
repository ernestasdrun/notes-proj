import Grid from '@mui/material/Grid';
import { Divider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

interface SidebarProps {
    alignment: string,
    setAlignment: (alignment: string) => void,
}

const Sidebar = ({ alignment, setAlignment }: SidebarProps) => {

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string,
    ) => {
        setAlignment(newValue);
    };

    return (
        <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            fullWidth
            size="small"
        >
            <ToggleButton value="myNotes" disableRipple onClick={handleChange}>My Notes</ToggleButton>
            <ToggleButton value="groups" disableRipple onClick={handleChange}>Groups</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default Sidebar