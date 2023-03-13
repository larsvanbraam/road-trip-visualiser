import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
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
  return <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ pt: 2, pr: 1, pb: 2, pl: 1 }}>
      <Typography variant="h6">Travel days</Typography>
      <Typography variant="body2" sx={{ color: 'grey.A700' }}>All days that contain traveling, click on a day to see the route in isolation.</Typography>
    </Box>
    <Divider />
    <List sx={{ overflow: 'auto', flexGrow: 1, }}>
      {data.length === 0  && Array.from({ length: 5 }, (_, index) =>
        <Skeleton key={index} variant="rounded" width="90%" height={100} sx={{ mb: 1, marginInline: 'auto', bgcolor: 'grey.200' }} />
      )}
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
                    <DriveEtaIcon sx={{ color: 'secondary.main' }} />
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
  </Box>
}

export default Sidebar;