'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { changeFavicon, createFavicon, useTabTitle } from './utils/tabswitch';
import data from '@/app/utils/data/convo.json'; // Assuming convo.json is in the same directory
import Image from 'next/image';

export default function Home() {

  useEffect(() => {
    const baseEmoji = createFavicon('😎');
    changeFavicon(baseEmoji);
  }, []);

  const [isBack, setIsBack] = useState(false);
  const [lastQues, setLastQues] = useState<string | null>(null);

  const tabTitles: string[] = ["Do you even care?", "No care at all?"];
  useTabTitle(tabTitles, "😒");

  const [currentId, setCurrentId] = useState("start");

  const currentNode = data?.nodes.find((node: any) => node.id === currentId);

  console.log("Current node: ", currentNode);

  const goNext = (next: string | string[]) => {
    if (Array.isArray(next)) {
      const randomIndex = Math.floor(Math.random() * next.length);
      setCurrentId(next[randomIndex]);
    } else {
      setCurrentId(next);
    }
  };

  if (isBack) {
    return (
      <div className='w-screen h-screen relative'>
        <Image
          src='/circums/back-button.gif'
          alt='Back Button'
          layout='fill'
          objectFit='cover'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold'>You said you care. Now you wanna go back on what you said?</h2>
            <p className='text-xl mt-4'>That <span className='text-red-600'>ain't happening</span> here!</p>
            <button
              onClick={() => {
                setLastQues(lastQues);
                setIsBack(false);
              }}
              className='w-full p-4 rounded-2xl border-2 hover:text-blue-800 transition-all duration-300 text-center font-medium'
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg w-full font-semibold">Let's continue</span>
              </div>
            </button>
            <button
              onClick={() => {
                goNext(lastQues!);
                setIsBack(false);
              }}
              className='w-full p-4 rounded-2xl border-2 hover:text-blue-800 transition-all duration-300 text-center font-medium'
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg w-full font-semibold">I don't care</span>
              </div>
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
              {currentId != "start" && (<button
                onClick={() => {
                  setLastQues(currentNode.id);
                  setIsBack(true);
                }}
                className='w-full p-4 rounded-2xl border-2 hover:text-blue-800 transition-all duration-300 text-center font-medium'
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg w-full font-semibold">Go Back </span>
                </div>
              </button>)}
            </div>

          </div>
        )}

        {currentNode?.type == 'message' && (
          <div className={` bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8`}>
            <div className='text-3xl text-center'>
              <p className='my-4 pb-6'>{currentNode.content}</p>
              <div className='border-white border-2 p-2 rounded-xl w-[50%] mx-auto hover:text-blue-800 hover:border-blue-800'>
                <button className='text-2xl' onClick={() => goNext("start")} >Let me try again</button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Info */}
        <div className="text-center text-blue-200">
        </div>
      </div>
    </div>
  );
}