import { Box, Grid, styled } from '@mui/material';

export const StyledHome = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const StyledMapContainer = styled(Grid)`
  background-color: ${p => p.theme.palette.grey.A200};
  opacity: 0.8;
  background-image: ${p => `linear-gradient(${p.theme.palette.grey.A100} 1px, transparent 1px), linear-gradient(to right, ${p.theme.palette.grey.A100} 1px, ${p.theme.palette.grey.A200} 1px)`};
  background-size: 20px 20px;
`

export const StyledLoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  block-size: 100vh;
`
