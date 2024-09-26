import { Box } from "@mui/material";
import RecipeForm from "../components/RecipeFormModal";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
function CreateRecipe() {
  const [cookies, removeCookie] = useCookies(["token"]);
  useEffect(() => {
    const token = cookies.token;
    console.log("Token:", token);

    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get(
          "https://tasty-tales.pramshighedu.com/recipes/user/recipes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Include this line
          }
        );
        console.log("Recipes:", response.data);
      } catch (err) {
        console.error(
          "Error fetching recipes:",
          err.response ? err.response.data : err.message
        );
        if (err.response) {
          console.error("Status Code:", err.response.status);
        }
      }
    };

    fetchUserRecipes();
  }, []);
  return (
    <Box
      sx={{
        padding: "40px",
        backgroundColor: "#FFAB91",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <RecipeForm />
    </Box>
  );
}

export default CreateRecipe;
