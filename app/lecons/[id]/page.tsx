import { notFound } from 'next/navigation'
import Link from 'next/link'
import { lessons, getLessonById } from '@/data/lessons'
import WordCard from '@/components/WordCard'

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lesson = getLessonById(id)
  if (!lesson) return {}
  return {
    title: `${lesson.title} — Albanais Facile`,
    description: `Apprenez ${lesson.words.length} mots albanais sur le thème "${lesson.title}" avec phonétique et exemples.`,
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lesson = getLessonById(id)

  if (!lesson) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/#lecons" className="hover:text-amber-600 transition-colors">
          Leçons
        </Link>
        <span>/</span>
        <span className="text-stone-700 font-medium">{lesson.title}</span>
      </nav>

      {/* Lesson header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{lesson.emoji}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
              {lesson.title}
            </h1>
            <p className="text-amber-600 font-semibold text-lg mt-0.5">
              {lesson.albanianTitle}
            </p>
          </div>
        </div>
        <p className="text-stone-500 text-sm">
          {lesson.words.length} mots · Cliquez sur &laquo;&nbsp;Flashcards&nbsp;&raquo; pour vous entraîner.
        </p>
      </header>

      {/* Word list */}
      <section className="flex flex-col gap-3 mb-10">
        {lesson.words.map((word, i) => (
          <WordCard key={word.albanian} word={word} index={i} />
        ))}
      </section>

      {/* Flashcard CTA */}
      <div className="sticky bottom-6 flex justify-center">
        <Link
          href={`/lecons/${lesson.id}/flashcards`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-amber-200 transition-all hover:shadow-xl hover:shadow-amber-300 hover:-translate-y-0.5"
        >
          🔄 S&apos;entraîner en flashcards
        </Link>
      </div>
    </div>
  )
}
