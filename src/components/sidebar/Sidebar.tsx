import {
  Box, Button,
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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
  StyledLocationLabel,
  StyledSidebar,
  StyledSidebarBottom,
  StyledSidebarList, StyledSidebarListItem,
  StyledSidebarTop, StyledStopLabel,
} from './Sidebar.styles';

type SidebarProps = {
  data: RoadTrip;
  activeDay?: string;
  onDayClick(dayNumber:string): void;
  onFullOverviewClick():void
}


function Sidebar({ data, activeDay, onDayClick, onFullOverviewClick }: SidebarProps ) {
  return <StyledSidebar>
    <StyledSidebarTop>
      <Typography variant="h6">Travel days</Typography>
      <Typography variant="body1" sx={{ color: 'grey.A700', mb: 1 }}>All days that contain traveling, click on a day to see the route in isolation.</Typography>
    </StyledSidebarTop>
    <Divider />
    <StyledSidebarList disablePadding>
      {data.length === 0  && Array.from({ length: 5 }, (_, index) =>
        <Skeleton key={index} variant="rounded" width="90%" height={100} sx={{ mb: 1, marginInline: 'auto', bgcolor: 'grey.200' }} />
      )}
      {data
        .map((day) =>
          <StyledSidebarListItem disablePadding key={day.dayNumber}>
            <ListItemButton
              onClick={() => onDayClick(day.dayNumber)}
              selected={activeDay === day.dayNumber}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', gap: 1}}>
                    <DriveEtaIcon sx={{ color: 'primary.main' }} />
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
                    <StyledStopLabel
                      variant="body2"
                      as="span"
                    >
                      <PlaceIcon sx={{ mr: 0.5, width: 12, height: 12 }} />
                      <Tooltip title={day.morningLocation} placement="bottom" arrow>
                        <StyledLocationLabel>{day.morningLocation}</StyledLocationLabel>
                      </Tooltip>
                    </StyledStopLabel>
                    <StyledStopLabel
                      variant="body2"
                      as="span"
                    >
                      <PlaceIcon sx={{ mr: 0.5, width: 12, height: 12 }} />
                      <Tooltip title={day.eveningLocation} placement="bottom" arrow>
                        <StyledLocationLabel>{day.eveningLocation}</StyledLocationLabel>
                      </Tooltip>
                    </StyledStopLabel>
                  </Box>}
              />
            </ListItemButton>
          </StyledSidebarListItem>
        )}
    </StyledSidebarList>
    <Divider />
    <StyledSidebarBottom>
      <Button
        color="primary"
        variant="text"
        onClick={onFullOverviewClick}
        startIcon={<FormatListBulletedIcon />}
        sx={{ mr: 1, width: '100%' }}
      >
        View full overview
      </Button>
    </StyledSidebarBottom>
  </StyledSidebar>
}

export default Sidebar;