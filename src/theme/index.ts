import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#010326'
    },
    secondary: {
      main: '#F2EEEB'
    },
  },
  components: {
    // Name of the component
    MuiFormControl: {
      // variants:
    },
  },
});