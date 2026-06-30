import { notFound } from 'next/navigation'
import { lessons, getLessonById } from '@/data/lessons-elvish'
import ElvishFlashCardSession from './ElvishFlashCardSession'

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
    title: `Flashcards — ${lesson.title} — Quenya Elfique`,
  }
}

export default async function ElvishFlashCardsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lesson = getLessonById(id)

  if (!lesson) notFound()

  return <ElvishFlashCardSession lesson={lesson} />
}
