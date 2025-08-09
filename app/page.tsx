'use client';

import React, { useState } from 'react';
import { CheckCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which programming language was created by Brendan Eich?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "In what year did the Titanic sink?",
    options: ["1910", "1911", "1912", "1913"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Aluminum", "Argon"],
    correctAnswer: 1
  }
];

export default function Home() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = selectedOption;
    setSelectedAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="mb-8">

              {/*Heading  */}
              <h1 className="text-4xl font-bold text-white mb-4"></h1>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((question, index) => (
                <div key={question.id} className="bg-white/5 rounded-xl p-4 text-left">
                  <p className="text-white font-medium mb-2">{question.question}</p>
                  <div className="flex items-center space-x-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                    )}
                    <span className={`${selectedAnswers[index] === question.correctAnswer
                      ? 'text-green-400'
                      : 'text-red-400'
                      }`}>
                      Your answer: {question.options[selectedAnswers[index]]}
                    </span>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <span className="text-green-400 ml-4">
                        Correct: {question.options[question.correctAnswer]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-black via-white/5 to-black text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <span>I've got something else to say</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left font-medium ${selectedOption === index
                    ? 'border-blue-400 bg-blue-400/20 text-white transform scale-[1.02]'
                    : 'border-white/30 bg-white/5 text-blue-100 hover:border-blue-300 hover:bg-white/10 hover:transform hover:scale-[1.01]'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === index
                      ? 'border-blue-400 bg-blue-400'
                      : 'border-white/40'
                    }`}>
                    {selectedOption === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-2 transition-all duration-200 ${selectedOption !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
            >
              <span>{currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="text-center text-blue-200">
        </div>
      </div>
    </div>
  );
}
