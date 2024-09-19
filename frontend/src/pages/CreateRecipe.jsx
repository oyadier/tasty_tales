import { Box } from "@mui/material";
import RecipeForm from "../components/RecipeForm";

function CreateRecipe() {
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
