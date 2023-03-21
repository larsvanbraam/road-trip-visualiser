import { alpha, Box, List, ListItem, styled, Typography } from '@mui/material';

export const StyledSidebar = styled(Box)`
  height: calc(100vh - 64px);
  display: flex; 
  flex-direction: column;
`

export const StyledSidebarTop = styled(Box)`
  padding-block: ${p => p.theme.spacing(2)};
  padding-inline: ${p => p.theme.spacing(1)};
`

export const StyledSidebarList = styled(List)`
  overflow: auto;
  flex-grow: 1;
`

export const StyledSidebarListItem = styled(ListItem)`
  &:nth-child(odd) {
    background: ${p => alpha(p.theme.palette.grey.A100, 0.5)}
  }
`

export  const StyledStopLabel = styled(Typography)`
  display: inline-flex;
  text-overflow: ellipsis;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`

export const StyledLocationLabel = styled('span')`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledSidebarBottom = styled(Box)`
  padding-block: ${p => p.theme.spacing(2)};
  padding-inline: ${p => p.theme.spacing(1)}
`