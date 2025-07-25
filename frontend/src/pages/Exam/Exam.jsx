import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Exam.css';

function Exam() {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Placeholder Question 1', answered: false, answer: '' },
    { id: 2, text: 'Placeholder Question 2', answered: false, answer: '' },
    { id: 3, text: 'Placeholder Question 3', answered: false, answer: '' },
  ]);

  const handleAnswerChange = (id, answer) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, answered: true, answer } : q
    ));
  };

  const handleSubmit = () => {
    // Placeholder for backend submission
    const results = questions.map(q => ({ id: q.id, answer: q.answer }));
    console.log('Submitting answers:', results);
    // Replace console.log with actual API call to backend
    // e.g., fetch('/api/submit', { method: 'POST', body: JSON.stringify(results) })
    // Then navigate to /scoring
    window.location.href = '/scoring';
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">History Quiz</h1>
      <div className="exam-content">
        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <p className="question-text">{q.text}</p>
            <div className="answer-options">
              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value="London"
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                /> London
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value="Liverpool"
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                /> Liverpool
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value="Edinburgh"
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                /> Edinburgh
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value="Canary Wharf"
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                /> Canary Wharf
              </label>
            </div>
            <p className="answer-status">{q.answered ? 'Answered' : 'Unanswered'}</p>
          </div>
        ))}
        <button className="next-button" onClick={handleSubmit} disabled={questions.some(q => !q.answered)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Exam;