import { styled, Typography } from '@mui/material';

export  const StyledListStop = styled(Typography)`
  display: inline-flex;
  text-overflow: ellipsis;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`

export const StyledListLabel = styled('span')`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`