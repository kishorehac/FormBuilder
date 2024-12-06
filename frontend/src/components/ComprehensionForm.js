import React, { useState } from "react";
import { saveFormData } from "../services/api"; // Import the correct named export

const ComprehensionForm = () => {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([
    { id: Date.now(), questionText: "", correctAnswer: "" },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), questionText: "", correctAnswer: "" },
    ]);
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { passage, questions };

    try {
      const response = await saveFormData("/comprehension", data); // Call saveFormData
      console.log("Saved successfully:", response.data);
      alert("Comprehension question saved successfully!");
    } catch (error) {
      console.error("Error saving comprehension question:", error);
      alert("Failed to save comprehension question.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Comprehension Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Passage:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="6"
            placeholder="Enter the passage here..."
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Questions:</h3>
          {questions.map((q, index) => (
            <div key={q.id} className="mb-4">
              <label className="block mb-2">
                Question {index + 1}:
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter the question text..."
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "questionText", e.target.value)
                  }
                />
              </label>
              <label className="block mb-2">
                Correct Answer:
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter the correct answer..."
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "correctAnswer", e.target.value)
                  }
                />
              </label>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
                onClick={() => removeQuestion(q.id)}
              >
                Remove Question
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
        >
          Save Comprehension
        </button>
      </form>
    </div>
  );
};

export default ComprehensionForm;
