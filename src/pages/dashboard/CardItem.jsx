import { Avatar, Card, CardContent, Typography } from "@mui/material";

function CardItem({ icon, iconBgColor, color, title, value }) {
  return (
    <Card sx={{ borderRadius: "16px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          padding: "24px",
        }}
      >
        <Avatar
          src={icon}
          sx={{
            padding: "12px",
            borderRadius: "16px",
            backgroundColor: `${iconBgColor}`,
            width: 50,
            height: 50,
          }}
        />
        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: "25px", fontWeight: 600, color: color }}
          gutterBottom
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardItem;
