import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import * as React from 'react';
import { useCallback, useState } from 'react';

type NavigationProps = {
  onFullRouteClick():void
  onMapSizeChange(size:MapSize):void
}

export const enum MapSize {
  Cover = 'cover',
  Fixed = 'fixed',
}

const StyledFormControl = styled(FormControl)`
  .MuiFormLabel-root,
  .MuiInputBase-root {
    color: ${props => props.theme.palette.secondary.main};
  }

  .MuiInputBase-root {
    background-color: rgba(255,255,255,.1);
    
    &:hover {
      background-color: rgba(255,255,255,.15);
    }
  }
`

function Navigation({ onFullRouteClick, onMapSizeChange }:NavigationProps) {
  const [mapSize, setMapSize] = useState(MapSize.Cover);

  const onSizeChange = useCallback((
    event: SelectChangeEvent<MapSize>,
  ) => {
    setMapSize(event.target.value as MapSize);
    onMapSizeChange(event.target.value as MapSize);
  }, [setMapSize]);


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
        sx={{ mr: 1 }}
      >
        Full route details
      </Button>
      <StyledFormControl variant="filled" size="small" sx={{ minWidth: 200 }} color="warning">
        <InputLabel id="demo-simple-select-label">Map size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={mapSize}
          label="Age"
          onChange={onSizeChange}
        >
          <MenuItem value={MapSize.Fixed}>Fixed size</MenuItem>
          <MenuItem value={MapSize.Cover}>Cover</MenuItem>
        </Select>
      </StyledFormControl>
    </Toolbar>
  </AppBar>
}

export default Navigation;