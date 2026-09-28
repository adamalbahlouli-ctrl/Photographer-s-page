import Hero from '../components/sections/Hero'
import Intro from '../components/sections/Intro'
import FeaturedWork from '../components/sections/FeaturedWork'
import FeaturedStory from '../components/sections/FeaturedStory'
import ServicesPreview from '../components/sections/ServicesPreview'
import Process from '../components/sections/Process'
import Testimonials from '../components/sections/Testimonials'
import JournalPreview from '../components/sections/JournalPreview'
import InstagramStrip from '../components/sections/InstagramStrip'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Intro />
      <FeaturedWork />
      <FeaturedStory />
      <ServicesPreview />
      <Process />
      <Testimonials />
      <JournalPreview />
      <InstagramStrip />
      <ContactSection />
    </div>
  )
}
