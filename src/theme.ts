import { createTheme } from '@mui/material/styles';

export enum Colors {
  Green = "#00836C",
  LightGreen = "#DFF0ED",
  Blue = "#005EB8",
  LightBlue = "#E5F4FD",
  DarkGray = "#404040",
  Gray = "#808080",
  LightGray = "#F4F4F4",
  Red = "#d32f2f",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.Green,
    },
    secondary: {
      main: Colors.Blue,
    },
    error: {
      main: Colors.Red,
    },
    background: {
      default: Colors.LightGray,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: Colors.Green
        }
      }
    }
  }
});

export default theme;