import { Grid, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/Navbar';
import Note from '../../components/Note';
import Sidebar from '../../components/layout/Sidebar';
import MainNotes from '../../components/layout/Main/MainNotes';

const UserHomePage = () => {
    const [alignment, setAlignment] = useState("myNotes");

  return (
    <Box
        sx={{
          display: 'grid',
          minHeight: "100vh",
          gridTemplateColumns: '1fr 15fr',
          gridTemplateRows: 'auto auto 15fr auto',
          gridTemplateAreas: 
            `"navbar navbar"
            "sidebar sidebar"
            "main main"
            "footer footer"`,
        }}
      >
        <Box sx={{ gridArea: 'navbar'}}>
            <Navbar />
        </Box>
        <Box sx={{ gridArea: 'sidebar' }}>
            <Sidebar alignment={alignment} setAlignment={setAlignment} />
        </Box>
        <Box sx={{ gridArea: 'main', bgcolor: 'background.default' }}>
            <MainNotes />
        </Box>
        <Box sx={{ gridArea: 'footer', position: "relative", left: 0, bottom: 0, right: 0}}>
            <Footer />
        </Box>
      </Box>
  )
}

export default UserHomePage