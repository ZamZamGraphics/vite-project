import { useParams } from "react-router-dom";
import { useGetAdmissionQuery } from "../../../redux/features/admission/admissionApi";
import { Alert, Box, Grid, Typography } from "@mui/material";
import logo from "../../../assets/images/logo-dark.svg";

function Invoice() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAdmissionQuery(id);

  let admission;

  if (isLoading) {
    admission = "Loading...";
  } else if (!isLoading && isError) {
    admission = <Alert severity="error">Internal Server Error</Alert>;
  } else if (!isLoading && !isError && data) {
    // console.log(data);
    admission = (
      <Grid container alignItems="center" direction="column">
        <Grid item xs={9}>
          <Box
            sx={{
              padding: 5,
              backgroundColor: "background.paper",
              borderRadius: "6px",
              boxShadow: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img src={logo} alt="AL MADINA IT" width={220} />
                <Typography mt={2}>
                  #Fakhre Bangal Road, Kandipara, <br />
                  Brahmanbaria-3400 <br />
                  Email: almadinait@gmail.com <br />
                  Phone : 01736722622
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" align="center" mb={2}>
                  Invoice No : 321452
                </Typography>
              </Grid>
              
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
  return admission;
}

export default Invoice;
