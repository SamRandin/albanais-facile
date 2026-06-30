import Link from 'next/link'
import { lessons } from '@/data/lessons-no'
import NorwegianLessonCard from './NorwegianLessonCard'

export default function NorwegianHomePage() {
  const totalWords = lessons.reduce((sum, l) => sum + l.words.length, 0)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <span>🇳🇴</span>
              <span>Norsk — Langue norvégienne</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-5 drop-shadow-sm">
              Apprenez <br />
              le norvégien
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              Vocabulaire essentiel et phrases du quotidien pour partir à la
              découverte de la Norvège. Apprendre par thèmes, sans prise de
              tête.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/norvegien#lecons"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition-colors"
              >
                Commencer les leçons →
              </Link>
              <span className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-full">
                {totalWords} mots · {lessons.length} thèmes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-white border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '🗂️', label: 'Leçons thématiques', desc: 'Vocabulaire organisé par situations réelles' },
            { icon: '🔄', label: 'Flashcards interactives', desc: 'Révisez avec des cartes à retourner' },
            { icon: '🗣️', label: 'Phonétique incluse', desc: 'Prononciation simplifiée pour francophones' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{icon}</span>
              <div>
                <p className="font-semibold text-stone-800">{label}</p>
                <p className="text-sm text-stone-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lessons grid */}
      <section id="lecons" className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
            Les leçons
          </h2>
          <p className="text-stone-500">
            Choisissez un thème et commencez à apprendre.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <NorwegianLessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white mt-4 mb-10 mx-4 sm:mx-6 rounded-3xl max-w-5xl lg:mx-auto">
        <div className="px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Prêt à vous lancer ?</h3>
            <p className="text-white/80 text-sm">
              Commencez par les salutations — c&apos;est indispensable !
            </p>
          </div>
          <Link
            href="/norvegien/salutations"
            className="flex-shrink-0 bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition-colors"
          >
            Première leçon →
          </Link>
        </div>
      </section>
    </>
  )
}
