import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: {
      main: '#19857b',
    },
    text: {
        primary: '#FFFFFF',
      },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;