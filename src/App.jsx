import {
  Backdrop,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import router from "./routes/router";
import { themeSettings } from "./theme";

function App() {
  const authChecked = useAuthCheck();

  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = useMemo(() => createTheme(themeSettings(darkMode)), [darkMode]);
  return !authChecked ? (
    <Backdrop
      sx={{ color: "background", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    />
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
