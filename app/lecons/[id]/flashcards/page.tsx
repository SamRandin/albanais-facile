import { notFound } from 'next/navigation'
import { lessons, getLessonById } from '@/data/lessons'
import FlashCardSession from './FlashCardSession'

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
    title: `Flashcards — ${lesson.title} — Albanais Facile`,
  }
}

export default async function FlashCardsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lesson = getLessonById(id)

  if (!lesson) notFound()

  return <FlashCardSession lesson={lesson} />
}
