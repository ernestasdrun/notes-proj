import React, { useEffect, useState } from "react";
import { Note } from "../models/note";
import NoteComponent from "../features/noteContainer/notes/Note";
import { Fab, Box, Grid, useMediaQuery } from "@mui/material";
import * as NotesApi from "../network/notes_api";
import NoteDialog from "../features/noteContainer/editDialog/NoteDialog";
import { Note as NoteModel } from "../models/note";
import Navbar from "../features/navbar/Navbar";
import NewNoteTemplate from "../features/noteContainer/notes/NewNoteTemplate";
import LoadingState from "../components/loading/LoadingState";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../features/footer/Footer";

const HomePage = () => {

  return (
    <Navbar />
  );
};

export default HomePage;