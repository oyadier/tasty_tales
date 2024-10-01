import React, { useState, useEffect } from "react";
import { styled, Container, Grid2, Typography, Box, Card ,CardContent } from "@mui/material";
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
        mt: 12,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        px:6
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
        <CardContent sx={{p:0}}>
            <img
              src={recipe.image_url}
              alt="Recipe Image"
              style={{ width: "100%", height: "auto", maxWidth: "100%" }}
            />
          <Box sx={{p:1}} >
          <Typography variant="h5" sx={{color:'#FF7043'}}>{recipe.rep_name}</Typography>
          <Typography variant="subtitle-2" sx={{mt:'2em'}}>by {recipe.author}</Typography>
          </Box>
        </CardContent>
      </Card>
      })}
    </Box>
  );
}
export default List;
