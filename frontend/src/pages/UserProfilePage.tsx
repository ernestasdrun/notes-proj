import { Box, Button, IconButton, List, ListItem, ListItemButton, Paper, useMediaQuery } from "@mui/material";
import React from "react";
import Footer from "../features/footer/Footer";
import Navbar from "../features/navbar/Navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
    const smallScreen = useMediaQuery("(max-width:600px)");
    const largeScreen = useMediaQuery("(max-width:1200px)");

    const navigate = useNavigate();

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box
                flexGrow={1}
                sx={{
                    display: "grid",
                    gap: "20px",
                    gridTemplateColumns: "1fr clamp(250px, 250px, 250px) clamp(850px, 850px, 850px) 1fr",
                    gridTemplateRows: "30px 1fr 30px",
                    gridTemplateAreas: `"back . . ."
                                        ". sidebar content ."
                                        ". . . ."`,
                    border: "1px solid red"
                }}>
                <Box sx={{ gridArea: "back" }}>
                    <IconButton size="small" onClick={() => navigate(-1)} sx={{ ml: "20px", mt: "10px" }}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                <Box sx={{ gridArea: "sidebar", borderRadius: "40px" }}>
                    <Paper sx={{ height: "100%", width: "100%", borderRadius: "inherit", overflow: "clip" }}>
                        <List>
                            <ListItemButton>Test</ListItemButton>
                            <ListItemButton>Test</ListItemButton>
                            <ListItemButton>Test</ListItemButton>
                        </List>
                    </Paper>
                </Box>
                <Box sx={{ gridArea: "content", borderRadius: "40px" }}>
                    <Paper sx={{ height: "100%", width: "100%", borderRadius: "inherit" }}>
                    </Paper>
                </Box>

            </Box>
            {!smallScreen && <Footer />}
        </Box>
    );
};

export default UserProfilePage;