import type { Word } from '@/data/lessons'

type Props = {
  word: Word
  index: number
}

export default function WordCard({ word, index }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 flex flex-col gap-3">
      {/* Index + Albanian word */}
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-1">
          {index + 1}
        </span>
        <div>
          <p className="text-2xl font-bold text-stone-900 leading-tight">
            {word.albanian}
          </p>
          <p className="text-sm text-amber-600 font-medium mt-0.5">
            /{word.phonetic}/
          </p>
        </div>
      </div>

      {/* French translation */}
      <div className="pl-10">
        <p className="text-stone-600 font-semibold">{word.french}</p>
      </div>

      {/* Example phrase */}
      <div className="pl-10 bg-amber-50 rounded-xl p-3 border border-amber-100">
        <p className="text-stone-800 text-sm italic mb-1">
          &ldquo;{word.exampleAlbanian}&rdquo;
        </p>
        <p className="text-stone-500 text-sm">→ {word.exampleFrench}</p>
      </div>
    </div>
  )
}
