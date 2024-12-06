import React, { useState } from 'react';
import CategorizedForm from '../components/CategorizedForm';
import ClozeForm from '../components/ClozeForm';
import ComprehensionForm from '../components/ComprehensionForm';
import FormRenderer from '../components/FormRenderer';

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="container mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Form Builder</h1>
      </div>
      <CategorizedForm addQuestion={addQuestion} />
      <ClozeForm addQuestion={addQuestion} />
      <ComprehensionForm addQuestion={addQuestion} />
      <FormRenderer questions={questions} />
    </div>
  );
};

export default FormBuilder;
