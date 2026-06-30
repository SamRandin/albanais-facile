'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Lesson } from '@/data/lessons-no'
import ProgressBar from '@/components/ProgressBar'

type Props = {
  lesson: Lesson
}

type Result = 'correct' | 'incorrect'

function NorwegianFlashCard({ word }: { word: Lesson['words'][number] }) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => setFlipped((prev) => !prev)

  return (
    <div
      className="flip-card w-full cursor-pointer select-none"
      style={{ height: '320px' }}
      onClick={handleFlip}
      role="button"
      aria-label={flipped ? 'Voir le mot norvégien' : 'Voir la traduction'}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleFlip()
      }}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* FRONT — Norwegian word */}
        <div className="flip-card-front">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6 opacity-80">
              Norvégien
            </p>
            <p className="text-5xl font-bold text-center leading-tight mb-4">
              {word.albanian}
            </p>
            <p className="text-base opacity-75 text-center">
              Cliquez pour révéler
            </p>
          </div>
        </div>

        {/* BACK — French + phonetic + example */}
        <div className="flip-card-back">
          <div className="w-full h-full bg-white border-2 border-blue-200 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 gap-4">
            {/* Norwegian word (small reminder) */}
            <p className="text-blue-500 font-bold text-lg">{word.albanian}</p>

            {/* Phonetic */}
            <p className="text-stone-400 text-sm tracking-wide">
              /{word.phonetic}/
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-blue-200" />

            {/* French translation */}
            <p className="text-2xl font-bold text-stone-800 text-center">
              {word.french}
            </p>

            {/* Example */}
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-center w-full">
              <p className="text-stone-700 text-sm italic mb-1">
                &ldquo;{word.exampleAlbanian}&rdquo;
              </p>
              <p className="text-stone-500 text-sm">→ {word.exampleFrench}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NorwegianFlashCardSession({ lesson }: Props) {
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
          href={`/norvegien/${lesson.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-blue-600 transition-colors mb-8"
        >
          ← Retour à la leçon
        </Link>

        <div className="bg-white rounded-3xl border border-blue-100 shadow-md p-10">
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
              <p className="text-4xl font-extrabold text-blue-500">{score}%</p>
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
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold px-6 py-3 rounded-full shadow transition-all"
            >
              🔄 Recommencer
            </button>
            <Link
              href={`/norvegien/${lesson.id}`}
              className="bg-white border border-blue-200 text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
            >
              Retour à la leçon
            </Link>
            <Link
              href="/norvegien"
              className="bg-white border border-stone-200 text-stone-600 font-bold px-6 py-3 rounded-full hover:bg-stone-50 transition-colors"
            >
              Accueil Norvégien
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
          href={`/norvegien/${lesson.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-blue-600 transition-colors"
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
        <NorwegianFlashCard key={currentIndex} word={word} />
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
