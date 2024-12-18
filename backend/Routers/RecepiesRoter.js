const express = require("express");
const Recepies = require("../Models/Recepies"); // Ensure this is the correct model file

const router = express.Router();

// Save a new recipe
router.post("/recepies/save", async (req, res) => {
  try {
    const newRecipe = new Recepies(req.body); // Create a new recipe object from the request body

    await newRecipe.save(); // Save the recipe to the database

    res.status(201).json({
      message: "Recipe saved successfully",
      success: true,
      recipe: newRecipe,
    });
  } catch (err) {
    console.error("Error saving recipe:", err);

    res.status(500).json({
      message: "Error saving recipe",
      success: false,
      error: err.message, // Provide specific error details
    });
  }
});

// Get all recipes
router.get("/recepies", async (req, res) => {
  try {
    const recipes = await Recepies.find(); // Retrieve all recipes

    res.status(200).json({
      message: "Recipes fetched successfully",
      success: true,
      recipes,
    });
  } catch (err) {
    console.error("Error fetching recipes:", err);

    res.status(500).json({
      message: "Error fetching recipes",
      success: false,
      error: err.message, // Provide specific error details
    });
  }
});

// Update a recipe by ID
router.put("/recepies/update/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recepies.findByIdAndUpdate(
      req.params.id, // Recipe ID from the request URL
      { $set: req.body }, // Update with new data
      { new: true } // Return the updated document
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      success: true,
      recipe: updatedRecipe,
    });
  } catch (err) {
    console.error("Error updating recipe:", err);

    res.status(500).json({
      message: "Error updating recipe",
      success: false,
      error: err.message,
    });
  }
});

// Delete a recipe by ID
router.delete("/recepies/delete/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recepies.findByIdAndDelete(req.params.id); // Delete the recipe by ID

    if (!deletedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
      success: true,
      recipe: deletedRecipe,
    });
  } catch (err) {
    console.error("Error deleting recipe:", err);

    res.status(500).json({
      message: "Error deleting recipe",
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
