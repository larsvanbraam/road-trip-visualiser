import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  // interface Palette {
  //   white: Palette['primary'];
  // }
  //
  // interface PaletteOptions {
  //   white: PaletteOptions['primary'];
  // }
}

declare module '@mui/material/FormControl' {
  // interface FormControlPropsColorOverrides {
  //   white: true
  // }
}

declare module '@mui/material/Input' {
  // interface InputLabelPropsColorOverrides {
  //   white: true
  // }
}


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