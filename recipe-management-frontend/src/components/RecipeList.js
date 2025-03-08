import React, { useEffect, useState } from "react";
import { fetchRecipes, deleteRecipe, updateRecipeOrder } from "../services/api";
import { FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/RecipeList.css";

const RecipeList = ({ onSelectRecipe, selectedRecipeId, refresh, onClearRecipeDetails, showDetails, setShowDetails }) => {
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
    setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
  };

  const handleRecipeClick = (recipeId) => {
    onSelectRecipe(recipeId);
    setShowDetails(true);
  };

  const handleOnDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside the list

    if (source.index === destination.index) return; // No change in position

    // Reorder recipes and update the backend
    const reorderedRecipes = Array.from(filteredRecipes);
    const [removed] = reorderedRecipes.splice(source.index, 1);
    reorderedRecipes.splice(destination.index, 0, removed);

    setFilteredRecipes(reorderedRecipes);

    // Update the order in the backend (API)
    const orderedRecipes = reorderedRecipes.map((recipe, index) => ({
      ...recipe,
      order: index,
    }));

    await updateRecipeOrder({ orderedRecipes });
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

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="recipe-list">
          {(provided) => (
            <div
              className="recipe-list"
              ref={provided.innerRef} // Properly assign the ref from react-beautiful-dnd
              {...provided.droppableProps} // Necessary props for droppable
            >
              {filteredRecipes.map((recipe, index) => (
                <Draggable key={recipe._id} draggableId={recipe._id} index={index}>
                  {(provided) => (
                    <div
                      className={`recipe-item ${selectedRecipeId === recipe._id ? "selected" : ""}`}
                      ref={provided.innerRef} // Properly assign the ref from react-beautiful-dnd
                      {...provided.draggableProps} // Necessary props for draggable
                      {...provided.dragHandleProps} // Necessary props for dragging handle
                      onClick={() => handleRecipeClick(recipe._id)}
                    >
                      <span className="recipe-title">{recipe.title}</span>
                      <FaTrash className="delete-icon" onClick={(e) => { e.stopPropagation(); handleDelete(recipe._id); }} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default RecipeList;
