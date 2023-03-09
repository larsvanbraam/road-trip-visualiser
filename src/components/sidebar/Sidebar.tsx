import roadBookData from '../../asset/data.json';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PlaceIcon from '@mui/icons-material/Place';
import React from 'react';
import { RoadTrip } from '../../types/roadTrip.types';

type SidebarProps = {
  data: RoadTrip;
  activeDay?: string;
  onDayClick: (dayNumber:string) => void;
}

function Sidebar({ data, activeDay, onDayClick }: SidebarProps ) {
  return <List sx={{  overflow: 'auto', maxHeight: 'calc(100vh - 75px)'}}>
    {data
      .map((day) =>
        <ListItem disablePadding key={day.dayNumber}>
          <ListItemButton
            onClick={() => onDayClick(day.dayNumber)}
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
}

export default Sidebar;