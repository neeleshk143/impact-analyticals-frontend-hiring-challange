import React, { useEffect, useState } from 'react';
import { Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

import './App.css';
function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json');
      const data = await response.json();
      setRecipes(data);
      setOriginalRecipes(data);
    } catch (error) {
      console.log('Error fetching recipes:', error);
    }
  };

  const handlePriceChange = (recipeId, newPrice) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, price: newPrice };
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
  };

  const handleSave = () => {
    setOriginalRecipes([...recipes]);
  };

  const handleReset = () => {
    setRecipes([...originalRecipes]);
  };

  const sortByName = () => {
    const sortedRecipes = [...recipes].sort((a, b) => a.name.localeCompare(b.name));
    setRecipes(sortedRecipes);
  };

  const sortByPrice = () => {
    const sortedRecipes = [...recipes].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setRecipes(sortedRecipes);
  };
  return (
    <div>
      <div className="fixed-buttons-container" style={{ marginTop:'10px'}}>
        <Button onClick={sortByName} variant="contained" style={{ marginRight: '10px',marginLeft:'10px' }}>
          Sort by Name
        </Button>
        <Button onClick={sortByPrice} variant="contained" style={{ marginRight: '10px' }}>
          Sort by Price
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Save
        </Button>
        <Button onClick={handleReset} variant="contained" color="secondary">
          Reset
        </Button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><b>Name</b></TableCell>
    <TableCell><b>Image</b></TableCell>
    <TableCell><b>Category</b></TableCell>
    <TableCell><b>Label</b></TableCell>
    <TableCell><b>Price</b></TableCell>
    <TableCell><b>Description</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>{recipe.name}</TableCell>
                <TableCell>
                  <img src={recipe.image} alt={recipe.name} style={{ width: '100px' }} />
                </TableCell>
                <TableCell>{recipe.category}</TableCell>
                <TableCell>{recipe.label}</TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={recipe.price}
                    onChange={(e) => handlePriceChange(recipe.id, e.target.value)}
                  />
                </TableCell>
                <TableCell>{recipe.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  
}

export default RecipeList;
