import Navigation, { MapSize } from '../../components/navigation/Navigation';
import { Box, CircularProgress, Fab, Grid, styled, Typography } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Directions from '../../components/direction/Directions';
import ClearIcon from '@mui/icons-material/Clear';
import ScreenshotButton from '../../components/screenshot-button/ScreenshotButton';
import TripOverview, { TripOverviewHandles } from '../../components/trip-overview/TripOverview';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import useGoogleSheets from 'use-google-sheets';
import { parseGoogleSheetData } from '../../utils/parseGoogleSheetData';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { activeSheetIdState } from '../../state/sheetState';

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

export function Home() {
  const map = useRef<google.maps.Map>()
  const tripOverviewHandles = useRef<TripOverviewHandles>();

  const sheetId = useRecoilValue(activeSheetIdState);

  const { data: rawSheetData, loading: isDataLoading, error, refetch: refreshData } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? '',
    sheetId,
  });

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? '',
  })

  const roadTripData = useMemo(() =>
      parseGoogleSheetData(
        rawSheetData.find(({ id }) => id === process.env.REACT_APP_TAB_NAME ) ?? { data: [], id: '' }
      ),
    [rawSheetData]
  )

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

  console.log(error, sheetId);

  if(error || !sheetId) {
    return <Navigate to="/enter-sheet-id" replace />;
  }

  return <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    <Navigation
      onMapSizeChange={onMapSizeChange}
      onUpdateData={refreshData}
      isDataLoading={isDataLoading}
      // onSheetIdChanged={setSheetId}
      // sheetId={sheetId}
    />
    <Grid container spacing={0} direction="row" sx={{ flexGrow: 1}}>
      <Grid item sm={12} md={4} lg={3} xl={2} sx={{height: '100%', overflow: 'hidden'}} justifyContent="stretch">
        <Sidebar
          data={travelDayData}
          activeDay={activeDay}
          onDayClick={onShowRouteClick}
          onFullOverviewClick={() => {
            tripOverviewHandles.current?.toggleDrawer()}
          }
        />
      </Grid>
      <StyledMapContainer item sm={12} md={8} lg={9} xl={10}>
        {!isDataLoading && isMapLoaded ? (
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
        ) : <Box>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', blockSize: '100vh'}}>
            <CircularProgress sx={{ mb: 1 }} />
            <Typography variant="caption">Loading data...</Typography>
          </Box>
        </Box> }

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
    {!isDataLoading && <
      TripOverview
      data={roadTripData}
      activeDay={activeDay}
      onDayClick={onShowRouteClick}
      handlesRef={tripOverviewHandles}
    />
    }
  </Box>
}