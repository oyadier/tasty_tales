import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import recipeImage from "../assets/Waffle-Recipe-Recipe-Card.jpg";
const RecipeCard = ({ recipe }) => {
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "20px auto",
        boxShadow: 3,
        borderRadius: "12px",
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={recipeImage} // Replace with actual image URL
        alt={recipe.rep_name}
      />

      <CardContent sx={{ padding: "16px" }}>
        <Box sx={{ paddingBottom: 2 }}>
          {/* Recipe Name */}
          <Typography variant="h5" gutterBottom color="primary">
            {recipe.rep_name}
          </Typography>

          {/* Author */}
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            By {recipe.author}
          </Typography>

          {/* Region */}
          <Typography variant="body2" color="textSecondary">
            Region: {recipe.region}
          </Typography>
        </Box>

        {/* Ingredients & Instructions */}
        <Grid container spacing={2}>
          {/* Ingredients */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              fontSize="1rem"
            >
              Ingredients
            </Typography>
            <List dense>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Instructions */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              fontSize="1rem"
            >
              Instructions
            </Typography>
            <List dense>
              {recipe.instructions.map((step, index) => (
                <ListItem key={index}>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {/* Preparation Time */}
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ marginTop: 1 }}
        >
          Prep Time: {recipe.preparation_time_minutes} mins
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
