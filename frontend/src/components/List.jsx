import React, { useState, useEffect } from "react";
import { styled, Container, Grid2, Typography, Box } from "@mui/material";

function List() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data.recipes || []);
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
    <Box>
      
    </Box>
  );
}

export default List;
