import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000B0D',
    },
    secondary: {
      main: '#EF6024',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {},
    },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
  },
});
