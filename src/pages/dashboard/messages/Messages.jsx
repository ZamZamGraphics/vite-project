import { Alert, AlertTitle, Autocomplete, Box, Button, Card, CardContent, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetBalanceQuery, useSendSMSMutation } from "../../../redux/features/messages/messagesApi";
import { useGetStudentsQuery } from "../../../redux/features/students/studentsApi";

function Messages() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [studentId, setStudentId] = useState([]);
  const [batchNo, setBatchNo] = useState("");
  const [messages, setMessages] = useState("");

  const { data: studentData } = useGetStudentsQuery("?limit=300");
  const {data: SMSBalance, isLoading: balanceLoading} = useGetBalanceQuery();
  const [sendSMS, { data, isLoading, error: responseError }] = useSendSMSMutation();

  let balance;
  if(balanceLoading){
    balance = "Loading...";
  } else if (!balanceLoading && SMSBalance) {
    balance = `BDT ${SMSBalance?.balance}`;
  }

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }
    
    if (responseError?.status === 500) {
      setError({ message: responseError?.data?.message });
    }

    if (data) {
      setStudentId([]);
      setBatchNo("");
      setMessages("");
      setSuccess(data.message);
    }
  }, [responseError, data]);
  
  useEffect(() => {
    if (studentData?.students.length > 0) {
      setStudents(studentData.students.map(std => std.studentId))
    }
  },[studentData])

  const handleStudentId = (value) => {
    setStudentId(value.map((std) => std));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const data = {
      studentId,
      batchNo,
      messages,
    };
    sendSMS(data);
  };

  return (
    <Box sx={{padding: 2}}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={9}>
            <Box 
              sx={{
                padding: 3,
                backgroundColor: "background.paper",
                borderRadius: "10px",
                boxShadow: 1,
              }}
              component="form" 
              onSubmit={handleSubmit}
            >
              <Typography variant="h5" mb={2}>Messages</Typography>
              {success && (
                <Alert sx={{ mb: 3 }} variant="filled" severity="success">
                  {success}
                </Alert>
              )}
              {error?.message && (
                <Alert sx={{ mb: 3 }} variant="filled" severity="error">
                  {error.message}
                </Alert>
              )}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    multiple
                    size="small"
                    id="studentID"
                    value={studentId}
                    onChange={(e, data) => handleStudentId(data)}
                    options={students}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Student ID"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs sx={{textAlign:"center"}}>OR</Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Batch No"
                    name="batchNo"
                    value={batchNo}
                    onChange={(e) => setBatchNo(e.target.value)}
                    error={error.batchNo && true}
                    helperText={error.batchNo && error.batchNo.msg}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    multiline
                    rows={10}
                    label="Messages"
                    name="messages"
                    value={messages}
                    onChange={(e) => setMessages(e.target.value)}
                    error={error.messages && true}
                    helperText={error.messages && error.messages.msg}
                  />
                  <FormHelperText sx={{textAlign:"right"}}>
                    {messages.length} Characters
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    sx={{ borderRadius: "9999px", mt: 2, mb: 2 }}
                    disableElevation
                    variant="contained"
                    disabled={isLoading || !messages}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Card sx={{ borderRadius: "16px" }}>
              <CardContent 
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "12px",
                  padding: "24px",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                  Available Balance
                </Typography>
                <Typography sx={{ fontSize: "25px", fontWeight: 600, color: "#1F69D8" }}>
                  {balance}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: "16px", marginTop:3 }}>
              <CardContent>
                <Alert severity="error" sx={{ borderRadius: "16px" }}>
                  <AlertTitle>UNSUB</AlertTitle>
                    UAE Users please ensure that you put (UNSUB 3811 or OPTOUT 3811) at end of each SMS. As per TRA optout option is mandatory. We will not be responsible for any non delivery arising because of this.
                </Alert>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: "16px", marginTop:3 }}>
              <CardContent>
                <Alert severity="error" sx={{ borderRadius: "16px" }}>
                  <AlertTitle>SMS Content</AlertTitle>
                    <p>* 160 Characters are counted as 1 SMS in case of English language & 70 in other language.</p>
                    <p>* One simple text message containing extended GSM character set (~^{}[]|) is 70 characters long. Check your SMS count before pushing SMS.</p>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Box>
  )
}

export default Messages