import {
  Box, Button,
  Divider,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import React from 'react';
import { RoadTrip } from '../../types/roadTrip.types';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
  StyledSidebar,
  StyledSidebarBottom,
  StyledSidebarList,
  StyledSidebarListItem,
  StyledSidebarTop,
} from './Sidebar.styles';
import { ListStop } from './components/ListStop';

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
                    <ListStop location={day.morningLocation} />
                    <ListStop location={day.eveningLocation} />
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