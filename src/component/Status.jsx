import { Chip } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";

function Status({ status }) {
  let icon, color;
  if (status === "Verified") {
    icon = <VerifiedUserIcon />;
    color = "success";
  } else {
    icon = <GppBadIcon />;
    color = "warning";
  }
  return <Chip size="small" label={status} icon={icon} color={color} />;
}

export default Status;
