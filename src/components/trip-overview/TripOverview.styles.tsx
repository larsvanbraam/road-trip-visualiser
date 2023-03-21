import { styled, TableRow } from '@mui/material';

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background: ${p => p.theme.palette.grey.A100};
  }
  
  &:hover {
    background: ${p => p.theme.palette.grey.A200};
    position: relative;
    
    > td:first-of-type::before {
      content: '';
      inline-size: 4px;
      block-size: 100%;
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      background: ${p => p.theme.palette.secondary.main}
    }
  }
`