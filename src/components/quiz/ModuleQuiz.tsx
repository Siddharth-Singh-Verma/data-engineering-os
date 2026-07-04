import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import type { ModuleQuiz as ModuleQuizType } from '@/types';

interface ModuleQuizProps {
  quiz: ModuleQuizType;
  previousScore?: number;
  onComplete: (score: number) => void;
}

export function ModuleQuiz({ quiz, previousScore, onComplete }: ModuleQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [showResult, setShowResult] = useState<string | null>(null); // questionId that's showing result
  const [quizDone, setQuizDone] = useState(false);

  const question = quiz.questions[currentIndex];
  const selectedAnswer = answers[question?.id] ?? null;
  const isAnswered = selectedAnswer !== null;
  const isShowingResult = showResult === question?.id;

  const handleAnswer = useCallback((optionIndex: number) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }));
    setShowResult(question.id);
  }, [isAnswered, question]);

  const handleNext = useCallback(() => {
    setShowResult(null);
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Quiz complete
      const correctCount = quiz.questions.reduce((count, q) => {
        return count + (answers[q.id] === (Array.isArray(q.correct) ? q.correct[0] : q.correct) ? 1 : 0);
      }, 0);
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      onComplete(score);
      setQuizDone(true);
    }
  }, [currentIndex, quiz.questions, answers, onComplete]);

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(null);
    setQuizDone(false);
  }, []);

  if (quizDone) {
    const correctCount = quiz.questions.reduce((count, q) => {
      return count + (answers[q.id] === (Array.isArray(q.correct) ? q.correct[0] : q.correct) ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / quiz.questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border p-8 text-center"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
      >
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
          score >= 80 ? 'bg-[hsl(142,71%,45%)]/15' : score >= 60 ? 'bg-amber-500/15' : 'bg-red-500/15'
        }`}>
          <Trophy className={`w-8 h-8 ${score >= 80 ? 'text-[hsl(142,71%,45%)]' : score >= 60 ? 'text-amber-400' : 'text-red-400'}`} />
        </div>
        <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
        </h3>
        <p className="text-3xl font-bold mb-2" style={{ color: score >= 80 ? 'hsl(142,71%,45%)' : score >= 60 ? 'hsl(38,92%,50%)' : 'hsl(0,84%,60%)' }}>
          {score}%
        </p>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          {correctCount} of {quiz.questions.length} correct
          {previousScore !== undefined && ` · Previous best: ${previousScore}%`}
        </p>
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-[var(--color-bg-card-hover)]"
          style={{ borderColor: 'var(--color-border-default)', color: 'var(--color-text-secondary)' }}
        >
          <RotateCcw className="w-4 h-4" /> Retake Quiz
        </button>
      </motion.div>
    );
  }

  if (!question) return null;

  const correctAnswer = Array.isArray(question.correct) ? question.correct[0] : question.correct;

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
          Question {currentIndex + 1} of {quiz.questions.length}
        </span>
        <div className="flex gap-1">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className="w-6 h-1.5 rounded-full transition-colors"
              style={{
                background: i < currentIndex ? 'hsl(142,71%,45%)' : i === currentIndex ? 'var(--color-accent)' : 'var(--color-bg-surface)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border p-6"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
      >
        <h3 className="text-base font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
          {question.question}
        </h3>

        {question.code && (
          <pre className="rounded-lg p-3 mb-4 text-xs overflow-x-auto" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
            <code>{question.code}</code>
          </pre>
        )}

        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === correctAnswer;
            let borderColor = 'var(--color-border-default)';
            let bgColor = 'transparent';

            if (isShowingResult) {
              if (isCorrect) {
                borderColor = 'hsl(142,71%,45%)';
                bgColor = 'hsl(142,71%,45%,0.08)';
              } else if (isSelected && !isCorrect) {
                borderColor = 'hsl(0,84%,60%)';
                bgColor = 'hsl(0,84%,60%,0.08)';
              }
            } else if (isSelected) {
              borderColor = 'var(--color-accent)';
              bgColor = 'var(--color-accent-muted)';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all duration-200"
                style={{
                  borderColor,
                  background: bgColor,
                  color: 'var(--color-text-primary)',
                  cursor: isAnswered ? 'default' : 'pointer',
                }}
              >
                <span
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-medium"
                  style={{ borderColor }}
                >
                  {isShowingResult && isCorrect && <Check className="w-3.5 h-3.5 text-[hsl(142,71%,45%)]" />}
                  {isShowingResult && isSelected && !isCorrect && <X className="w-3.5 h-3.5 text-[hsl(0,84%,60%)]" />}
                  {!isShowingResult && String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isShowingResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 px-4 py-3 rounded-lg border-l-3 text-sm"
            style={{
              background: selectedAnswer === correctAnswer ? 'hsl(142,71%,45%,0.05)' : 'hsl(38,92%,50%,0.05)',
              borderLeftColor: selectedAnswer === correctAnswer ? 'hsl(142,71%,45%)' : 'hsl(38,92%,50%)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {question.explanation}
          </motion.div>
        )}

        {/* Next button */}
        {isShowingResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ background: 'var(--color-accent)' }}
            >
              {currentIndex < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
