'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavTabs() {
  const pathname = usePathname()
  const isNorwegian = pathname.startsWith('/norvegien')
  const isElvish = pathname.startsWith('/elfique')
  const isAlbanian = !isNorwegian && !isElvish

  return (
    <div className="flex items-center gap-1 bg-stone-100 rounded-full p-1">
      <Link
        href="/"
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          isAlbanian
            ? 'bg-amber-500 text-white shadow-sm'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <span>🇦🇱</span>
        <span>Albanais</span>
      </Link>
      <Link
        href="/norvegien"
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          isNorwegian
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <span>🇳🇴</span>
        <span>Norvégien</span>
      </Link>
      <Link
        href="/elfique"
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          isElvish
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <span>🧝</span>
        <span>Elfique</span>
      </Link>
    </div>
  )
}
