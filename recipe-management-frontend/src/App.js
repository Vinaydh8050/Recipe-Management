import React, { useState } from "react";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

const App = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleRecipeAdded = () => {
    setRefresh((prev) => !prev);
  };

  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRecipeId(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Recipe Manager</h1>
      <div className="content">
        <div className="left-panel">
          <AddRecipeForm onRecipeAdded={handleRecipeAdded} />

          <div className="recipe-container">
            {/* Recipe List */}
            <div className="recipe-list-wrapper">
              <RecipeList
                onSelectRecipe={handleSelectRecipe}
                selectedRecipeId={selectedRecipeId}
                refresh={refresh}
                setShowDetails={setShowDetails}
              />
            </div>

            {/* Recipe Details - Render Only When a Recipe is Selected */}
            {showDetails && (
              <div className="show-details">
                <RecipeDetails recipeId={selectedRecipeId} handleCloseDetails={handleCloseDetails} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
