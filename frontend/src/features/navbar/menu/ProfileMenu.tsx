import React from 'react';
import { Divider, ListItemIcon, Menu, MenuItem, MenuList } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { IUser } from '../../../state/mode';
import NavbarButton from '../buttons/NavbarButton';

interface RootStateUser {
    user: IUser;
}

interface ProfileMenuProps {
    anchorEl: HTMLElement | null,
    isMenuOpen: boolean,
    handleMenuClose: () => void,
    onLogoutClick: () => Promise<void>,
    [x: string]: unknown,
    children?: React.ReactNode
}

const ProfileMenu = ({ anchorEl, isMenuOpen, handleMenuClose, onLogoutClick, ...props }: ProfileMenuProps) => {
    const user = useSelector<RootStateUser>((state) => state.user) as IUser;

    return (
        <Menu
            {...props}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            disableAutoFocusItem
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {{ ...props }.children}
            {user ?
                <MenuList>
                    <MenuItem disableRipple onClick={handleMenuClose}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleMenuClose}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem disableRipple onClick={onLogoutClick}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        Log out
                    </MenuItem>
                </MenuList>
                :
                <MenuList>
                    <MenuItem disableRipple onClick={handleMenuClose}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        Login
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleMenuClose}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        Sign Up
                    </MenuItem>
                </MenuList>
            }
        </Menu>
    )
}

export default ProfileMenu