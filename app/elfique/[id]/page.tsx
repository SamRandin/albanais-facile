import { notFound } from 'next/navigation'
import Link from 'next/link'
import { lessons, getLessonById } from '@/data/lessons-elvish'
import ElvishWordCard from './ElvishWordCard'

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
    title: `${lesson.title} — Quenya Elfique`,
    description: `Apprenez ${lesson.words.length} mots en Quenya sur le thème "${lesson.title}" avec phonétique et exemples.`,
  }
}

export default async function ElvishLessonPage({
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
        <Link href="/elfique" className="hover:text-emerald-600 transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/elfique#lecons" className="hover:text-emerald-600 transition-colors">
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
            <p className="text-emerald-600 font-semibold text-lg mt-0.5">
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
          <ElvishWordCard key={word.albanian} word={word} index={i} />
        ))}
      </section>

      {/* Flashcard CTA */}
      <div className="sticky bottom-6 flex justify-center">
        <Link
          href={`/elfique/${lesson.id}/flashcards`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5"
        >
          🔄 S&apos;entraîner en flashcards
        </Link>
      </div>
    </div>
  )
}
