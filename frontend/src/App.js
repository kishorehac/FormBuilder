import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder';
import FormRenderer from './components/FormRenderer';
import CategorizedForm from './components/CategorizedForm'; // Import CategorizedForm
import ClozeForm from './components/ClozeForm'; // Import ClozeForm
import ComprehensionForm from './components/ComprehensionForm'; // Import ComprehensionForm

const App = () => {
  // State to store the form data (questions)
  const [formData, setFormData] = useState([]);

  // Function to add a new question to the formData
  const addQuestion = (newQuestion) => {
    setFormData([...formData, newQuestion]);
  };

  // Sample questions for all three sections (Categorized, Cloze, and Comprehension)
  const questions = [
    {
      type: 'categorized',
      data: {
        categories: ['Fruits', 'Vegetables'],
        options: ['Apple', 'Carrot', 'Banana', 'Potato'],
      },
    },
    {
      type: 'cloze',
      data: {
        text: 'A quick brown fox jumps over the lazy dog.',
        blanks: ['fox', 'dog'],
      },
    },
    {
      type: 'comprehension',
      data: {
        text: 'Read the passage and answer the questions.',
        mcqs: [
          {
            question: 'What is the main theme?',
            options: ['Nature', 'Adventure', 'Science'],
          },
          {
            question: 'What is the color of the fox?',
            options: ['Brown', 'White', 'Black'],
          },
        ],
      },
    },
  ];

  return (
    <Router>
      <Routes>
        {/* Route to the FormBuilder */}
        <Route path="/" element={<FormBuilder />} />

        {/* Route to the FormRenderer with questions */}
        <Route path="/renderer" element={<FormRenderer questions={questions} />} />
        {/* Route to the CategorizedForm with addQuestion and formData as props */}
        <Route
          path="/create/categorized"
          element={<CategorizedForm addQuestion={addQuestion} formData={formData} />}
        />

        {/* Route to the ClozeForm with addQuestion and formData as props */}
        <Route
          path="/create/cloze"
          element={<ClozeForm addQuestion={addQuestion} formData={formData} />}
        />

        {/* Route to the ComprehensionForm with addQuestion and formData as props */}
        <Route
          path="/create/comprehension"
          element={<ComprehensionForm addQuestion={addQuestion} formData={formData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
