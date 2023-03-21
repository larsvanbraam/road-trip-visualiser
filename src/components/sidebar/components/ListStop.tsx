import PlaceIcon from '@mui/icons-material/Place';
import { Tooltip } from '@mui/material';
import React from 'react';
import { StyledListLabel, StyledListStop } from './ListStop.styles';

export function ListStop(props : { location: string }) {
  return (
    <StyledListStop
      variant="body2"
      as="span"
    >
      <PlaceIcon sx={{ mr: 0.5, width: 12, height: 12 }} />
      <Tooltip title={props.location} placement="bottom" arrow>
        <StyledListLabel>{props.location}</StyledListLabel>
      </Tooltip>
    </StyledListStop>
  )
}