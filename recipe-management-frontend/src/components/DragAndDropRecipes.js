import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateRecipeOrder } from '../services/api'; // Import the API function to update the recipe order

const DragAndDropRecipes = ({ recipes, setRecipes }) => {
  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    // If dropped outside the list or no change in position, do nothing
    if (!destination || destination.index === source.index) return;

    // Reorder the recipes array
    const reorderedRecipes = Array.from(recipes);
    const [movedRecipe] = reorderedRecipes.splice(source.index, 1); // Remove the dragged item
    reorderedRecipes.splice(destination.index, 0, movedRecipe); // Insert it at the new position

    // Update the state to reflect the new order
    setRecipes(reorderedRecipes);

    // Prepare the ordered recipes for the backend
    const orderedRecipes = reorderedRecipes.map((recipe, index) => ({
      ...recipe,
      order: index, // Assign the new order
    }));

    try {
      // Send the new order to the backend
      await updateRecipeOrder({ orderedRecipes });
    } catch (error) {
      console.error("Error updating recipe order:", error);
      // Revert the state if the API call fails
      setRecipes(recipes);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="recipe-list">
        {(provided) => (
          <div
            className="recipe-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {recipes.map((recipe, index) => (
              <Draggable key={recipe._id} draggableId={recipe._id} index={index}>
                {(provided) => (
                  <div
                    className="recipe-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      padding: '10px',
                      border: '1px solid #ddd',
                      marginBottom: '10px',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      cursor: 'move',
                    }}
                  >
                    <span>{recipe.title}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropRecipes;