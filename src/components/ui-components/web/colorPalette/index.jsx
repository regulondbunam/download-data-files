import { createTheme, ThemeProvider } from '@mui/material/styles';

const THEME = createTheme({
  palette: {
    primary: {
      main: '#1F3D4E',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#D2A769',
      main: '#C98528',
      contrastText: '#ffffff',
    },
    error: {
      main: '#C93A1D',
      contrastText: '#ffffff',
    }
  },
});

export function ColorPalette(props) {
    return (
      <ThemeProvider theme={THEME}>
        {props.children}
      </ThemeProvider>
    );
  }