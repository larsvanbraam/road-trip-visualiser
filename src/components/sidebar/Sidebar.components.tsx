import { StyledLocationLabel, StyledStopLabel } from './Sidebar.styles';
import PlaceIcon from '@mui/icons-material/Place';
import { Tooltip } from '@mui/material';
import React from 'react';

export function ListStop(props : { location: string }) {
  return (
    <StyledStopLabel
      variant="body2"
      as="span"
    >
      <PlaceIcon sx={{ mr: 0.5, width: 12, height: 12 }} />
      <Tooltip title={props.location} placement="bottom" arrow>
        <StyledLocationLabel>{props.location}</StyledLocationLabel>
      </Tooltip>
    </StyledStopLabel>
  )
}