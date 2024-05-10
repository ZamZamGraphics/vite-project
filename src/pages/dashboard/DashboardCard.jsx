import { Avatar, Card, CardContent, Typography } from "@mui/material";

function DashboardCard({icon, iconBgColor, color, title, value}) {
  return (
    <Card sx={{borderRadius:"16px"}}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                padding:"24px",
              }}
            >
              <Avatar 
                src={icon}
                sx={{ 
                  padding: "12px",
                  borderRadius: "16px",
                  backgroundColor:`${iconBgColor}`,
                  width: 60, 
                  height: 60
                }} 
              />
              <Typography variant="h5" sx={{ fontWeight:500 }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight:600, color:color,  }} gutterBottom>
                {value}
              </Typography>
            </CardContent>
          </Card>
  )
}

export default DashboardCard