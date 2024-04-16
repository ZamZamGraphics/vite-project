import GppBadIcon from "@mui/icons-material/GppBad";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Chip } from "@mui/material";

function Status({ status }) {
  let icon, color;
  if (status === "Verified" || status === "Approved") {
    icon = <VerifiedUserIcon />;
    color = "success";
  } else if (status === "Canceled") {
    icon = <GppBadIcon />;
    color = "error";
  } else {
    icon = <GppMaybeIcon />;
    color = "warning";
  }
  return <Chip size="small" label={status} icon={icon} color={color} />;
}

export default Status;
