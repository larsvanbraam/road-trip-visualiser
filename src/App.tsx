import React, { useCallback, useMemo, useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
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
import Sidebar from './components/sidebar/Sidebar';
import TripOverview, { TripOverviewHandles } from './components/trip-overview/TripOverview';
import Navigation from './components/navigation/Navigation';
import ScreenshotButton from './components/screenshot-button/ScreenshotButton';

import roadBookData from './asset/data.json';
import './App.css';

const libraries = ['geometry', 'drawing', 'places', 'places'] as Libraries;

function App() {
  const tripOverviewHandles = useRef<TripOverviewHandles>()
  const { isLoaded } = useJsApiLoader({
    libraries,
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  })

  const [activeDay, setActiveDay] = useState<string>();

  const travelDayData = useMemo(() =>
    roadTripData.filter((day, index) =>
      day.morningLocation !== day.eveningLocation &&
      index !== 0 &&
      index !== roadBookData.length -1
    ),
    [roadTripData]
  )

  const activeDirections = useMemo(() =>
    activeDay ? [roadTripData.find(({dayNumber}) => dayNumber === activeDay )!] : travelDayData,
    [travelDayData, activeDay]
  )

  const onShowRouteClick = useCallback((day:string) => {
    setActiveDay(activeDay === day ? undefined : day);
  }, [activeDay])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navigation
        onFullRouteClick={() => {
          tripOverviewHandles.current?.toggleDrawer()}
        }
      />
      <Grid container spacing={0} direction="row" sx={{ flexGrow: 1}}>
        <Grid item sm={12} md={2} sx={{height: '100%', overflow: 'hidden'}} justifyContent="stretch">
          <Sidebar
            data={travelDayData}
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
              <Directions data={activeDirections} />
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

          <ScreenshotButton
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            data={roadTripData}
            activeDay={activeDay}
          />
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
