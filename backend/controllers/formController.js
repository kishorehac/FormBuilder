const Form = require("../models/form");

// Create a new form
exports.createForm = async (req, res) => {
  const { title, questions } = req.body;

  try {
    const newForm = new Form({
      title,
      questions, // Questions should follow the schema structure
    });
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the form.", details: error.message });
  }
};

// Fetch all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch forms.", details: error.message });
  }
};

// Fetch a single form by ID
exports.getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found." });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the form.", details: error.message });
  }
};

// Update a form
exports.updateForm = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  try {
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, questions },
      { new: true } // Return the updated document
    );
    if (!updatedForm) {
      return res.status(404).json({ error: "Form not found." });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the form.", details: error.message });
  }
};

// Delete a form
exports.deleteForm = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ error: "Form not found." });
    }
    res.status(200).json({ message: "Form deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the form.", details: error.message });
  }
};
