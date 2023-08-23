import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { asyncToggleTheme } from "../redux/features/theme/themesSlice";

export default function ThemeSwitch() {
  const dispatch = useDispatch();

  const theme = useTheme();
  return (
    <IconButton onClick={() => dispatch(asyncToggleTheme())} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
