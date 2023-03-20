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
import * as React from 'react';
import { Fragment, useCallback, useState } from 'react';
import { darkTheme } from '../../theme';
import { Link } from 'react-router-dom';
import { RouterLink } from '../../config/router';
import { useRecoilValue } from 'recoil';
import { activeSheetIdState } from '../../state/sheetState';

type NavigationProps = {
  onMapSizeChange(size:MapSize):void
  onUpdateData():void
  isDataLoading: boolean;
  sheetId?: string,
}

export const enum MapSize {
  Cover = 'cover',
  Fixed = 'fixed',
}

function Navigation({ onMapSizeChange, onUpdateData, isDataLoading }:NavigationProps) {
  const [mapSize, setMapSize] = useState(MapSize.Cover);
  const sheetId = useRecoilValue(activeSheetIdState);

  const onSizeChange = useCallback((
    event: SelectChangeEvent<MapSize>,
  ) => {
    setMapSize(event.target.value as MapSize);
    onMapSizeChange(event.target.value as MapSize);
  }, [setMapSize]);

  return <Fragment>
    <AppBar  position="relative" >
      <ThemeProvider theme={darkTheme}>
        <Toolbar>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <Typography variant="h5" component="h1" >
              <strong>Road Trip Visualizer</strong>
            </Typography>
          </Box>
          <Button
            component={Link}
            color="inherit"
            to={RouterLink.EnterSheetId}
            startIcon={<GoogleIcon />}
            sx={{ mr: 1 }}
          >
            Change source
          </Button>
          <Button
            color="inherit"
            href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
            target="_blank"
            startIcon={<GoogleIcon />}
            sx={{ mr: 1 }}
          >
            View source sheet
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
  </Fragment>
}

export default Navigation;