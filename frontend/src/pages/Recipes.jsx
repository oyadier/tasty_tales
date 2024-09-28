import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { masterUrls } from "../constants/API_ENDPOINTS";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import RecipeFormModal from "../components/RecipeFormModal";
import RecipeCard from "../components/RecipeCard";
const recipe = {
  id: "fa13230c-d76c-4555-ae2e-e08d10b1dd4a",
  created_at: "Sun Sep 22 05:58:31 2024",
  rep_name: "random recipe 2",
  author: "Eric",
  email: "ericgeorge123456@gmail.com",
  ingredients: ["random ingredient 2", "random ingredient 2"],
  region: "Europe",
  cooking_method: "Grilling",
  preparation_time_minutes: 50,
  instructions: ["random instruction 2", "random instruction 2"],
};
export default function Recipes() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState(null); // State to store user data

  // Function to log out user
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
    toast.info("Session expired. Please log in again.");
  };

  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(masterUrls.getUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error(
          "Error fetching user data:",
          err.response?.data || err.message
        );
      }
    };

    const fetchUserRecipes = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(masterUrls.userRecipes, config);
        console.log("Recipes:", response.data);
      } catch (err) {
        console.error(
          "Error fetching recipes:",
          err.response?.data || err.message
        );
      }
    };

    // Check token expiration
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      const tokenExpirationTime = decodedToken.exp;

      if (tokenExpirationTime < currentTime) {
        handleLogout();
      } else {
        fetchUserData();
        fetchUserRecipes();

        // Set a timer to logout when the token expires
        const timeRemaining = tokenExpirationTime - currentTime;
        const timer = setTimeout(() => handleLogout(), timeRemaining * 1000);
        return () => clearTimeout(timer); // Cleanup on unmount
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout();
    }
  }, [cookies]);

  // useEffect(() => {
  //   const token = cookies.token;

  //   if (token) {
  //     try {
  //       // Decode the token to get user data and expiration time
  //       const decodedToken = jwtDecode(token);

  //       // Get current time and expiration time
  //       const currentTime = Date.now() / 1000; // current time in seconds
  //       const tokenExpirationTime = decodedToken.exp;

  //       // Calculate the remaining time until token expiration
  //       const timeRemaining = tokenExpirationTime - currentTime;

  //       // If the token is expired, log out the user
  //       if (timeRemaining <= 0) {
  //         handleLogout();
  //       } else {
  //         // Set a timer to log out when the token expires
  //         const timer = setTimeout(() => {
  //           handleLogout();
  //         }, timeRemaining * 1000); // Convert seconds to milliseconds

  //         // Clean up the timer on component unmount
  //         return () => clearTimeout(timer);
  //       }
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       handleLogout(); // Log out in case of an invalid token
  //     }
  //   }
  // }, [cookies]);

  const recipe = {
    id: "fa13230c-d76c-4555-ae2e-e08d10b1dd4a",
    created_at: "Sun Sep 22 05:58:31 2024",
    rep_name: "random recipe 2",
    author: "Eric",
    email: "ericgeorge123456@gmail.com",
    ingredients: [
      "random ingredient 2",
      "random ingredient 2",
      "random ingredient 2",
      "random ingredient 2",
    ],
    region: "Europe",
    cooking_method: "Grilling",
    preparation_time_minutes: 50,
    instructions: [
      "random instruction 2",
      "random instruction 2",
      "random instruction 2",
      "random instruction 2",
    ],
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "78px 32px 20px 32px",
      }}
    >
      {userData ? (
        <>
          {/* Display the user's first and last name */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#4A2C2A",
              fontSize: "2.5rem",
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)",
            }}
          >
            Welcome{" "}
            <span style={{ color: "#e64a19" }}>
              {userData.first_name} {userData.last_name} !
            </span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#4A2C2A",
                fontSize: "1.2rem",
                textShadow: "1px 1px 2px rgba(255, 255, 255, 0.5)",
              }}
            >
              Here are your recipes:
            </Typography>
            <RecipeFormModal />
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Wraps items to the next line if there’s no space
          justifyContent: "center", // Centers the items horizontally
          gap: 3, // Adds space between items
          padding: 2, // Adds padding around the container
        }}
      >
        <RecipeCard recipe={recipe} />
      </Box>
    </Box>
  );
}
