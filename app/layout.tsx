import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import NavTabs from '@/components/NavTabs'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Albanais Facile — Apprenez l\'albanais',
  description:
    'Apprenez l\'albanais grâce à des leçons thématiques et des flashcards interactives. Vocabulaire, phrases et prononciation pour débutants francophones.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-amber-50 text-stone-900">
        {/* Navigation */}
        <header className="bg-white border-b border-amber-200 sticky top-0 z-50 shadow-sm">
          <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-amber-700 hover:text-amber-800 transition-colors"
            >
              <span className="text-2xl">🦅</span>
              <span>Albanais Facile</span>
            </Link>
            <NavTabs />
          </nav>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-amber-200 mt-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-stone-400">
            <span>© 2024 Albanais Facile</span>
            <span>Apprenez l&apos;albanais, une leçon à la fois.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
