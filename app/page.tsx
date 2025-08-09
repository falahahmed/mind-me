'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { changeFavicon, createFavicon, useTabTitle } from './utils/tabswitch';
import data from '@/app/utils/data/convo.json'; // Assuming convo.json is in the same directory

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

  const baseEmoji = createFavicon('😎');
  changeFavicon(baseEmoji);

  const zeroConcernTabs: string[] = ["Do you even care?", "No care at all?"];
  const tabTitle = Math.random() < 0.5 ? zeroConcernTabs[0] : zeroConcernTabs[1];
  useTabTitle(tabTitle, "😒");

  const [currentId, setCurrentId] = useState("start");

  console.log("Data fetched:", data);

  const currentNode = data?.nodes.find((node: any) => node.id === currentId);

  console.log("Current node: ", currentNode);

  const goNext = (next: string | string[]) => {
    if(Array.isArray(next)){
      const randomIndex = Math.floor(Math.random() * next.length);
      setCurrentId(next[randomIndex]);
    } else {
      setCurrentId(next);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
        </div>

        {/* Question Card */}
        {currentNode?.type == 'question' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
              {currentNode.content}
            </h2>

            <div className="space-y-4 mb-8">
              {currentNode.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => goNext(option.next)}
                  className={`w-full p-4 rounded-2xl border-2 hover:text-blue-800 transition-all duration-300 text-center font-medium `}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-lg w-full font-semibold">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

        {currentNode?.type == 'message' && (
          <>
            <div className='text-3xl text-center'>
              <p className='my-4 pb-6'>{currentNode.content}</p>
              <div className='border-white border-2 p-2 rounded-xl w-[50%] mx-auto hover:text-blue-800 hover:border-blue-800'>
                <button className='text-2xl' onClick={() => goNext("start")} >Let me try again</button>
              </div>
            </div>
          </>
        )}

        {/* Quiz Info */}
        <div className="text-center text-blue-200">
        </div>
      </div>
    </div>
  );
}