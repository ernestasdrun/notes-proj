import React, { useEffect, useState } from "react";
import { Note } from "../models/note";
import NoteComponent from "../features/noteContainer/notes/Note";
import { Fab, Box, Grid, useMediaQuery, Typography, Button, useTheme, Theme } from "@mui/material";
import * as NotesApi from "../network/notes_api";
import NoteDialog from "../features/noteContainer/editDialog/NoteDialog";
import { Note as NoteModel } from "../models/note";
import Navbar from "../features/navbar/Navbar";
import NewNoteTemplate from "../features/noteContainer/notes/NewNoteTemplate";
import LoadingState from "../components/loading/LoadingState";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../features/footer/Footer";
import NoteImage from "../assets/paper-note.svg";
import { styled } from "@mui/system";

const Image = styled("img")({
  margin: 0,
  padding: 0,
  //maxHeight: "100px",
  //maxWidth: "100px",
});

const HomePage = () => {
  const theme = useTheme<Theme>();
  const smallScreen = useMediaQuery("(max-width:600px)");
  const largeScreen = useMediaQuery("(max-width:1200px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{background: theme.palette.mode === "light" ? "linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(43,175,74,1) 0%, rgba(240,255,184,1) 100%)" : "linear-gradient(145deg, rgba(2,0,36,1) 0%, rgba(28,93,45,1) 0%, rgba(85,89,70,1) 84%)"}}
    >
      <Navbar position="fixed" />
      <Box
        display="flex"
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          border: "1px solid green",
        }}
      >
        <Box
          pt={8}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          height="inherit"
          width="clamp(1600px, 1600px, 100vw)"
          sx={{ border: "1px solid red" }}
        >

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignSelf={{xs: "auto", md: "center"}}
            height={{ xs: "inherit", md: "50%" }}
            width={{ xs: "auto", md: "50%" }}
            sx={{ border: "1px solid blue", p: "4rem" }}
          >
            <Typography variant="h1" fontWeight="500" pb={2}>Next gen tool for managin notes</Typography>
            <Typography variant="h4"pb={3}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Typography>
            <Button>Get started</Button>
          </Box>

          <Box
            position="relative"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            alignSelf={{xs: "auto", md: "center"}}
            height={{ xs: "inherit", md: "70%" }}
            width={{ xs: "auto", md: "50%" }}
            sx={{ border: "1px solid blue"}}
          >
            <Image src={NoteImage} alt="note" />
          </Box>

        </Box>
      </Box>

      <Box
        display="flex"
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{ border: "1px solid red" }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          height={{ xs: "inherit", md: "90%" }}
          width="clamp(1600px, 1600px, 100vw)"
          sx={{ border: "1px solid red", p: "10rem" }}
        >
          <Typography>Test</Typography>
          <Typography>Test</Typography>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;

//sx={{ width: "clamp(80vw, 1800px, 100vw)" }}