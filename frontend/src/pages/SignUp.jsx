import { styled } from "@mui/material/styles";
import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authUrls } from "../constants/API_ENDPOINTS";
import { toast } from "react-toastify";
const StyledContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  height: "100vh",
  padding: "40px 0",
  [theme.breakpoints.down(540)]: {
    padding: "40px 20px",
  },
}));

const StyledCard = styled(Box)(({ theme }) => ({
  background: "#FFFFFF",
  minWidth: "500px",
  maxWidth: "600px",
  width: "30%",
  borderRadius: "22px",
  padding: "20px 10px",
  boxShadow:
    "0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down(540)]: {
    minWidth: "100%",
  },
}));

const StyledTitle = styled(Typography)({
  fontFamily: "Montserrat, sans-serif",
  opacity: "80%",
  fontSize: "35px",
  marginTop: "1rem",
  marginBottom: "2rem",
  textAlign: "center",
});

const StyledFormControl = styled(FormControl)({
  width: "80%",
  marginLeft: "10%",
});

const StyledFormLabel = styled(FormLabel)({
  fontFamily: "Montserrat, sans-serif",
  textAlign: "left",
  fontSize: "20px",
});

const StyledTextField = styled(TextField)({
  width: "100%",
  ".MuiOutlinedInput-root": {
    borderRadius: "22px",
    boxShadow:
      "0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)", // Apply the box shadow here
    "& fieldset": {
      borderRadius: "22px",
    },
    "&:hover fieldset": {
      borderColor: "#ff6347",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff6347",
    },
  },
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  padding: "10px 60px",
  width: "100%",
  whiteSpace: "nowrap",
  borderRadius: "30px",
  border: "1px solid #ff6347",
  backgroundColor: "#ff6347",
  color: "#FFFFFF",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "20px",
  alignSelf: "center",
  boxShadow:
    "0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)",
  "&:hover": {
    backgroundColor: "#e55344",
    borderColor: "#c9302c",
  },
  "&:focus": {
    outline: "none",
  },
  "&:active": {
    transform: "none",
  },
});

const StyledLogin = styled(Typography)({
  margin: "1rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

const StyledLink = styled(Link)({
  color: "#ff6347",
  textDecorationColor: "#FF6347",
  "&:hover": {
    color: "#d9534f",
  },
});

const StyledFieldWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export default function SignUp() {
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(authUrls.register, data);

      toast.success("User created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to create user. Please try again.");
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledTitle variant="h4">Signup</StyledTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormControl>
            <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
              <Grid item xs={12} sm={6}>
                <StyledFieldWrapper>
                  <StyledFormLabel required htmlFor="first_name">
                    First Name
                  </StyledFormLabel>
                  <StyledTextField
                    id="first_name"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    error={!!errors.first_name}
                    helperText={
                      errors.first_name ? errors.first_name.message : ""
                    }
                  />
                </StyledFieldWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledFieldWrapper>
                  <StyledFormLabel required htmlFor="last_name">
                    Last Name
                  </StyledFormLabel>
                  <StyledTextField
                    id="last_name"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    error={!!errors.last_name}
                    helperText={
                      errors.last_name ? errors.last_name.message : ""
                    }
                  />
                </StyledFieldWrapper>
              </Grid>
            </Grid>

            <StyledFieldWrapper sx={{ marginBottom: "20px" }}>
              <StyledFormLabel required htmlFor="email">
                Email
              </StyledFormLabel>
              <StyledTextField
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            </StyledFieldWrapper>

            <StyledFieldWrapper>
              <StyledFormLabel required htmlFor="password">
                Password
              </StyledFormLabel>
              <StyledTextField
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            </StyledFieldWrapper>

            <StyledButton type="submit" disableElevation>
              Signup
            </StyledButton>
          </StyledFormControl>
        </form>
        <StyledLogin variant="subtitle1">
          <StyledLink onClick={() => navigate("/login")}>login</StyledLink>
        </StyledLogin>
      </StyledCard>
    </StyledContainer>
  );
}
