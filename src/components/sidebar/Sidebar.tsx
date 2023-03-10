import roadBookData from '../../asset/data.json';
import { Box, List, ListItem, ListItemButton, ListItemText, styled, Tooltip, Typography } from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PlaceIcon from '@mui/icons-material/Place';
import React from 'react';
import { RoadTrip } from '../../types/roadTrip.types';

type SidebarProps = {
  data: RoadTrip;
  activeDay?: string;
  onDayClick: (dayNumber:string) => void;
}

const StyledLocationLabel = styled('span')`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

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
              primaryTypographyProps={{
                component: 'div',
                mb: 1,
              }}
              secondaryTypographyProps={{
                component: 'div'
              }}
              secondary={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ display: 'inline-flex', textOverflow: 'ellipsis', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}
                  >
                    <PlaceIcon sx={{ mr: 1, width: 12, height: 12}} />
                      <Tooltip title={day.morningLocation} placement="bottom" arrow>
                        <StyledLocationLabel>{day.morningLocation}</StyledLocationLabel>
                      </Tooltip>
                  </Typography>
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{display: 'inline-flex'}}
                  >
                    <PlaceIcon sx={{ mr: 1, width: 12, height: 12}} />
                      <Tooltip title={day.eveningLocation} placement="bottom" arrow>
                        <StyledLocationLabel>{day.eveningLocation}</StyledLocationLabel>
                      </Tooltip>
                  </Typography>
                </Box>}
            />
          </ListItemButton>
        </ListItem>
      )}
  </List>
}

export default Sidebar;