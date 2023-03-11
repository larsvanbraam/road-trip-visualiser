import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#023E73'
    },
    secondary: {
      main: '#F2B90F'
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {  }
    }
  }
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
  },
});