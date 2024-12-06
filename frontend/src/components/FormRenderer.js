import React, { useState } from 'react';

const FormRenderer = ({ questions: initialQuestions }) => {
  const [questions, setQuestions] = useState(initialQuestions);

  // Delete question handler
  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Rendered Form</h2>
      {questions.map((question, index) => (
        <div key={index} className="border p-4 rounded-md shadow-md mb-4 bg-white">
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-500 text-white px-4 py-1 rounded-md float-right"
          >
            Delete
          </button>
          {question.type === 'categorized' && (
            <div>
              <h3 className="font-bold">Categorized Question</h3>
              <p><strong>Categories:</strong> {question.data.categories.join(', ')}</p>
              <p><strong>Options:</strong></p>
              <ul className="list-disc list-inside">
                {question.data.options.map((option, optIndex) => (
                  <li key={optIndex}>{option}</li>
                ))}
              </ul>
            </div>
          )}
          {question.type === 'cloze' && (
            <div>
              <h3 className="font-bold">Cloze Question</h3>
              <p><strong>Text:</strong> {question.data.text}</p>
              <p><strong>Blanks:</strong></p>
              <ul className="list-disc list-inside">
                {question.data.blanks.map((blank, blankIndex) => (
                  <li key={blankIndex}>{blank}</li>
                ))}
              </ul>
            </div>
          )}
          {question.type === 'comprehension' && (
            <div>
              <h3 className="font-bold">Comprehension Question</h3>
              <p><strong>Passage:</strong> {question.data.text}</p>
              <p><strong>Questions and Answers:</strong></p>
              <ul className="list-disc list-inside">
                {question.data.mcqs.map((mcq, mcqIndex) => (
                  <li key={mcqIndex}>
                    <p><strong>Q{mcqIndex + 1}:</strong> {mcq.question}</p>
                    <p><strong>Options:</strong> {mcq.options.join(', ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      {questions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No questions available.</p>
      )}
    </div>
  );
};

export default FormRenderer;
