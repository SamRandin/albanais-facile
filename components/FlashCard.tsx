'use client'

import { useState } from 'react'
import type { Word } from '@/data/lessons'

type Props = {
  word: Word
}

export default function FlashCard({ word }: Props) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => setFlipped((prev) => !prev)

  return (
    <div
      className="flip-card w-full cursor-pointer select-none"
      style={{ height: '320px' }}
      onClick={handleFlip}
      role="button"
      aria-label={flipped ? 'Voir le mot albanais' : 'Voir la traduction'}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleFlip()
      }}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* FRONT — Albanian word */}
        <div className="flip-card-front">
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6 opacity-80">
              Albanais
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
          <div className="w-full h-full bg-white border-2 border-amber-200 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 gap-4">
            {/* Albanian word (small reminder) */}
            <p className="text-amber-500 font-bold text-lg">{word.albanian}</p>

            {/* Phonetic */}
            <p className="text-stone-400 text-sm tracking-wide">
              /{word.phonetic}/
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-amber-200" />

            {/* French translation */}
            <p className="text-2xl font-bold text-stone-800 text-center">
              {word.french}
            </p>

            {/* Example */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-center w-full">
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
