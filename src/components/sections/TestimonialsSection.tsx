'use client'
import { useState } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const TESTIMONIALS = [
  {
    name: 'Abebe Girma',
    role: { en: 'Business Owner', am: 'የቢዝነስ ባለቤት' },
    content: {
      en: 'Golden Zaf transformed our office completely. The executive desks and reception furniture they crafted exceeded our expectations. Exceptional quality and attention to detail.',
      am: 'ወርቃማ ዛፍ ቢሮአችንን ሙሉ ለሙሉ ቀይሮታል። ያዘጋጁት የቢሮ ዕቃዎች ከጠበቅነው በላይ ነበሩ። ምርጥ ጥራት እና ዝርዝር ትኩረት።',
    },
    rating: 5,
    avatar: 'AG',
  },
  {
    name: 'Tigist Haile',
    role: { en: 'Interior Designer', am: 'የውስጥ ዲዛይነር' },
    content: {
      en: 'I collaborate with Golden Zaf on all my client projects. Their CNC work is absolutely stunning — the precision and artistry in every piece is remarkable.',
      am: 'ሁሉም የደንበኛ ፕሮጀክቶቼ ላይ ከወርቃማ ዛፍ ጋር እሰራለሁ። የCNC ስራቸው እጅግ አስደናቂ ነው።',
    },
    rating: 5,
    avatar: 'TH',
  },
  {
    name: 'Mohammed Al-Rashid',
    role: { en: 'Hotel Manager', am: 'የሆቴል ሥራ አስኪያጅ' },
    content: {
      en: 'We furnished our entire hotel lobby and rooms with Golden Zaf pieces. Guests constantly compliment the beautiful, luxurious furniture. Highly recommend.',
      am: 'ሙሉ ሆቴሉን እና ክፍሎቹን በወርቃማ ዛፍ ዕቃዎች አስሙልቻለሁ። እንግዶቻችን ሁሌ ምስጋና ይናገራሉ።',
    },
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Sara Tesfaye',
    role: { en: 'Homeowner', am: 'የቤት ባለቤት' },
    content: {
      en: 'The bedroom set they made for us is absolutely stunning. Custom design, perfect finish, and delivered on time. Could not be happier with the results.',
      am: 'ላዘጋጁልን የመኝታ ዕቃ ምስጋና። ብጁ ዲዛይን፣ ፍጹም ጥራት፣ ወቅቱን ጠብቀው አስረከቡ።',
    },
    rating: 5,
    avatar: 'ST',
  },
]

export function TestimonialsSection() {
  const locale = useLocale()
  const isAmharic = locale === 'am'
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[current]

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f1c17 0%, #1a2e23 100%)' }}
    >
      {/* Background quote decoration */}
      <div className="absolute top-8 left-8 opacity-5">
        <Quote className="w-40 h-40 text-gold-500" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-5 rotate-180">
        <Quote className="w-40 h-40 text-gold-500" />
      </div>

      <div className="container-site relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className={cn(
            'text-xs tracking-[0.4em] uppercase text-gold-500/70 mb-3',
            isAmharic && 'font-amharic tracking-widest text-sm'
          )}>
            {isAmharic ? 'ደንበኞቻችን ምን ይላሉ' : 'What Our Clients Say'}
          </p>
          <h2 className={cn(
            'section-title text-4xl sm:text-5xl text-white',
            isAmharic && 'font-amharic'
          )}>
            {isAmharic ? 'ምስክርነቶች' : 'Testimonials'}
          </h2>
          <hr className="gold-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className={cn(
                'text-xl sm:text-2xl text-white/80 leading-relaxed mb-10 font-display italic',
                isAmharic && 'font-amharic text-lg sm:text-xl not-italic'
              )}>
                "{isAmharic ? t.content.am : t.content.en}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center font-display text-gold-500 font-bold">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white font-body">{t.name}</p>
                  <p className={cn(
                    'text-sm text-gold-500/70',
                    isAmharic && 'font-amharic'
                  )}>
                    {isAmharic ? t.role.am : t.role.en}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 border border-gold-500/30 flex items-center justify-center text-gold-500/60 hover:text-gold-500 hover:border-gold-500 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    'h-0.5 rounded-full transition-all duration-500',
                    i === current ? 'w-8 bg-gold-500' : 'w-4 bg-white/20'
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-gold-500/30 flex items-center justify-center text-gold-500/60 hover:text-gold-500 hover:border-gold-500 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
