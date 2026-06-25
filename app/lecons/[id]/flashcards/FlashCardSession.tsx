'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Lesson } from '@/data/lessons'
import FlashCard from '@/components/FlashCard'
import ProgressBar from '@/components/ProgressBar'

type Props = {
  lesson: Lesson
}

type Result = 'correct' | 'incorrect'

export default function FlashCardSession({ lesson }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [sessionDone, setSessionDone] = useState(false)

  const word = lesson.words[currentIndex]
  const correct = results.filter((r) => r === 'correct').length
  const incorrect = results.filter((r) => r === 'incorrect').length
  const isLast = currentIndex === lesson.words.length - 1

  function handleAnswer(result: Result) {
    const newResults = [...results, result]
    setResults(newResults)

    if (isLast) {
      setSessionDone(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      // Remove the last recorded result if going back
      setResults((prev) => prev.slice(0, prev.length - 1))
    }
  }

  function handleRestart() {
    setCurrentIndex(0)
    setResults([])
    setSessionDone(false)
  }

  // --- Summary screen ---
  if (sessionDone) {
    const score = Math.round((correct / lesson.words.length) * 100)
    const emoji =
      score === 100 ? '🏆' : score >= 70 ? '🎉' : score >= 40 ? '👍' : '💪'

    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-14 text-center">
        {/* Back link */}
        <Link
          href={`/lecons/${lesson.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-600 transition-colors mb-8"
        >
          ← Retour à la leçon
        </Link>

        <div className="bg-white rounded-3xl border border-amber-100 shadow-md p-10">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-extrabold text-stone-900 mb-1">
            Session terminée !
          </h2>
          <p className="text-stone-500 mb-8">
            {lesson.title} · {lesson.words.length} cartes
          </p>

          {/* Score ring / bar */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-emerald-500">{correct}</p>
              <p className="text-xs text-stone-400 mt-1">Correct</p>
            </div>
            <div className="w-px h-12 bg-stone-200" />
            <div className="text-center">
              <p className="text-4xl font-extrabold text-rose-400">{incorrect}</p>
              <p className="text-xs text-stone-400 mt-1">À revoir</p>
            </div>
            <div className="w-px h-12 bg-stone-200" />
            <div className="text-center">
              <p className="text-4xl font-extrabold text-amber-500">{score}%</p>
              <p className="text-xs text-stone-400 mt-1">Score</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-stone-100 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-full shadow transition-all"
            >
              🔄 Recommencer
            </button>
            <Link
              href={`/lecons/${lesson.id}`}
              className="bg-white border border-amber-200 text-amber-700 font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors"
            >
              Retour à la leçon
            </Link>
            <Link
              href="/"
              className="bg-white border border-stone-200 text-stone-600 font-bold px-6 py-3 rounded-full hover:bg-stone-50 transition-colors"
            >
              Accueil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // --- Active session ---
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/lecons/${lesson.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-600 transition-colors"
        >
          ← Leçon
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium text-stone-600">
          <span>{lesson.emoji}</span>
          <span>{lesson.title}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <ProgressBar
          current={currentIndex}
          total={lesson.words.length}
          correct={correct}
          incorrect={incorrect}
        />
      </div>

      {/* Flashcard */}
      <div className="mb-6">
        <FlashCard key={currentIndex} word={word} />
      </div>

      {/* Instruction hint */}
      <p className="text-center text-xs text-stone-400 mb-6">
        Cliquez sur la carte pour voir la traduction
      </p>

      {/* Answer buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => handleAnswer('incorrect')}
          className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold py-4 rounded-2xl transition-colors"
        >
          <span className="text-lg">✗</span>
          À revoir
        </button>
        <button
          onClick={() => handleAnswer('correct')}
          className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 font-bold py-4 rounded-2xl transition-colors"
        >
          <span className="text-lg">✓</span>
          Je savais !
        </button>
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 text-sm font-medium text-stone-400 hover:text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Précédent
        </button>
        <span className="text-xs text-stone-400">
          {currentIndex + 1} / {lesson.words.length}
        </span>
        <button
          onClick={() => {
            if (isLast) {
              setSessionDone(true)
            } else {
              setCurrentIndex((prev) => prev + 1)
            }
          }}
          className="flex items-center gap-1.5 text-sm font-medium text-stone-400 hover:text-stone-700 transition-colors"
        >
          Passer →
        </button>
      </div>
    </div>
  )
}
