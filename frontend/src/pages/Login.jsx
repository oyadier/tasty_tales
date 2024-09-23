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

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authUrls } from "../constants/API_ENDPOINTS";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

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
    outline: "none",
  },
  "&:active": {
    transform: "none",
  },
});

const StyledSignUp = styled(Typography)({
  margin: "1rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
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

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Create FormData object
      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await axios.post(authUrls.login, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Get the token from the response
      const token = response.data.access_token;

      // Set the cookie
      setCookie("token", token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      navigate("/home");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.detail);
      } else {
        toast.error("Error:", err.message);
      }
    }
  };

  useEffect(() => {
    removeCookie("token", { path: "/" });
  }, []);

  return (
    <StyledContainer>
      <StyledCard>
        <StyledTitle variant="h4">Login</StyledTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormControl>
            <StyledFieldWrapper sx={{ marginBottom: "20px" }}>
              <StyledFormLabel required htmlFor="email">
                Email
              </StyledFormLabel>
              <StyledTextField
                id="email"
                type="email"
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
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
            <StyledFormControlLabel
              control={<Checkbox value="remember" color="#ff6347" />}
              label="Remember me"
            />

            <StyledButton type="submit" disableElevation>
              Sign in
            </StyledButton>
          </StyledFormControl>
        </form>
        <StyledSignUp onClick={() => navigate("/signup")} variant="subtitle1">
          Have an account?<StyledLink>SignUp</StyledLink>
        </StyledSignUp>
      </StyledCard>
    </StyledContainer>
  );
}
