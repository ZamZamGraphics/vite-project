import { grey, blueGrey, blue, lightGreen } from "@mui/material/colors";

export const themeSettings = (mode) => ({
  palette: {
    mode: mode ? "dark" : "light",
    bodybg: mode ? blueGrey[900] : grey[100],
    active: {
      text: mode ? lightGreen[50] : blue[600],
      background: mode ? lightGreen[800] : blue[50],
    },
    background: {
      default: mode ? blueGrey[900] : grey[100],
    },
  },
});
