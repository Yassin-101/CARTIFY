// controllers/selectControllers.js
const SelectedCollection = require("../models/select");

// upload selected collection (4 images + names + subCategories)
const uploadSelectedCollection = async (req, res) => {
  const { category, names, subCategories } = req.body;
  if (!category) return res.status(400).send("Category is required");

  try {
    const images = req.files.map((file) => `/uploads/${file.filename}`);
    const parsedNames = JSON.parse(names || "[]"); // ["Top", "Shirt", ...]
    const parsedSub = JSON.parse(subCategories || "[]"); // ["top","jacket",...]

    if (images.length !== 4 || parsedNames.length !== 4 || parsedSub.length !== 4) {
      return res.status(400).send("Exactly 4 images, names and subCategories are required");
    }

    const items = images.map((img, i) => ({
      image: img,
      name: parsedNames[i],
      subCategory: parsedSub[i]
    }));

    const collection = await SelectedCollection.findOneAndUpdate(
      { category },
      { items },
      { upsert: true, new: true }
    );

    res.json({ success: true, collection });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const getSelectCategory = async (req, res) => {
  try {
    const collection = await SelectedCollection.findOne({ category: req.params.category });
    res.json(collection || { category: req.params.category, items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const getAllSelectCategory = async (req, res) => {
  try {
    const collection = await SelectedCollection.find({});
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { uploadSelectedCollection, getSelectCategory, getAllSelectCategory };
