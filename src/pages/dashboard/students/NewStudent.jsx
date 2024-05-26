import {
  Avatar,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddStudentMutation } from "../../../redux/features/students/studentsApi";

function NewStudent() {
  const [avatar, setAvatar] = useState(null);
  const [avatarImage, setAvatarImage] = useState("");

  const [student, setStudent] = useState({
    fullName: "",
    fathersName: "",
    mothersName: "",
    presentAddress: "",
    permanentAddress: "",
    birthDay: "",
    gender: "",
    stdPhone: "",
    guardianPhone: "",
    email: "",
    occupation: "",
    nid: "",
    birthCertificate: "",
    bloodGroup: "",
    education: "",
    reference: "",
  });

  const [error, setError] = useState("");

  const [addStudent, { data, isLoading, error: responseError }] =
    useAddStudentMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (data?.student) {
      navigate("/dashboard/admission/new", { state: data?.student.studentId });
    }
  }, [responseError, data, navigate]);

  const handleChange = (name, value) => {
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleChangeAddress = (name, value) => {
    if (name == "presentAddress") {
      setStudent({
        ...student,
        presentAddress: value,
        permanentAddress: value,
      });
    } else {
      setStudent({
        ...student,
        permanentAddress: value,
      });
    }
  };

  const handleChangeGender = (event) => {
    setStudent({
      ...student,
      gender: event.target.value,
    });
  };

  const changeAvarar = (file) => {
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const dob = student.birthDay ? dayjs(student.birthDay).format() : "";
    const form = new FormData();
    form.append("avatar", avatar);
    form.append("fullName", student.fullName);
    form.append("fathersName", student.fathersName);
    form.append("mothersName", student.mothersName);
    form.append("address.present", student.presentAddress);
    form.append("address.permanent", student.permanentAddress);
    form.append("birthDay", dob);
    form.append("gender", student.gender);
    form.append("stdPhone", student.stdPhone);
    form.append("guardianPhone", student.guardianPhone);
    form.append("email", student.email);
    form.append("occupation", student.occupation);
    form.append("nid", student.nid);
    form.append("birthCertificate", student.birthCertificate);
    form.append("bloodGroup", student.bloodGroup);
    form.append("education", student.education);
    form.append("reference", student.reference);
    form.append("status", "Pending");
    addStudent(form);
  };

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
        <Typography variant="h5" align="center" mb={2}>
          Add New Student
        </Typography>
        {error?.message && (
          <Alert mb={3} variant="filled" severity="error">
            {error.message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} autoComplete="off">
            <Grid item xs={12} align="center">
              <input
                type="file"
                hidden
                accept="image/*"
                name="avatar"
                id="avatarUpload"
                onChange={(e) => changeAvarar(e.target.files[0])}
              />
              <label htmlFor="avatarUpload">
                <IconButton component="span">
                  <Avatar src={avatarImage} sx={{ width: 100, height: 100 }} />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Full Name"
                name="fullName"
                value={student.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                id={error?.fullName && "fullName-error"}
                error={error?.fullName && true}
                helperText={error?.fullName && error?.fullName?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Fathers Name"
                name="fathersName"
                value={student.fathersName}
                onChange={(e) => handleChange("fathersName", e.target.value)}
                id={error?.fathersName && "fathersName-error"}
                error={error?.fathersName && true}
                helperText={error?.fathersName && error?.fathersName?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Mothers Name"
                name="mothersName"
                value={student.mothersName}
                onChange={(e) => handleChange("mothersName", e.target.value)}
                id={error?.mothersName && "mothersName-error"}
                error={error?.mothersName && true}
                helperText={error?.mothersName && error?.mothersName?.msg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Present Address"
                name="presentAddress"
                value={student.presentAddress}
                onChange={(e) =>
                  handleChangeAddress("presentAddress", e.target.value)
                }
                id={error["address.present"] && "present-address-error"}
                error={error["address.present"] && true}
                helperText={
                  error["address.present"] && error["address.present"]?.msg
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Permanent Address"
                name="permanentAddress"
                value={student.permanentAddress}
                onChange={(e) =>
                  handleChangeAddress("permanentAddress", e.target.value)
                }
                id={error?.permanentAddress && "permanentAddress-error"}
                error={error?.permanentAddress && true}
                helperText={
                  error?.permanentAddress && error?.permanentAddress?.msg
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="tel"
                size="small"
                label="Student mobile number"
                name="stdPhone"
                value={student.stdPhone}
                onChange={(e) => handleChange("stdPhone", e.target.value)}
                id={error?.stdPhone && "stdPhone-error"}
                error={error?.stdPhone && true}
                helperText={error?.stdPhone && error?.stdPhone?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="tel"
                size="small"
                label="Guardian number"
                name="guardianPhone"
                value={student.guardianPhone}
                onChange={(e) => handleChange("guardianPhone", e.target.value)}
                id={error?.guardianPhone && "guardianPhone-error"}
                error={error?.guardianPhone && true}
                helperText={error?.guardianPhone && error?.guardianPhone?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  name="birthDay"
                  value={student.birthDay}
                  onChange={(value) =>
                    handleChange("birthDay", value) // dayjs(value.$d).format()
                  }
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: error.birthDay ? true : false,
                      helperText: error.birthDay && error.birthDay.msg,
                    },
                  }}
                  sx={{ mt: 1 }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl error={error?.gender && true}>
                <RadioGroup
                  row
                  sx={{ mt: 1 }}
                  aria-labelledby="gender-group-label"
                  name="gender"
                  value={student.gender}
                  onChange={handleChangeGender}
                >
                  <FormControlLabel
                    label="Female"
                    value="Female"
                    checked={student.gender === "Female"}
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Male"
                    value="Male"
                    checked={student.gender === "Male"}
                    control={<Radio />}
                  />
                </RadioGroup>
                {error?.gender && (
                  <FormHelperText id="gender-error">
                    {error?.gender?.msg}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Student's Occupation"
                name="occupation"
                value={student.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
                id={error?.occupation && "occupation-error"}
                error={error?.occupation && true}
                helperText={error?.occupation && error?.occupation?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Educational Qualification"
                name="education"
                value={student.education}
                onChange={(e) => handleChange("education", e.target.value)}
                id={error?.education && "education-error"}
                error={error?.education && true}
                helperText={error?.education && error?.education?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                size="small"
                label="Blood Group"
                name="bloodGroup"
                value={student.bloodGroup}
                onChange={(e) => handleChange("bloodGroup", e.target.value)}
                id={error?.bloodGroup && "bloodGroup-error"}
                error={error?.bloodGroup && true}
                helperText={error?.bloodGroup && error?.bloodGroup?.msg}
              >
                {bloodGroup.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Reference"
                name="reference"
                value={student.reference}
                onChange={(e) => handleChange("reference", e.target.value)}
                id={error?.reference && "reference-error"}
                error={error?.reference && true}
                helperText={error?.reference && error?.reference?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="tel"
                size="small"
                label="NID Number"
                name="nid"
                value={student.nid}
                onChange={(e) => handleChange("nid", e.target.value)}
                id={error?.nid && "nid-error"}
                error={error?.nid && true}
                helperText={error?.nid && error?.nid?.msg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="tel"
                size="small"
                label="Birth Certificate Number"
                name="birthCertificate"
                value={student.birthCertificate}
                onChange={(e) =>
                  handleChange("birthCertificate", e.target.value)
                }
                id={error?.birthCertificate && "birthCertificate-error"}
                error={error?.birthCertificate && true}
                helperText={
                  error?.birthCertificate && error?.birthCertificate?.msg
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="email"
                size="small"
                label="Email"
                name="email"
                value={student.email}
                onChange={(e) => handleChange("email", e.target.value)}
                id={error?.email && "email-error"}
                error={error?.email && true}
                helperText={error?.email && error?.email?.msg}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
                variant="contained"
                disableElevation
                disabled={isLoading}
              >
                Add New Student
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default NewStudent;

const bloodGroup = [
  { value: "A positive (A+)", label: "A positive (A+)" },
  { value: "A negative (A-)", label: "A negative (A-)" },
  { value: "B positive (B+)", label: "B positive (B+)" },
  { value: "B negative (B-)", label: "B negative (B-)" },
  { value: "O positive (O+)", label: "O positive (O+)" },
  { value: "O negative (O-)", label: "O negative (O-)" },
  { value: "AB positive (AB+)", label: "AB positive (AB+)" },
  { value: "AB negative (AB-)", label: "AB negative (AB-)" },
];
