  const Recipe = require("../models/Recipe");

  // ✅ Update recipe order
  const updateRecipeOrder = async (req, res) => {
    const { orderedRecipes } = req.body;

    try {
      for (let i = 0; i < orderedRecipes.length; i++) {
        await Recipe.findByIdAndUpdate(orderedRecipes[i]._id, { order: i });
      }
      res.json({ message: "Recipe order updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating recipe order", error: error.message });
    }
  };

  // ✅ Get all recipes
  const getRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // ✅ Get recipe by ID
  const getRecipeById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ message: "Recipe not found" });
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // ✅ Add a new recipe
  const addRecipe = async (req, res) => {
    try {
      const { title, ingredients, instructions, category } = req.body;

      if (!title || !ingredients || !instructions || !category) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newRecipe = new Recipe({ title, ingredients, instructions, category });
      await newRecipe.save();
      
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // ✅ Update a recipe
  const updateRecipe = async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
      res.json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // ✅ Delete a recipe
  const deleteRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!recipe) return res.status(404).json({ message: "Recipe not found" });
      res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // ✅ Get a random recipe
  const getRandomRecipe = async (req, res) => {
    try {
      const count = await Recipe.countDocuments();
      const randomRecipe = await Recipe.findOne().skip(Math.floor(Math.random() * count));
      res.json(randomRecipe);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // ✅ Export all functions
  module.exports = { 
    updateRecipeOrder,
    getRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRandomRecipe
  };
