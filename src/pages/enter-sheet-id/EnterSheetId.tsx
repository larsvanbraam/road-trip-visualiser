import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeSheetIdState, sheetIdsState } from '../../state/sheetState';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { EnterSheetIdContainer, EnterSheetIdModal } from './EnterSheetId.styles';

export function EnterSheetId() {
  const navigate = useNavigate();

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? '',
  })

  const setSheetIds = useSetRecoilState(sheetIdsState);
  const setSheetId = useSetRecoilState(activeSheetIdState);

  const textField = useRef<HTMLDivElement>(null);
  const [localSheetId, setLocalSheetId] = useState<string>('')
  const sheetIds = useRecoilValue(sheetIdsState);

  const getSheetIdIndex = useCallback((id:string) => sheetIds.findIndex((value) => value === id), [sheetIds])

  const onSelectSheetId = useCallback((value:string) => {
    setSheetId(value);
    navigate('/')
  }, [navigate, setSheetId]);

  const onDeleteSheetId = useCallback((value:string) => {
    const localSheetIds = [...sheetIds];
    const index = getSheetIdIndex(value);

    localSheetIds.splice(index, 1);

    setSheetIds(localSheetIds);
  }, [setSheetIds, sheetIds, getSheetIdIndex])

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newSheetId = data.get('sheetId') as string;

    if(!newSheetId) {
      throw new Error('No id was provided');
    }

    const index = getSheetIdIndex(newSheetId)

    setSheetIds(
      index > -1
        // Update the id's so that the new one is the first one.
        ? sheetIds.reduce((accumulator, currentValue) =>
          currentValue === newSheetId ? [currentValue, ...accumulator] : [...accumulator, currentValue], [] as Array<string>)
        : (sheetIds) => [newSheetId, ...sheetIds])

    onSelectSheetId(newSheetId)
  }, [setSheetIds, onSelectSheetId, sheetIds]);

  return <Fragment>
    {isMapLoaded && <GoogleMap
      mapContainerClassName='map-container'
      mapContainerStyle={{
        position: 'absolute',
        inset: 0,
        inlineSize: '100%',
        blockSize: '100%'
      }}
      options={{ disableDefaultUI: true,  }}
      zoom={3}
      center={{
        lat: 25,
        lng: 0
      }}
    />}
    <EnterSheetIdContainer component="main" >
      <EnterSheetIdModal>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Enter the Google Sheet id
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mb: sheetIds.length > 0 ? 4 : 0, width: '100%' }}>
          <TextField
            ref={textField}
            margin="normal"
            required
            fullWidth
            id="sheetId"
            label="Google Sheet id"
            name="sheetId"
            value={localSheetId}
            onChange={(event) => setLocalSheetId(event.target.value)}
            autoFocus
            sx={{ mb: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
          >
            Continue
          </Button>
        </Box>
        {sheetIds.length > 0 && <Box>
          <Typography component="h1" variant="body1" fontWeight="bold" sx={{mb: 1 }}>
            Or choose a previous value
          </Typography>
          <List>
            {sheetIds.map((value) =>
              <ListItem
                key={value}
                disablePadding
                secondaryAction={
                  <Tooltip title="Remove this id from the history" placement="top">
                    <IconButton edge="end" aria-label="delete" onClick={() => onDeleteSheetId(value)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemButton onClick={() => onSelectSheetId(value)} >
                  <ListItemIcon>
                    <FileOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary={value} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>}
      </EnterSheetIdModal>
    </EnterSheetIdContainer>
  </Fragment>
}