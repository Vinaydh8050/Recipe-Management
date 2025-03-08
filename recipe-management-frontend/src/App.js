import React, { useState } from "react";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import AddRecipeForm from "./components/AddRecipeForm";
import "./App.css";

const App = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [refreshRecipes, setRefreshRecipes] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const clearRecipeDetails = () => {
    setSelectedRecipeId(null);
    setShowDetails(false);
  };

  const handleRecipeAdded = () => {
    setRefreshRecipes((prev) => !prev);
  };

  return (
    <div className="recipe-container-bg">
      <h1>Recipe Management</h1>
      <AddRecipeForm onRecipeAdded={handleRecipeAdded} />

      <div className="recipe-container-row">
        <RecipeList
          onSelectRecipe={setSelectedRecipeId}
          selectedRecipeId={selectedRecipeId}
          onClearRecipeDetails={clearRecipeDetails}
          refresh={refreshRecipes}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
        {showDetails && selectedRecipeId && (
          <RecipeDetails recipeId={selectedRecipeId} handleCloseDetails={() => setShowDetails(false)} />
        )}
      </div>
    </div>
  );
};

export default App;