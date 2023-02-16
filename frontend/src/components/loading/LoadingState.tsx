import React from 'react'
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'

const LoadingState = () => {
  return (
    <Backdrop open={true}>
    <Box display="flex" flexDirection="column" alignItems="center">
      <CircularProgress color="inherit" size={60}/>
      <Typography pt={2} variant="h4">Loading...</Typography>
    </Box>
  </Backdrop>
  )
}

export default LoadingState