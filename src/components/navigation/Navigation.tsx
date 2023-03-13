import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import CachedIcon from '@mui/icons-material/Cached';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { darkTheme } from '../../theme';

type NavigationProps = {
  onFullRouteClick():void
  onMapSizeChange(size:MapSize):void
  onUpdateData():void
  isDataLoading: boolean;
}

export const enum MapSize {
  Cover = 'cover',
  Fixed = 'fixed',
}

function Navigation({ onFullRouteClick, onMapSizeChange, onUpdateData, isDataLoading }:NavigationProps) {
  const [mapSize, setMapSize] = useState(MapSize.Cover);

  const onSizeChange = useCallback((
    event: SelectChangeEvent<MapSize>,
  ) => {
    setMapSize(event.target.value as MapSize);
    onMapSizeChange(event.target.value as MapSize);
  }, [setMapSize]);


  return <AppBar  position="relative" >
    <ThemeProvider theme={darkTheme}>
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
          onClick={onUpdateData}
          startIcon={<CachedIcon />}
          sx={{ mr: 1 }}
          disabled={isDataLoading}
        >
          Update data
        </Button>
        <Button
          color="inherit"
          onClick={onFullRouteClick}
          startIcon={<FormatListBulletedIcon />}
          sx={{ mr: 1 }}
        >
          Full route details
        </Button>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Map size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={mapSize}
            label="Map size"
            onChange={onSizeChange}
          >
            <MenuItem value={MapSize.Fixed}>Fixed size</MenuItem>
            <MenuItem value={MapSize.Cover}>Cover</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </ThemeProvider>
  </AppBar>
}

export default Navigation;