import React, { useState, useEffect } from "react";
import { Box, Divider, Theme, useMediaQuery, useTheme } from "@mui/material";
import Footer from "../features/footer/Footer";
import Navbar from "../features/navbar/Navbar";
import MobileSidebar from "../features/sidebar/mobile/MobileSidebar";
import MainNotes from "../features/noteContainer/MainNotes";
import Sidebar from "../features/sidebar/Sidebar";
import NoteOptions from "../features/noteContainer/noteOptions/NoteOptions";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { Note } from "../models/note";

const UserHomePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [notes, setNotes] = useState<Note[]>([]);

  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const [alignment, setAlignment] = useState("myNotes");
  const smallScreen = useMediaQuery("(max-width:600px)");
  const largeScreen = useMediaQuery("(max-width:1200px)");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate])

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box
        flexGrow={1}
        sx={{
          display: "grid",
          gridTemplateColumns: `${largeScreen ? "1fr" : "200px"} 5fr`,
          gridTemplateRows: "auto auto auto 15fr",
          gridTemplateAreas: smallScreen ?
            `"sidebar sidebar"
            "options options"
            "divider divider"
            "main main"
            `
            :
            `"sidebar options"
            "sidebar divider"
            "sidebar main"
            "sidebar main"
            `,
          maxHeight: `calc(100% - ${smallScreen ? "-4px" : "60px"} - ${smallScreen ? "60px" : "64px"})`,
        }}
      >
        {smallScreen ?
          <Box sx={{ gridArea: "sidebar" }}>
            <MobileSidebar alignment={alignment} setAlignment={setAlignment} />
          </Box>
          :
          <Box
            minWidth="170px"
            sx={{
              gridArea: "sidebar",
              boxShadow: `1px 0 10px 0 ${theme.palette.mode === "dark" ? "#131313" : "#354b39f8"}`,
            }}>
            <Sidebar />
          </Box>
        }
        <Box p={2} sx={{ gridArea: "options" }}>
          <NoteOptions notes={notes} setNotes={setNotes}/>
        </Box>
        <Box sx={{ gridArea: "divider" }}>
          <Divider flexItem />
        </Box>
        <Box sx={{ gridArea: "main", overflowY: smallScreen ? "auto" : undefined }}>
          <MainNotes notes={notes} setNotes={setNotes}/>
        </Box>
      </Box>
      {!smallScreen && <Footer />}
    </Box>
  );
};

export default UserHomePage;