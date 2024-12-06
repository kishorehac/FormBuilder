const mongoose = require("mongoose");

// Define the Question Schema
const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "categorized", "cloze", "comprehension"
  data: { type: Object, required: true }, // Detailed data for the question type
});

// Define the Form Schema
const FormSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the form
  questions: [QuestionSchema], // Array of questions
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Export the Form Model
module.exports = mongoose.model("Form", FormSchema);

