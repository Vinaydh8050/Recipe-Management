import React, { useEffect, useState } from "react";
import { fetchRecipes, deleteRecipe } from "../services/api";
import { FaTrash } from "react-icons/fa";
import "../styles/RecipeList.css";

const RecipeList = ({ onSelectRecipe, selectedRecipeId, refresh, setShowDetails }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    loadRecipes();
  }, [refresh]);

  useEffect(() => {
    filterRecipesByCategory();
  }, [selectedCategory, recipes]);

  const loadRecipes = async () => {
    const data = await fetchRecipes();
    setRecipes(data);
    setCategories(getUniqueCategories(data));
  };

  const getUniqueCategories = (data) => {
    const uniqueCategories = new Set(data.map((recipe) => recipe.category));
    return Array.from(uniqueCategories);
  };

  const filterRecipesByCategory = () => {
    if (selectedCategory === "All") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) => recipe.category === selectedCategory);
      setFilteredRecipes(filtered);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDelete = async (recipeId) => {
    await deleteRecipe(recipeId);
    setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
  };

  const handleRecipeClick = (recipeId) => {
    onSelectRecipe(recipeId);
    setShowDetails(true);
  };

  const handleSurpriseMe = () => {
    if (filteredRecipes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const randomRecipe = filteredRecipes[randomIndex];
    onSelectRecipe(randomRecipe._id);
    setShowDetails(true);
  };

  return (
    <div className="recipe-list-container">
      <h2 className="recipe-list-heading">Recipe List</h2>

      <div className="sort-options">
        <label htmlFor="category">Select Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <button className="surprise-button" onClick={handleSurpriseMe}>
        Surprise Me!
      </button>

      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className={`recipe-item ${selectedRecipeId === recipe._id ? "selected" : ""}`}
            onClick={() => handleRecipeClick(recipe._id)}
          >
            <span className="recipe-title">{recipe.title}</span>
            <FaTrash
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(recipe._id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
