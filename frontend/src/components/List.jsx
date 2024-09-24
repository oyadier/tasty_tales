<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { styled, Container, Grid2, Typography, Box } from '@mui/material';
=======
import React, { useState, useEffect } from "react";
import { styled, Container, Grid2, Typography, Box } from "@mui/material";
>>>>>>> 430360ccde710b4e14e2332cef4b1096d92bd116

function List() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
=======
        const response = await fetch("https://dummyjson.com/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
>>>>>>> 430360ccde710b4e14e2332cef4b1096d92bd116
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

<<<<<<< HEAD
  if (loading) return <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>;
  if (error) return <Typography sx={{ textAlign: 'center' }}>Error: {error}</Typography>;

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 2 }}>
      <Grid2
        container
        spacing={{xs:2,md: 3 }}
        sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
=======
  if (loading)
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  if (error)
    return <Typography sx={{ textAlign: "center" }}>Error: {error}</Typography>;

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", p: 2 }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
>>>>>>> 430360ccde710b4e14e2332cef4b1096d92bd116
      >
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Grid2
<<<<<<< HEAD
              item
=======
>>>>>>> 430360ccde710b4e14e2332cef4b1096d92bd116
              key={recipe.id}
              display="flex"
              flexDirection="column"
              alignItems="center"
<<<<<<< HEAD
              sx={{ width: { md: '250px', sm: '200px', xs: '150px' } }} 
=======
              sx={{ width: { md: "250px", sm: "200px", xs: "150px" } }}
>>>>>>> 430360ccde710b4e14e2332cef4b1096d92bd116
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
<<<<<<< HEAD
                  width: '100%',
                  height: 'auto',
                  maxWidth: '240px',
=======
                  width: "100%",
                  height: "auto",
                  maxWidth: "240px",
>>>>>>> 430360ccde710b4e14e2332cef4b1096d92bd116
                }}
              />
              <Typography variant="subtitle2" align="center" sx={{ mt: 1 }}>
                {recipe.name}
              </Typography>
            </Grid2>
          ))
        ) : (
          <Typography>No recipes available.</Typography>
        )}
      </Grid2>
    </Box>
  );
}

export default List;
