import Link from 'next/link'
import type { Lesson } from '@/data/lessons'

type Props = {
  lesson: Lesson
}

export default function LessonCard({ lesson }: Props) {
  return (
    <Link
      href={`/lecons/${lesson.id}`}
      className="group block bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 overflow-hidden"
    >
      {/* Color band at top */}
      <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:from-amber-500 group-hover:to-orange-500 transition-colors duration-200" />

      <div className="p-5">
        {/* Emoji */}
        <div className="text-4xl mb-3 leading-none">{lesson.emoji}</div>

        {/* Title */}
        <h2 className="font-bold text-stone-800 text-lg leading-tight mb-1">
          {lesson.title}
        </h2>

        {/* Albanian title */}
        <p className="text-amber-600 text-sm font-medium mb-3">
          {lesson.albanianTitle}
        </p>

        {/* Word count badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
            {lesson.words.length} mots
          </span>
          <span className="text-stone-400 text-xs">→ Commencer</span>
        </div>
      </div>
    </Link>
  )
}
