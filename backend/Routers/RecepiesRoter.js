const express = require("express");
const multer = require("multer");
const path = require("path");
const Recepies = require("../Models/Recepies");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");

// Save a new recipe with image
router.post("/recepies/save", upload, async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const newRecipe = new Recepies({
      title,
      category,
      content,
      image: imagePath,
    });

    await newRecipe.save();

    res.status(201).json({
      message: "Recipe saved successfully",
      success: true,
      recipe: newRecipe,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving recipe", success: false, error: err.message });
  }
});

// Get all recipes
router.get("/recepies", async (req, res) => {
  try {
    const recipes = await Recepies.find();
    res.status(200).json({ message: "Recipes fetched successfully", success: true, recipes });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes", success: false, error: err.message });
  }
});

// Update a recipe by ID
router.put("/recepies/update/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recepies.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found", success: false });
    }

    res.status(200).json({ message: "Recipe updated successfully", success: true, recipe: updatedRecipe });
  } catch (err) {
    res.status(500).json({ message: "Error updating recipe", success: false, error: err.message });
  }
});

// Delete a recipe by ID
router.delete("/recepies/delete/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recepies.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found", success: false });
    }

    res.status(200).json({ message: "Recipe deleted successfully", success: true, recipe: deletedRecipe });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe", success: false, error: err.message });
  }
});

module.exports = router;
