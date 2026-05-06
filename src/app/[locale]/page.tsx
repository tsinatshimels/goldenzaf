import { getFeaturedProjects } from '@/sanity/lib/client'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GalleryStripSection } from '@/components/sections/GalleryStripSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'

export default async function HomePage() {
  let featuredProjects = []
  try {
    featuredProjects = await getFeaturedProjects()
  } catch {
    // Falls back to demo projects when Sanity not yet configured
  }

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProjectsSection projects={featuredProjects} />
      <StatsSection />
      <GalleryStripSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
