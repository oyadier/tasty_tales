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
    image_url,
    author,
    rep_name,
    ingredients,
    region,
    cooking_method,
    preparation_time_minutes,
    instructions,
  } = recipe;



//  const img1='https://drive.google.com/file/d/1lNFD12ji4EOACPmKpyYAdleGf7NfCYW_/view?usp=sharing'
//  const img2='https://drive.google.com/uc?export=view&id=1lNFD12ji4EOACPmKpyYAdleGf7NfCYW_'
//  const img3 = 'https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=view&id=1lNFD12ji4EOACPmKpyYAdleGf7NfCYW_';
//  const img='https://png.pngtree.com/png-clipart/20230414/original/pngtree-isolated-burger-on-transparent-background-png-image_9055072.png'
//  const imgg= 'https://i.imgur.com/UkR3Qlv.jpeg'; // A random public image for testing
// const fallbackImg = 'https://via.placeholder.com/150'; // Fallback image in case of failure


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
      
      <CardContent sx={{p:0}}>
        {/*Recipe Image */}
        {/* <div > */}
       <img src={image_url} style={{width:'100%'}}/>
       {/* </div> */}
        {/* Recipe Name */}
        <Box sx={{p:1}}>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;


// import React, { useState } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';

// // Helper function to convert Google Drive link to direct image URL
// const convertUrl = (url) => {
//   const googleDriveBaseUrl = "https://drive.google.com/file/d/";
//   if (url && url.startsWith(googleDriveBaseUrl)) {
//     const fileId = url.split("/d/")[1].split("/")[0]; // Extract file ID from the URL
//     return `https://drive.google.com/uc?export=view&id=${fileId}`;
//   }
//   return url; // Return the original URL if it's not a Google Drive link
// };

// const RecipeCard = ({ recipe }) => {
//   const {
//     image_url, // This should be the Google Drive URL
//     rep_name,
//   } = recipe;

//   const [imgError, setImgError] = useState(false); // State to track image load error
//   const imageLink = convertUrl(image_url); // Convert Google Drive URL to direct image URL

//   return (
//     <Card
//       sx={{
//         margin: 2,
//         borderRadius: 2,
//         boxShadow: 3,
//         maxWidth: 400,
//         backgroundColor: "#fef7f6",
//       }}
//     >
//       <CardContent>
//         {imgError ? (
//           <Typography color="error">Error: Failed to load the image.</Typography>
//         ) : (
//           <img
//             // src={imageLink} // Use the converted Google Drive direct URL
//             alt="Recipe Image"
//             style={{ width: "100%", height: "auto", maxWidth: "100%" }}
//             onError={() => setImgError(true)} // Set error state if the image fails to load
//           />
//         )}
//         <Typography variant="h5">{rep_name}</Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default RecipeCard;

