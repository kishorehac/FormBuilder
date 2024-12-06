import React, { useState, useEffect } from 'react';

const CategorizedForm = ({ addQuestion, formData }) => {
  const [questionText, setQuestionText] = useState('');
  const [categories, setCategories] = useState([{ name: '', items: [] }]);
  const [options, setOptions] = useState(['']);
  const [newOption, setNewOption] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // If formData contains a categorized question, set its data to the form
    if (formData && formData.length > 0) {
      const categorizedQuestion = formData.find((question) => question.type === 'categorized');
      if (categorizedQuestion) {
        const { categories, options } = categorizedQuestion.data;
        setCategories(categories.map((category) => ({ name: category, items: [] })));
        setOptions(options);
      }
    }
  }, [formData]);

  // Handle text formatting (Bold/Italic)
  const handleStyle = (style) => {
    document.execCommand(style, false, null);
  };

  const handleQuestionChange = (e) => {
    setQuestionText(e.currentTarget.innerHTML); // Store the formatted HTML content
  };

  // Add new category
  const addCategory = () => {
    setCategories([...categories, { name: newCategory, items: [] }]);
    setNewCategory('');
  };

  // Remove category
  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  // Add new option
  const addOption = () => {
    setOptions([...options, newOption]);
    setNewOption('');
  };

  // Remove option
  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // Save the question
  const handleSave = () => {
    const question = {
      type: 'categorized',
      data: {
        questionText,
        categories,
        options,
      },
    };
    addQuestion(question);
  };

  return (
    <div className="p-4 border rounded shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Categorized Question</h2>

      {/* Question Text Editor */}
      <div>
        <h3 className="font-semibold mb-2">Question Text</h3>
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => handleStyle('bold')}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Bold
          </button>
          <button
            onClick={() => handleStyle('italic')}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Italic
          </button>
        </div>
        <div
          contentEditable
          onInput={handleQuestionChange}
          className="border rounded p-2"
          style={{
            minHeight: '50px',
            outline: 'none',
          }}
        ></div>
      </div>

      {/* Categories */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={category.name}
              onChange={(e) => {
                const updatedCategories = [...categories];
                updatedCategories[index].name = e.target.value;
                setCategories(updatedCategories);
              }}
              className="border rounded p-2 flex-grow"
              placeholder="Category Name"
            />
            <button
              onClick={() => removeCategory(index)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
            className="border rounded p-2 flex-grow"
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Options</h3>
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...options];
                updatedOptions[index] = e.target.value;
                setOptions(updatedOptions);
              }}
              className="border rounded p-2 flex-grow"
              placeholder="Option"
            />
            <button
              onClick={() => removeOption(index)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="New Option"
            className="border rounded p-2 flex-grow"
          />
          <button
            onClick={addOption}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
      >
        Save Question
      </button>
    </div>
  );
};

export default CategorizedForm;





