import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
} from "@mui/material";

const RecipeCard = ({ recipe }) => {
  const {
    rep_name,
    author,
    ingredients,
    region,
    cooking_method,
    preparation_time_minutes,
    instructions,
  } = recipe;

  return (
    <Card
      sx={{
        margin: 2,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400, // Adjust the card width
        backgroundColor: "#fef7f6", // Light background color for the card
      }}
    >
      <CardContent>
        {/* Recipe Name */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#ff7043", // Vibrant orange color for the title
            fontWeight: "bold",
          }}
        >
          {rep_name}
        </Typography>
        {/* Author, Region, and Cooking Method */}
        <Typography
          variant="subtitle1"
          sx={{
            color: "#6d4c41", // Muted brown for the subtitle
            fontSize: "1rem",
          }}
        >
          By {author} | Region: {region} | Method: {cooking_method}
        </Typography>
        {/* Divider */}
        <Divider sx={{ margin: "10px 0", borderColor: "#ffab91" }} />{" "}
        {/* Light orange divider */}
        {/* Ingredients Section */}
        <Typography variant="h6" sx={{ color: "#d84315" }}>
          Ingredients
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 2 }}>
          {ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              variant="outlined"
              sx={{
                margin: 0.5,
                borderColor: "#d84315", // Orange border for chips
                color: "#6d4c41", // Muted brown text color
              }}
            />
          ))}
        </Box>
        {/* Preparation Time */}
        <Typography variant="h6" sx={{ color: "#d84315" }}>
          Preparation Time
        </Typography>
        <Typography variant="body1" sx={{ color: "#6d4c41" }}>
          {preparation_time_minutes} minutes
        </Typography>
        {/* Instructions Section */}
        <Typography variant="h6" sx={{ color: "#d84315", marginTop: 2 }}>
          Instructions
        </Typography>
        <Typography variant="body1" sx={{ color: "#6d4c41" }}>
          {instructions.map((instruction, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              {index + 1}. {instruction}
            </Box>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
