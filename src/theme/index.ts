import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#02182B'
    },
    secondary: {
      main: '#0197F6'
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