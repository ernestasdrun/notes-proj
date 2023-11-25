import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Box, Divider, Icon, IconButton, ListItemIcon, MenuItem, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { setMode } from "../../styles/modeSlice";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GithubDarkModeImage from "../../assets/github-mark-white.svg";
import GithubLightModeImage from "../../assets/github-mark.svg";
import NavbarButton from "./buttons/NavbarButton";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import * as UserApi from "../../network/users_api";
import ProfileMenu from "./menu/ProfileMenu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../auth/authSlice";

interface NavbarProps {
    position?: "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined,
}

const Navbar = ({position}: NavbarProps) => {
    const user = useAppSelector((state) => state.auth.user);

    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

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

    /*useEffect(() => {
        //onLogoutClick();
        const interval = setInterval(() => {
            console.log("PRINTING EVERY 10min");
            isTokenValid(user?.token);
            if(user === null) clearInterval(interval);
        }, 1000 * 60 * 10)
    }, [])*/

    async function isTokenValid(token: string | undefined) {
        if (token) {
            try {
                await UserApi.getLoggedInUser(token).then((res) => {
                    console.log(res);
                })
            } catch (error) {
                //TODO add notification about session time ending
                dispatch(logoutUser());
            }
        }
    }

    async function onLogoutClick() {
        try {
            handleMenuClose();
            dispatch(logoutUser());
            /*if (user)
            await UserApi.getLoggedInUser(user.token).then((res) => {
                console.log(res);
            })*/

            /*await UserApi.logout().then((res) => {
                dispatch(logOutUser());
                console.log(res);
            });*/
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const onSettingsClick = () => {
        navigate("/profile");
    }

    const renderMenu = (
        <ProfileMenu
            anchorEl={anchorEl}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            onLogoutClick={onLogoutClick}
            onSettingsClick={onSettingsClick}
        />
    );

    const renderMobileMenu = (
        <ProfileMenu
            anchorEl={mobileMoreAnchorEl}
            isMenuOpen={isMobileMenuOpen}
            handleMenuClose={handleMenuClose}
            onLogoutClick={onLogoutClick}
            onSettingsClick={onSettingsClick}
        >
            <MenuItem disableRipple onClick={() => window.open("https://github.com/ernestasdrun/notes-proj", "_blank")}>
                <ListItemIcon>
                    <img
                        src={theme.palette.mode === "dark"
                            ? GithubDarkModeImage
                            : GithubLightModeImage}
                        height={27}
                        width={27}
                    />
                </ListItemIcon>
                GitHub Repository
            </MenuItem>
            <MenuItem disableRipple onClick={() => dispatch(setMode())}>
                <ListItemIcon>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon sx={{ fontSize: "30px" }} />
                    ) : (
                        <LightModeIcon sx={{ color: "#24292f", fontSize: "30px" }} />
                    )}
                </ListItemIcon>
                Theme
            </MenuItem>
            <Divider />
        </ProfileMenu>
    );

    return (
        <Box>
            <AppBar color="primary" enableColorOnDark={true} position={position || "sticky"}>
                <Toolbar variant="regular">
                    <Typography variant="h3" onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>ClassicNotes</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
                        <Tooltip title="GitHub Repository">
                            <IconButton sx={{ marginRight: "5px" }} onClick={() => window.open("https://github.com/ernestasdrun/notes-proj", "_blank")}>
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
                        <Tooltip title="Change Theme">
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === "dark" ? (
                                    <DarkModeOutlinedIcon sx={{ fontSize: "30px" }} />
                                ) : (
                                    <LightModeIcon sx={{ color: "#24292f", fontSize: "30px" }} />
                                )}
                            </IconButton>
                        </Tooltip>
                        {user ?
                            <Avatar
                                sx={{ bgcolor: deepOrange[500] }}
                                alt={user.username}
                                onClick={handleProfileMenuOpen}
                            />
                            :
                            <React.Fragment>
                                <NavbarButton
                                    aria-label="sign-in"
                                    navigate={navigate}
                                    link="/login"
                                    text="SIGN IN"
                                    width="100px"
                                    textVariant="h5"
                                    sx={{ margin: "0 15px" }}
                                />
                                <NavbarButton
                                    aria-label="register"
                                    navigate={navigate}
                                    link="/signup"
                                    text="REGISTER"
                                    width="140px"
                                    textVariant="h4"
                                    sx={{ backgroundColor: theme.palette.customButton.main }}
                                />
                            </React.Fragment>
                        }
                    </Box>
                    <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                        <IconButton onClick={handleMobileMenuOpen}>
                            <MenuRoundedIcon sx={{ color: "#24292f", fontSize: "30px" }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </Box>
    );
};

export default Navbar;