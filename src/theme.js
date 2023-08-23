import { grey, blueGrey, lightBlue, lightGreen } from "@mui/material/colors";

export const themeSettings = (mode) => ({
  palette: {
    mode: mode ? "dark" : "light",
    bodybg: mode ? blueGrey[900] : grey[100],
    active: {
      text: mode ? lightGreen[50] : lightBlue[900],
      background: mode ? lightGreen[800] : lightBlue[50],
    },
    background: {
      default: mode ? blueGrey[900] : grey[100],
    },
  },
});
