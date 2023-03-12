import React, { useCallback, useMemo, useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { Box, CircularProgress, Fab, Grid, styled, ThemeProvider } from '@mui/material';
import roadTripData from './asset/data.json';
import Directions from './components/direction/Directions';
import Sidebar from './components/sidebar/Sidebar';
import TripOverview, { TripOverviewHandles } from './components/trip-overview/TripOverview';
import Navigation, { MapSize } from './components/navigation/Navigation';
import ScreenshotButton from './components/screenshot-button/ScreenshotButton';
import './App.css';
import { theme } from './theme';

const libraries = ['geometry', 'drawing', 'places', 'places'] as Libraries;

const mapSizeConfiguration = {
  [MapSize.Fixed]: {
    width: '1280px',
    height: '720px',
  },
  [MapSize.Cover]: {
    width: '100%',
    height:'100%',
  }
}

const StyledMapContainer = styled(Grid)`
  background-color: ${p => p.theme.palette.grey.A200};
  opacity: 0.8;
  background-image: ${p => `linear-gradient(${p.theme.palette.grey.A100} 1px, transparent 1px), linear-gradient(to right, ${p.theme.palette.grey.A100} 1px, ${p.theme.palette.grey.A200} 1px)`};
  background-size: 20px 20px;
`

function App() {
  const map = useRef<google.maps.Map>()
  const tripOverviewHandles = useRef<TripOverviewHandles>();

  const { isLoaded } = useJsApiLoader({
    libraries,
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
  })

  const [activeDay, setActiveDay] = useState<string>();

  const travelDayData = useMemo(() =>
    roadTripData.filter((day) => Number(day.distance.replace(' km', '')) > 0),
    [roadTripData]
  )

  const activeDirections = useMemo(() =>
    activeDay ? [roadTripData.find(({dayNumber}) => dayNumber === activeDay )!] : travelDayData,
    [travelDayData, activeDay]
  )

  const onShowRouteClick = useCallback((day:string) => {
    setActiveDay(activeDay === day ? undefined : day);
  }, [activeDay])

  const onMapLoaded= useCallback((googleMap: google.maps.Map) => {
    map.current = googleMap;
  }, [])

  const onMapSizeChange = useCallback((size: MapSize) => {
    const element = map.current?.getDiv();
    const { width, height } = mapSizeConfiguration[size];

    if(!element) throw new Error('Unable to change the size because the element does not exist');

    element.style.width = width;
    element.style.height = height;
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Navigation
          onFullRouteClick={() => {
            tripOverviewHandles.current?.toggleDrawer()}
          }
          onMapSizeChange={onMapSizeChange}
        />
        <Grid container spacing={0} direction="row" sx={{ flexGrow: 1}}>
          <Grid item sm={12} md={2} sx={{height: '100%', overflow: 'hidden'}} justifyContent="stretch">
            <Sidebar
              data={travelDayData}
              activeDay={activeDay}
              onDayClick={onShowRouteClick}
            />
          </Grid>
          <StyledMapContainer item sm={12} md={10}>
            {isLoaded ? (
              <GoogleMap
                mapContainerClassName='map-container'
                mapContainerStyle={{
                  width: '100%',
                  height: '100%'
                }}
                options={{ disableDefaultUI: true }}
                zoom={8}
                onLoad={onMapLoaded}
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
          </StyledMapContainer>
        </Grid>
        <TripOverview
          data={roadTripData}
          activeDay={activeDay}
          onDayClick={onShowRouteClick}
          handlesRef={tripOverviewHandles}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
