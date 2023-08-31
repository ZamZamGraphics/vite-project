import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Avatar, Skeleton } from "@mui/material";

export default function LoadingForm() {
  return (
    <Grid container alignItems="center" direction="column">
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          backgroundColor: "background.paper",
          borderRadius: "10px",
          boxShadow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Skeleton variant="circular">
              <Avatar sx={{ width: 100, height: 100 }} />
            </Skeleton>
            <Skeleton>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                reprehenderit at commodi eveniet, perspiciatis non culpa enim
                nostrum. Nemo alias voluptate officia totam inventore.
              </Typography>
            </Skeleton>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
