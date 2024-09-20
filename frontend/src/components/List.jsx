// import React, { useState, useEffect } from 'react';
// import {styled, Container, Grid2, Typography ,Link,Box} from '@mui/material'


// function List(){

//     const [recipes, setRecipes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             try {
//                 const response = await fetch('https://dummyjson.com/recipes');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setRecipes(data.recipes || []); 
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecipes();
//     }, []);

//     if (loading) return <Typography sx={{textAlign:'center'}}>Loading...</Typography>;
//     if (error) return <Typography sx={{textAlign:'center'}}>Error: {error}</Typography>;


//     return(
//         <>
//   <Box sx={{ maxWidth: {md:'800px',sm:'500px',xs:'250px'}, mx: 'auto', p: 2 }}>
//     <Grid2
//       container
//       width='100%'
//       spacing={2.4}
//       sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
//     >
//       {recipes.length > 0 ? (
//         recipes.map((recipe) => (
//           <Grid2
//             item
//             key={recipe.id}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             p={1}
//           >
//             <img
//               src={recipe.image}
//               alt={recipe.name}
//               style={{ width: '100%', height: 'auto', maxWidth: {md:'230px',sm:'180px',xs:'100px'}}}
//             />
//             <Typography variant="subtitle2" align="center" sx={{ mt: 1 }}>
//               {recipe.name}
//             </Typography>
//           </Grid2>
//         ))
//       ) : (
//         <Typography>No recipes available.</Typography>
//       )}
//     </Grid2>
//   </Box>
//         </>
//     )
// }

// export default List;


import React, { useState, useEffect } from 'react';
import { styled, Container, Grid2, Typography, Box } from '@mui/material';

function List() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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

  if (loading) return <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>;
  if (error) return <Typography sx={{ textAlign: 'center' }}>Error: {error}</Typography>;

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 2 }}>
      <Grid2
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Grid2
              item
              key={recipe.id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={1}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '240px',
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
