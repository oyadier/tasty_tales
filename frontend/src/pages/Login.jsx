import { styled } from "@mui/material/styles";
import {
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  height: "100vh",
  [theme.breakpoints.down(540)]: {
    padding: "0 20px",
  },
}));

const StyledCard = styled(Box)(({ theme }) => ({
  background: "#FFFFFF",
  minWidth: "500px",
  maxWidth: "600px",
  marginTop: "5%",
  width: "30%",
  marginBottom: "5%",
  borderRadius: "22px",
  padding: "40px 10px",
  boxShadow:
    "0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)",
  display: "flex",
  flexDirection: "column",

  // Media queries
  [theme.breakpoints.down(540)]: {
    minWidth: "100%",
  },
}));

const StyledTitle = styled(Typography)({
  fontFamily: "Montserrat, sans-serif",
  opacity: "80%",
  fontSize: "35px",
  marginTop: "2rem",
  marginBottom: "1rem",
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
  borderRadius: "22px",
  boxShadow:
    "0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)",
  ".MuiOutlinedInput-root": {
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

const StyledFormControlLabel = styled(FormControlLabel)({
  fontFamily: "Montserrat, sans-serif",
  "& .MuiSvgIcon-root": {
    color: "#ff6347",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    color: "#ff6347",
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
    border: "2px solid #d9534f",
    outline: "none",
  },
});

const StyledSignUp = styled(Typography)({
  margin: "1rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
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

export default function Login() {
  return (
    <StyledContainer>
      <StyledCard>
        <StyledTitle variant="h4">Login</StyledTitle>
        <StyledFormControl>
          <StyledFieldWrapper sx={{ marginBottom: "20px" }}>
            <StyledFormLabel required htmlFor="email">
              Email
            </StyledFormLabel>

            <StyledTextField required />
          </StyledFieldWrapper>
          <StyledFieldWrapper>
            <StyledFormLabel required htmlFor="password">
              Password
            </StyledFormLabel>

            <StyledTextField type="password" />
          </StyledFieldWrapper>
          <StyledFormControlLabel
            control={<Checkbox value="remember" color="#ff6347" />}
            label="Remember me"
          />

          <StyledButton type="submit" variant="contained">
            Sign in
          </StyledButton>
        </StyledFormControl>
        <StyledSignUp variant="subtitle1">
          Have an account?<StyledLink>SignUp</StyledLink>
        </StyledSignUp>
      </StyledCard>
    </StyledContainer>
  );
}
