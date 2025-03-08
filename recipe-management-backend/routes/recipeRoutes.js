const express = require("express");
const router = express.Router();

const { 
  getRecipes, 
  getRecipeById, 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,   
  getRandomRecipe,
  updateRecipeOrder
} = require("../controllers/recipeController");

router.get("/random", getRandomRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.get("/random", getRandomRecipe);
router.put("/order", updateRecipeOrder);

module.exports = router;
