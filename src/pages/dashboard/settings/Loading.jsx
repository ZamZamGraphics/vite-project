import { Box, Typography, Grid, Skeleton } from "@mui/material";
function Loading() {
  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 800,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        boxShadow: 1,
      }}
    >
      <Skeleton>
        <Typography>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis beatae
          accusamus qui, atque eos animi. Fugiat, quia itaque harum corporis
          dicta vel maxime velit at. Unde, eos porro? Architecto, magnam.
        </Typography>
      </Skeleton>
      <Box>
        <Grid container spacing={3} autoComplete="off">
          <Grid item xs={12}>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton height={50} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Loading;
