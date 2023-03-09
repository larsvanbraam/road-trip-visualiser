import React, { useCallback, useMemo, useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import {
  Box,
  CircularProgress,
  Fab,
  Grid,
} from '@mui/material';
import roadTripData from './asset/data.json';
import Directions from './components/direction/Directions';
import html2canvas from 'html2canvas';
import { kebabCase } from 'lodash-es';
import Sidebar from './components/sidebar/Sidebar';
import TripOverview, { TripOverviewHandles } from './components/trip-overview/TripOverview';

import roadBookData from './asset/data.json';
import './App.css';
import Navigation from './components/navigation/Navigation';

const libraries = ['geometry', 'drawing', 'places', 'places'] as Libraries;

function App() {
  const tripOverviewHandles = useRef<TripOverviewHandles>()
  const { isLoaded } = useJsApiLoader({
    libraries,
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  })

  const [activeDay, setActiveDay] = useState<string>();

  const sidebarData = useMemo(() =>
    roadTripData.filter((day, index) =>
      day.morningLocation !== day.eveningLocation &&
      index !== 0 &&
      index !== roadBookData.length -1
    ),
    [roadTripData]
  )

  const filteredRoadBook = useMemo(() => roadTripData.filter(({morningLocation, eveningLocation}, index, array) =>
    morningLocation !== eveningLocation &&
    index !== 0 &&
    index !== array.length - 1
  ), [])

  const data = useMemo(() =>
    activeDay ? [roadTripData.find(({dayNumber}) => dayNumber === activeDay )!] : filteredRoadBook,
    [filteredRoadBook, activeDay]
  )

  const onShowRouteClick = useCallback((day:string) => {
    setActiveDay(activeDay === day ? undefined : day);
  }, [activeDay])

  // Does not work correctly in chrome 😭
  const onScreenshotClick = useCallback(() => {
    html2canvas(document.body.querySelector('.map-container')!, {
      useCORS: true,
    }).then((canvas) => {
      const anchor = document.createElement('a');
      const activeDayData = roadTripData.find(({dayNumber}) => dayNumber === activeDay);

      anchor.download = activeDayData ? kebabCase(`day-${activeDayData.dayNumber}-${activeDayData.morningLocation}-${activeDayData.eveningLocation}.png`) : 'full-route.png';
      anchor.href = canvas.toDataURL()
      anchor.click();
    })
  }, [activeDay])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navigation onFullRouteClick={() => {
        tripOverviewHandles.current?.toggleDrawer()}
      } />
      <Grid container spacing={0} direction="row" sx={{ flexGrow: 1}}>
        <Grid item sm={12} md={2} sx={{height: '100%', overflow: 'hidden'}} justifyContent="stretch">
          <Sidebar
            data={sidebarData}
            activeDay={activeDay}
            onDayClick={onShowRouteClick}
          />
        </Grid>
        <Grid item sm={12} md={10}>
          {isLoaded ? (
            <GoogleMap
              mapContainerClassName='map-container'
              mapContainerStyle={{
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
      <TripOverview
        data={roadTripData}
        activeDay={activeDay}
        onDayClick={onShowRouteClick}
        handlesRef={tripOverviewHandles}
      />
    </Box>
  );
}

export default App;
