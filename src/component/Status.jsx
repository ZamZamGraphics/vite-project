import { Chip } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";

function Status({ status }) {
  let icon, color;
  if (status === "Verified" || status === "Approved") {
    icon = <VerifiedUserIcon />;
    color = "success";
  } else if (status === "Rejected") {
    icon = <GppBadIcon />;
    color = "error";
  } else {
    icon = <GppMaybeIcon />;
    color = "warning";
  }
  return <Chip size="small" label={status} icon={icon} color={color} />;
}

export default Status;
