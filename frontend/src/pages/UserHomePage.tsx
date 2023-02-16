import { Grid, Box, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../features/footer/Footer';
import Navbar from '../features/navbar/Navbar';
import Note from '../features/noteContainer/notes/Note';
import MobileSidebar from '../features/sidebar/mobile/MobileSidebar';
import MainNotes from '../features/noteContainer/MainNotes';
import Sidebar from '../features/sidebar/Sidebar';

const UserHomePage = () => {
  const [alignment, setAlignment] = useState("myNotes");
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box
        flexGrow={1}
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 15fr',
          gridTemplateRows: 'auto 15fr',
          gridTemplateAreas: smallScreen ?
            `"sidebar sidebar"
            "main main"
            `
            :
            `"sidebar main"
            "sidebar main"
            `,
        }}
      >
        {smallScreen ?
          <Box sx={{ gridArea: 'sidebar', border: "1px solid red" }}>
            <MobileSidebar alignment={alignment} setAlignment={setAlignment} />
          </Box>
          :
          <Box sx={{ gridArea: 'sidebar', border: "1px solid red" }}>
            <Sidebar />
          </Box>
        }
        <Box sx={{ gridArea: 'main', bgcolor: 'background.default' }}>
          <MainNotes />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default UserHomePage