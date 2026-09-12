"use client";

import React, { useState, useEffect, useRef } from 'react';
import { BLITZ_QUESTIONS } from '@/data/blitzQuestions';
import { Timer, Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'knowledge') => void;
}

export const LandformBlitz: React.FC<Props> = ({ onComplete, onAwardPoints }) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [answeredFeedback, setAnsweredFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Shuffle questions once on start
  const [questions, setQuestions] = useState(BLITZ_QUESTIONS);

  const startBlitz = () => {
    soundEngine.playClick();
    // Shuffle
    const shuffled = [...BLITZ_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setQuestionIdx(0);
    setTimeLeft(45);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setIsStarted(true);
    setIsFinished(false);
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

    // Auto proceed to next question after brief 0.5s pause
    setTimeout(() => {
      setAnsweredFeedback(null);
      setQuestionIdx(prev => prev + 1);
    }, 550);
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-slate-950 text-white flex flex-col items-center justify-center select-none">
      <div className="max-w-2xl w-full mx-auto">
        {/* Not Started State */}
        {!isStarted && !isFinished && (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-cyan-500/40 text-center shadow-2xl space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white text-4xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/40 animate-pulse">
              ⚡
            </div>

            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">Bonus Round</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">LANDFORM BLITZ</h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-md mx-auto">
                45 seconds on the clock! Rapid-fire geography questions. Build a streak to multiply your Life Points!
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-cyan-400" />
                <span>45s Timer</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>+50 LP per correct answer</span>
              </div>
            </div>

            <button
              onClick={startBlitz}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-lg shadow-xl shadow-cyan-500/30 transition transform hover:scale-105 active:scale-95"
            >
              START THE CLOCK ➔
            </button>
          </div>
        )}

        {/* Active Blitz Play State */}
        {isStarted && !isFinished && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/15 shadow-2xl space-y-6">
            {/* Top Bar: Timer, Score, Streak */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              {/* Timer Gauge */}
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl flex items-center justify-center ${
                  timeLeft <= 10 ? 'bg-red-500 text-white animate-ping' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">Time Left</span>
                  <span className={`text-2xl font-black font-mono leading-none ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </span>
                </div>
              </div>

              {/* Streak Multiplier */}
              {streak > 1 && (
                <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs flex items-center gap-1.5 animate-bounce">
                  <Zap className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{streak}x STREAK MULTIPLIER!</span>
                </div>
              )}

              {/* Score Counter */}
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">Blitz LP</span>
                <span className="text-2xl font-black text-amber-400 font-mono leading-none">
                  +{score}
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide block mb-2">
                Question {questionIdx + 1}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                {currentQ.prompt}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-cyan-600 hover:text-white border border-white/10 text-left text-sm font-semibold transition active:scale-95 shadow-md flex items-center justify-between"
                >
                  <span>{opt}</span>
                  <span className="text-xs text-slate-400 opacity-60">➔</span>
                </button>
              ))}
            </div>

            {/* Feedback Alert */}
            {answeredFeedback && (
              <div className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 ${
                answeredFeedback.isCorrect
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-red-950 border-red-500 text-red-300'
              }`}>
                <span>{answeredFeedback.text}</span>
              </div>
            )}
          </div>
        )}

        {/* Finished State */}
        {isFinished && (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center shadow-2xl space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-4xl flex items-center justify-center mx-auto shadow-lg">
              ⏱️
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">Time Expired</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">BLITZ COMPLETE!</h2>
              <p className="text-slate-300 text-sm mt-1">
                Outstanding rapid recall! You answered <strong className="text-emerald-400">{correctCount}</strong> questions correctly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 inline-block">
              <span className="text-xs text-slate-400 uppercase font-bold block">Points Earned</span>
              <span className="text-3xl font-black text-amber-400">+{score} LIFE POINTS</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={startBlitz}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
              >
                Play Again
              </button>
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-sm shadow-lg transition transform hover:scale-105"
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
