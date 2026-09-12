"use client";

import React, { useState, useEffect } from 'react';
import { BLITZ_QUESTIONS } from '@/data/blitzQuestions';
import { Timer, Zap, Trophy, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'knowledge') => void;
}

export const LandformBlitz: React.FC<Props> = ({ onComplete, onAwardPoints }) => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredFeedback, setAnsweredFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Shuffle questions randomly when entering blitz
  const [questions, setQuestions] = useState(() => {
    return [...BLITZ_QUESTIONS].sort(() => Math.random() - 0.5);
  });

  const startBlitz = () => {
    soundEngine.playClick();
    setIsStarted(true);
    setIsFinished(false);
    setTimeLeft(45);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setQuestionIdx(0);
    setAnsweredFeedback(null);
  };

  useEffect(() => {
    if (!isStarted || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          soundEngine.playVictoryFanfare();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isFinished]);

  const currentQ = questions[questionIdx % questions.length];

  const handleSelectOption = (idx: number) => {
    if (isFinished) return;
    soundEngine.playClick();

    const isCorrect = idx === currentQ.correctIdx;

    if (isCorrect) {
      soundEngine.playCorrect();
      const points = 50 + streak * 10;
      onAwardPoints(points, 'knowledge');
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      setAnsweredFeedback({
        isCorrect: true,
        text: `+${points} LP! ${currentQ.explanation}`
      });
    } else {
      soundEngine.playWrong();
      setStreak(0);
      setAnsweredFeedback({
        isCorrect: false,
        text: `Incorrect. ${currentQ.explanation}`
      });
    }

    setTimeout(() => {
      setAnsweredFeedback(null);
      setQuestionIdx(prev => prev + 1);
    }, 550);
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-transparent text-slate-900 flex flex-col items-center justify-center select-none">
      <div className="max-w-2xl w-full mx-auto">
        {/* Not Started State */}
        {!isStarted && !isFinished && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-3 border-slate-900 text-center shadow-[6px_6px_0px_0px_#0f172a] space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-cyan-400 border-2.5 border-slate-900 text-slate-950 text-4xl flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#0f172a] animate-pulse">
              ⚡
            </div>

            <div>
              <span className="text-xs font-black text-cyan-700 uppercase tracking-widest block mb-1">Bonus Round</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950">LANDFORM BLITZ</h2>
              <p className="text-slate-800 text-sm sm:text-base font-bold mt-2 max-w-md mx-auto">
                45 seconds on the clock! Rapid-fire geography questions. Build a streak to multiply your Life Points!
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm font-black text-slate-900">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-cyan-600" />
                <span>45s Timer</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>+50 LP per correct answer</span>
              </div>
            </div>

            <button
              onClick={startBlitz}
              className="px-10 py-4 rounded-2xl bg-yellow-300 hover:bg-yellow-400 border-3 border-slate-900 text-slate-950 font-black text-lg shadow-[4px_4px_0px_0px_#0f172a] transition transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              START THE CLOCK ➔
            </button>
          </div>
        )}

        {/* Active Blitz Play State */}
        {isStarted && !isFinished && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] space-y-6">
            {/* Top Bar: Timer, Score, Streak */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
              {/* Timer Gauge */}
              <div className="flex items-center gap-2">
                <div className={`p-2.5 rounded-2xl border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a] ${
                  timeLeft <= 10 ? 'bg-rose-500 text-white animate-ping' : 'bg-cyan-200 text-cyan-950'
                }`}>
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-600 uppercase font-black block leading-none">Time Left</span>
                  <span className={`text-2xl font-black font-mono leading-none ${timeLeft <= 10 ? 'text-rose-600 animate-pulse' : 'text-slate-950'}`}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </span>
                </div>
              </div>

              {/* Streak Multiplier */}
              {streak > 1 && (
                <div className="px-3 py-1 rounded-full bg-yellow-300 border-2 border-slate-900 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0f172a] animate-bounce">
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{streak}x STREAK!</span>
                </div>
              )}

              {/* Score Counter */}
              <div className="text-right">
                <span className="text-[10px] text-slate-600 uppercase font-black block leading-none">Blitz LP</span>
                <span className="text-2xl font-black text-amber-600 font-mono leading-none">
                  +{score}
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div>
              <span className="text-xs font-black text-blue-900 uppercase tracking-wide block mb-2">
                Question {questionIdx + 1}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-950 leading-snug">
                {currentQ.prompt}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="p-4 rounded-2xl bg-amber-50/80 hover:bg-yellow-100 border-2 border-slate-900 text-left text-sm font-black text-slate-900 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-between cursor-pointer"
                >
                  <span>{opt}</span>
                  <span className="text-xs text-slate-500">➔</span>
                </button>
              ))}
            </div>

            {/* Feedback Alert */}
            {answeredFeedback && (
              <div className={`p-3.5 rounded-2xl border-2 border-slate-900 text-xs sm:text-sm font-black flex items-center gap-2 shadow-[2px_2px_0px_0px_#0f172a] ${
                answeredFeedback.isCorrect
                  ? 'bg-emerald-100 text-emerald-950'
                  : 'bg-rose-100 text-rose-950'
              }`}>
                <span>{answeredFeedback.text}</span>
              </div>
            )}
          </div>
        )}

        {/* Finished State */}
        {isFinished && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-3 border-slate-900 text-center shadow-[6px_6px_0px_0px_#0f172a] space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-300 border-2.5 border-slate-900 text-slate-950 text-4xl flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#0f172a]">
              ⏱️
            </div>

            <div>
              <span className="text-xs font-black text-emerald-700 uppercase tracking-widest block mb-1">Time Expired</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950">BLITZ COMPLETE!</h2>
              <p className="text-slate-800 text-sm font-bold mt-1">
                Outstanding rapid recall! You answered <strong className="text-emerald-700">{correctCount}</strong> questions correctly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-yellow-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] inline-block">
              <span className="text-xs text-slate-700 uppercase font-black block">Points Earned</span>
              <span className="text-3xl font-black text-slate-950">+{score} LIFE POINTS</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={startBlitz}
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-900 text-xs font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
              >
                Play Again
              </button>
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-8 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 border-2.5 border-slate-900 text-slate-950 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] cursor-pointer"
              >
                RETURN TO MAP ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
