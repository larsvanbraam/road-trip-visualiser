import React, { useCallback, useMemo, useState } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ClearIcon from '@mui/icons-material/Clear';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Toolbar, Typography,
} from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PlaceIcon from '@mui/icons-material/Place';
import GoogleIcon from '@mui/icons-material/Google';

import roadBookData from './asset/road-book-data.json';
import Directions from './components/direction/Directions';
import html2canvas from 'html2canvas';
import { kebabCase } from 'lodash-es';

import './App.css';

const libraries = ['geometry', 'drawing', 'places', 'places'] as Libraries;

function App() {
  const { isLoaded } = useJsApiLoader({
    libraries,
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  })

  const [activeDay, setActiveDay] = useState<string>();
  const [drawer, setDrawer] = useState(false);

  const filteredRoadBook = useMemo(() => roadBookData.filter(({morningLocation, eveningLocation}, index, array) =>
    morningLocation !== eveningLocation &&
    index !== 0 &&
    index !== array.length - 1
  ), [])

  const data = useMemo(() =>
    activeDay ? [roadBookData.find(({dayNumber}) => dayNumber === activeDay )!] : filteredRoadBook,
    [filteredRoadBook, activeDay]
  )

  const onShowRouteClick = useCallback((day:string) => {
    setActiveDay(activeDay === day ? undefined : day);
    setDrawer(false);
  }, [activeDay])

  // Does not work correctly in chrome 😭
  const onScreenshotClick = useCallback(() => {
    html2canvas(document.body.querySelector('.map-container')!, {
      useCORS: true,
    }).then((canvas) => {
      const anchor = document.createElement('a');
      const activeDayData = roadBookData.find(({dayNumber}) => dayNumber === activeDay);

      anchor.download = activeDayData ? kebabCase(`day-${activeDayData.dayNumber}-${activeDayData.morningLocation}-${activeDayData.eveningLocation}.png`) : 'full-route.png';
      anchor.href = canvas.toDataURL()
      anchor.click();
    })
  }, [activeDay])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <AppBar  position="relative" >
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
            onClick={() => setDrawer(!drawer)}
            startIcon={<FormatListBulletedIcon />}
          >
            Full route details
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} direction="row" sx={{ flexGrow: 1}}>
        <Grid item sm={12} md={2} sx={{height: '100%', overflow: 'hidden'}} justifyContent="stretch">
          <List sx={{  overflow: 'auto', maxHeight: 'calc(100vh - 75px)'}}>
            {roadBookData
              .filter((day, index) => day.morningLocation !== day.eveningLocation && index !== 0 && index !== roadBookData.length -1)
              .map((day) =>
                <ListItem disablePadding key={day.dayNumber}>
                  <ListItemButton
                    onClick={() => onShowRouteClick(day.dayNumber)}
                    selected={activeDay === day.dayNumber}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', gap: 1}}>
                          <DriveEtaIcon />
                          <Typography
                            component="span">
                            Day {day.dayNumber}
                          </Typography>
                        </Box>
                    }
                      secondary={
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography
                            variant="caption"
                            component="span"
                            sx={{display: 'inline-flex'}}
                          >
                            <PlaceIcon sx={{ mr: 1, width: 12}} />
                            {day.morningLocation}
                          </Typography>
                          <Typography
                            variant="caption"
                            component="span"
                            sx={{display: 'inline-flex'}}
                          >
                            <PlaceIcon sx={{ mr: 1, width: 12}} />
                            {day.eveningLocation}
                          </Typography>
                        </Box>}
                    />
                  </ListItemButton>
                </ListItem>
            )}
          </List>
        </Grid>
        <Grid item sm={12} md={10}>
          {isLoaded ? (
            <GoogleMap
              mapContainerClassName='map-container'
              mapContainerStyle={{
                // aspectRatio: 16/9,
                width: '100%',
                height: '100%',
              }}
              options={{ disableDefaultUI: true }}
              zoom={8}
              center={{
                lat: 36.110996,
                lng: -115.173146
              }}
            >
              <Directions data={data} />
            </GoogleMap>
          ) : <CircularProgress /> }

          {activeDay && <Fab
            sx={{ position: 'absolute', bottom: 64, right: 16 }}
            variant="extended"
            size="medium"
            color="error"
            aria-label="Clear selection"
            onClick={() => setActiveDay(undefined)}
          >
            <ClearIcon sx={{ mr: 1 }}/>
            Clear selection
          </Fab>}

          <Fab
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Take screenshot"
            onClick={onScreenshotClick}
          >
            <ScreenshotMonitorIcon sx={{ mr: 1 }} />
            Take screenshot
          </Fab>
        </Grid>
      </Grid>
      <React.Fragment>
        <Drawer
          anchor='left'
          open={drawer}
          onClose={() => setDrawer(false)}
        >
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(roadBookData[0])
                  .map(((key) =>
                      <TableCell key={key}>{key}</TableCell>
                  ))
                }
                <TableCell>View Route</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roadBookData.map((data) =>
                <TableRow key={data.dayNumber} selected={activeDay === data.dayNumber}>
                  {Object.entries(data)
                    .map(([key, value], index) =>
                      <TableCell key={`${value}.${index}`} >
                        {value || '-'}
                      </TableCell>
                    )
                  }
                  <TableCell>
                    <Button
                      sx={{whiteSpace: 'nowrap'}}
                      onClick={() => onShowRouteClick(data.dayNumber)}
                      startIcon={<DirectionsIcon />}
                      variant="outlined"
                    >
                      View route
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Drawer>
      </React.Fragment>
    </Box>
  );
}

export default App;
