import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Exam.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Exam() {
  const [searchParams] = useSearchParams();
  const language = searchParams.get('language');
  const difficulty = searchParams.get('difficulty');
  
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Placeholder Question 1', choices: [], answered: false, answer: '' },
    { id: 2, text: 'Placeholder Question 2', choices: [], answered: false, answer: '' },
    { id: 3, text: 'Placeholder Question 3', choices: [], answered: false, answer: '' },
  ]);


  // Map of difficulty codes to display strings
  const difficultyMap = {
    mudah: 'easy',
    sedang: 'medium',
    sulit: 'hard',
  };

  const languageMap = {
    jawa: 'Javanese',
    sunda: 'Sundanese',
    bali: 'Balinese',
    madura: 'Madura',
    // makasar: 'Makasar',
  };
  const mappedLanguage = languageMap[language] ;
  const mappedDifficulty = difficultyMap[difficulty] || difficulty;
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BE_API;
        const res = await axios.get(`${apiUrl}/quiz/testQuestion/${mappedLanguage}/${mappedDifficulty}`);
        const data = res.data;
        setQuestions(
          data.map((q, _) => ({
            id: q.id ,
            text: q.question,
            choices: q.choices,
            answered: false,
            answer: '',
          }))
        );
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      }
    };

    if (language && difficulty) {
      fetchQuestions();
    }
    console.log(questions);
  }, [language, difficulty]);

  const handleAnswerChange = (id, answer) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, answered: true, answer } : q
    ));
  };

  const handleSubmit = async () => {
    // Placeholder for backend submission
    const answers = questions.map(q => ({ questionId: q.id, answer: q.answer }));
    console.log('Submitting answers:', answers);

    const apiUrl = import.meta.env.VITE_BE_API;
    const res = await axios.post(`${apiUrl}/quiz/checkTestQuestionAnswer`, { answers });

    navigate('/scoring', { state: { result: res.data } });
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">History Quiz</h1>
      <div className="exam-content">
        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <p className="question-text">{q.text}</p>
            <div className="answer-options">
              {q.choices.map((choice, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={choice}
                    checked={q.answer === choice}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  /> {choice}
                </label>
              ))}
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