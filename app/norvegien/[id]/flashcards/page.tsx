import { notFound } from 'next/navigation'
import { lessons, getLessonById } from '@/data/lessons-no'
import NorwegianFlashCardSession from './NorwegianFlashCardSession'

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
    title: `Flashcards — ${lesson.title} — Norvégien Facile`,
  }
}

export default async function NorwegianFlashCardsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lesson = getLessonById(id)

  if (!lesson) notFound()

  return <NorwegianFlashCardSession lesson={lesson} />
}
