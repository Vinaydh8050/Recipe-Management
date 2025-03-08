import React, { useState } from "react";
import { addRecipe } from "../services/api";
import "../styles/AddRecipeForm.css";

const AddRecipeForm = ({ onRecipeAdded }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      instructions,
      category,
    };

    await addRecipe(newRecipe);
    onRecipeAdded(); // Notify parent to refresh the recipe list

    // Reset form
    setTitle("");
    setIngredients("");
    setInstructions("");
    setCategory("");
  };

  return (
    <div className="add-recipe-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">Add Recipe</h2>

        <div className="form-row">
          <div className="form-item">
            <label>Recipe Name:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter recipe name"
              required
            />
          </div>

          <div className="form-item">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Vegetarian, Non-Veg"
              required
            />
          </div>

          <div className="form-item">
            <label>Ingredients:</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List ingredients separated by commas"
              required
            />
          </div>

          <div className="form-item">
            <label>Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter the cooking instructions here"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;