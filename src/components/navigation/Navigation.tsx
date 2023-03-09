import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from 'react';

type NavigationProps = {
  onFullRouteClick():void
}

function Navigation({ onFullRouteClick }:NavigationProps) {
  return <AppBar  position="relative" >
    <Toolbar>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <Typography variant="h5" component="h1" >
          <strong>Road Trip Visualizer</strong> | <small>Amerika 2023</small>
        </Typography>
      </Box>
      <Button
        color="inherit"
        href={`https://docs.google.com/spreadsheets/d/${process.env.REACT_APP_SHEET_ID}`}
        target="_blank"
        startIcon={<GoogleIcon />}
        sx={{ mr: 1 }}
      >
        Source Sheet
      </Button>
      <Button
        color="inherit"
        onClick={onFullRouteClick}
        startIcon={<FormatListBulletedIcon />}
      >
        Full route details
      </Button>
    </Toolbar>
  </AppBar>
}

export default Navigation;