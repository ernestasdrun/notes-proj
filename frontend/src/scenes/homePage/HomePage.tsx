import React, { useEffect, useState } from 'react';
import { Note } from '../../models/note';
import NoteComponent from '../../components/Note';
import Box from '@mui/material/Box';
import { Grid, useMediaQuery } from '@mui/material';
import * as NotesApi from '../../network/notes_api';
import NoteDialog from '../../components/NoteDialog';
import Button from '@mui/material/Button';
import { Note as NoteModel } from '../../models/note';
import Navbar from '../../components/Navbar';
import NewNoteTemplate from '../../components/NewNoteTemplate';

const HomePage = () => {

  const smallScreen = useMediaQuery('(min-width:600px)');

  const [notes, setNotes] = useState<Note[]>([]);

  const [showNoteDialog, setAddNoteDialog] = useState(false);
  const [noteEdit, setNoteEdit] = useState<NoteModel | null>();

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Box>
      <Navbar />
      <Box m="8rem 4rem 2rem 4rem">
        <Grid
          container
          spacing={5}
          direction={smallScreen ? "row" : "column"}
          alignItems="center"
        >
          {notes.slice().reverse().map((note, index) => (
            <React.Fragment key={index}>
              {
                index == 0 &&
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <NewNoteTemplate onTemplateClicked={setAddNoteDialog}/>
                </Grid>
              }
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={note._id}>
                <NoteComponent note={note} onNoteClicked={setNoteEdit} onDeleteNote={deleteNote} key={note._id} />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        {showNoteDialog &&
          <NoteDialog
            open={showNoteDialog}
            onDismiss={() => setAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setAddNoteDialog(false);
            }}
          />
        }
        {noteEdit &&
          <NoteDialog
            noteToEdit={noteEdit}
            onDismiss={() => setNoteEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNotes(notes.map(existNote => existNote._id === updatedNote._id ? updatedNote : existNote));
              setNoteEdit(null);
            }}
          />
        }
      </Box>
    </Box>
  )
}

export default HomePage