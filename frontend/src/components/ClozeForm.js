import React, { useState } from "react";
import { saveFormData } from "../services/api"; // Correctly import the named export

const ClozeForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [blanks, setBlanks] = useState([]);

  const handleTextSelection = () => {
  const textarea = document.getElementById("questionTextarea");
  const start = textarea.selectionStart; // Start index of selected text
  const end = textarea.selectionEnd;    // End index of selected text

  if (start === end) {
    alert("Please select some text to make it a blank.");
    return;
  }

  const selectedText = questionText.substring(start, end);
  setBlanks([...blanks, { text: selectedText, startIndex: start, endIndex: end }]);
  alert(`Blank added: "${selectedText}"`);
};


  const handleSaveQuestion = async () => {
    if (!questionText.trim()) {
      alert("Question text cannot be empty.");
      return;
    }

    if (blanks.length === 0) {
      alert("Please add at least one blank.");
      return;
    }

    const questionData = {
      questionText,
      blanks,
    };

    try {
      await saveFormData(questionData); // Use the correct function to save the data
      alert("Question saved successfully!");
      setQuestionText("");
      setBlanks([]);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save the question.");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cloze Question Builder</h2>
      <textarea
        id="questionTextarea"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows="5"
        placeholder="Type your question here..."
      ></textarea>

      <button
        onClick={handleTextSelection}
        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Underline Selected Text
      </button>
      <button
        onClick={handleSaveQuestion}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save Question
      </button>

      <div className="mt-4">
  <h3 className="text-lg font-bold">Blanks:</h3>
  {blanks.length === 0 ? (
    <p>No blanks added yet.</p>
  ) : (
    <ul className="list-disc pl-6">
      {blanks.map((blank, index) => (
        <li key={index}>
          <strong>{blank.text}</strong> (Start: {blank.startIndex}, End: {blank.endIndex})
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default ClozeForm;

