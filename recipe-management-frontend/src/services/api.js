import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes";

// Get all recipes
export const fetchRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a single recipe by ID
export const fetchRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new recipe
export const addRecipe = async (recipeData) => {
  const response = await axios.post(API_URL, recipeData);
  return response.data;
};

// Update a recipe
export const updateRecipe = async (id, recipeData) => {
  const response = await axios.put(`${API_URL}/${id}`, recipeData);
  return response.data;
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Get a random recipe
export const fetchRandomRecipe = async () => {
  const response = await axios.get(`${API_URL}/random`);
  return response.data;
};

// Update recipe order
export const updateRecipeOrder = async (orderedRecipes) => {
  try {
    const response = await axios.put(`${API_URL}/update-order`, { orderedRecipes });
    return response.data;
  } catch (error) {
    console.error("Error updating recipe order:", error);
    throw error;
  }
};