import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GalleryStripSection } from '@/components/sections/GalleryStripSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'

export const revalidate = 60

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <StatsSection />
      <GalleryStripSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
