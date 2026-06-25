type Props = {
  current: number   // 0-based index of current card
  total: number
  correct: number
  incorrect: number
}

export default function ProgressBar({ current, total, correct, incorrect }: Props) {
  const progressPercent = total > 0 ? Math.round(((current) / total) * 100) : 0

  return (
    <div className="w-full">
      {/* Score row */}
      <div className="flex items-center justify-between mb-2 text-sm font-medium">
        <span className="text-stone-500">
          Carte <span className="text-stone-800">{current + 1}</span> sur{' '}
          <span className="text-stone-800">{total}</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-600 flex items-center gap-1">
            <span className="text-base">✓</span> {correct}
          </span>
          <span className="text-rose-500 flex items-center gap-1">
            <span className="text-base">✗</span> {incorrect}
          </span>
        </div>
      </div>

      {/* Bar */}
      <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
