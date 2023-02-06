/*import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

export default Navbar;
*/


import React from 'react';
import { AppBar, Box, Icon, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import GithubDarkModeImage from '../assets/github-mark-white.svg';
import GithubLightModeImage from '../assets/github-mark.svg';

const Navbar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <AppBar color="primary" enableColorOnDark={true} position="fixed">
            <Toolbar variant="regular">
                <Typography variant="h3" sx={{ cursor: "pointer" }}>ClassicNotes</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "flex", sm: "flex" } }}>
                    <Tooltip title="Github repository">
                        <IconButton onClick={() => window.open("https://github.com/ernestasdrun/notes-proj", "_blank")}>
                            <Icon style={{ fontSize: "30px" }}>
                                <img
                                    src={theme.palette.mode === "dark"
                                        ? GithubDarkModeImage
                                        : GithubLightModeImage}
                                    height={30}
                                    width={30}
                                />
                            </Icon>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Change theme">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkModeOutlinedIcon sx={{ fontSize: "30px" }} />
                            ) : (
                                <LightModeIcon sx={{ color: "#24292f", fontSize: "30px" }} />
                            )}
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                    <IconButton>
                        <MenuRoundedIcon sx={{ color: "#24292f", fontSize: "30px" }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;


/**
 * 	'absolute'
| 'fixed'
| 'relative'
| 'static'
| 'sticky'



'dense'
| 'regular'
| string



 */