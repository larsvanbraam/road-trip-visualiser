import { Box, styled } from '@mui/material';
import shadows from '@mui/material/styles/shadows';

export const EnterSheetIdContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%
`

export const EnterSheetIdModal = styled(Box)`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${p => p.theme.palette.background.paper};
  padding: ${p => p.theme.spacing(4)};
  border-radius: 10px;
  box-shadow: ${shadows[4]}
`;