import React, { useEffect, useState } from "react";
import { fetchRecipeById } from "../services/api";
import "../styles/RecipeDetails.css";

const RecipeDetails = ({ recipeId, handleCloseDetails }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (recipeId) {
      fetchRecipe(recipeId);
    }
  }, [recipeId]);

  const fetchRecipe = async (id) => {
    const data = await fetchRecipeById(id);
    setRecipe(data);
  };

  if (!recipe) return <p>Loading recipe details...</p>;

  return (
    <div className="recipe-details-container">
      <button className="close-btn" onClick={handleCloseDetails}>
        <span className="close-icon">&times;</span>
      </button>
      <h2>{recipe.title}</h2>
      <p>
        <strong>Category:</strong> {recipe.category}
      </p>

      <div className="recipe-section">
        <h3>Ingredients:</h3>
        <p>{recipe.ingredients.join(", ")}</p>
      </div>

      <div className="recipe-section">
        <h3>Instructions:</h3>
        <ul className="recipe-instructions">
          {recipe.instructions.split("\n").map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;