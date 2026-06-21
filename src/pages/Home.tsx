import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import Announcement from '../sections/Announcement'
import Features from '../sections/Features'
import Environment from '../sections/Environment'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Announcement />
        <Features />
        <Environment />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
