const express = require('express');
const router = express.Router();
const Form = require('../models/form'); // Replace with the correct model path

// Save a categorized question
router.post('/questions', async (req, res) => {
  try {
    const { type, data } = req.body;
    const form = new Form({ title: 'Categorized Form', questions: [{ type, data }] });
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(500).json({ error: 'Error saving the question' });
  }
});

module.exports = router;



