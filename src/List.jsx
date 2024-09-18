import React, { useState, useEffect } from 'react';
import {styled, Container, Grid2, Typography ,Link,Box} from '@mui/material'


function List(){

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

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;


    return(
        <>
        <Box sx={{ maxWidth: '900px', mx: 'auto', p: 2 }}>
                <Grid2 
                    sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center', 
                        alignItems: 'flex-start',
                        gap: 2 
                    }}
                >
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <Grid2 
                                key={recipe.id} 
                                xs={12} 
                                sm={6} 
                                md={4} 
                                p={1} 
                                display="flex" 
                                flexDirection="column" 
                                alignItems="center"
                            >
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.name} 
                                    style={{ width: '100%', height: 'auto', maxWidth: '250px' }} 
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
        </>
    )
}

export default List;