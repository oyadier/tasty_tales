import React, { useState, useEffect } from "react";
import { styled, Container, Grid2, Typography, Box } from "@mui/material";
import axios from "axios";
import { masterUrls } from "../constants/API_ENDPOINTS";
import RecipeCard from "./RecipeCard";

function List() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(masterUrls.allRecipes);
        console.log(response);
        setRecipes(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      };

    fetchRecipes();
  }, []);

  if (loading)
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  if (error)
    return <Typography sx={{ textAlign: "center" }}>Error: {error}</Typography>;
  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {recipes.map((recipe, index) => {
        return <Card
        sx={{
          margin: 2,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          backgroundColor: "#fef7f6",
        }}
      >
        <CardContent>
            <img
              src={recipe.image_url}
              alt="Recipe Image"
              style={{ width: "100%", height: "auto", maxWidth: "100%" }}
            />
          <Typography variant="h5">{recipe.rep_name}</Typography>
        </CardContent>
      </Card>
      })}
    </Box>
  );
}
export default List;
