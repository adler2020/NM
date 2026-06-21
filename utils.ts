import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Atom, BookOpen, Calculator, Languages, FlaskConical, Globe, Palette, Music } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── Orbiting Bubbles Data ─── */
const subjects = [
  { name: 'الرياضيات', desc: 'بناء العقول المنطقية', icon: Calculator, color: '#C4A265' },
  { name: 'الفيزياء', desc: 'استكشاف قوانين الطبيعة', icon: Atom, color: '#2563EB' },
  { name: 'اللغة العربية', desc: 'لغة الضاد والأدب', icon: Languages, color: '#059669' },
  { name: 'الكيمياء', desc: 'فن المواد والتفاعلات', icon: FlaskConical, color: '#DC2626' },
  { name: 'الجغرافيا', desc: 'استكشاف العالم من حولنا', icon: Globe, color: '#7C3AED' },
  { name: 'الفنون', desc: 'إطلاق العنان للإبداع', icon: Palette, color: '#DB2777' },
  { name: 'الموسيقى', desc: 'تنمية المواهب الفنية', icon: Music, color: '#EA580C' },
  { name: 'العلوم', desc: 'فهم الكون والحياة', icon: BookOpen, color: '#0891B2' },
]

/* ─── Typewriter Component ─── */
function Typewriter() {
  const [text, setText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const fullText = 'مرحباً بكم في نور المعارف...'
  const indexRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setText(fullText.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowCursor(false), 800)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto">
      <p
        className={`font-cairo text-xl sm:text-2xl md:text-3xl ${
          text.length === fullText.length ? 'text-gold' : 'text-white'
        } transition-colors duration-500`}
      >
        {text}
        {showCursor && (
          <span className="inline-block w-0.5 h-7 sm:h-8 bg-gold ml-1 animate-pulse align-middle" />
        )}
      </p>
    </div>
  )
}

/* ─── Orbiting Bubble Component ─── */
interface Bubble {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  name: string
  desc: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}

function OrbitingBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const hoveredRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let animId = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.offsetWidth
      h = parent.offsetHeight
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize bubbles
    bubblesRef.current = subjects.map((s, i) => {
      const angle = (i / subjects.length) * Math.PI * 2
      const radius = Math.min(w, h) * 0.25
      return {
        x: w / 2 + Math.cos(angle) * radius,
        y: h / 2 + Math.sin(angle) * radius,
        vx: Math.cos(angle) * 0.3,
        vy: Math.sin(angle) * 0.3,
        r: 36,
        color: s.color,
        name: s.name,
        desc: s.desc,
        icon: s.icon,
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
      hoveredRef.current = null
    }
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      const bubbles = bubblesRef.current

      // Check hover
      hoveredRef.current = null
      for (let i = 0; i < bubbles.length; i++) {
        const dx = mouseRef.current.x - bubbles[i].x
        const dy = mouseRef.current.y - bubbles[i].y
        if (Math.sqrt(dx * dx + dy * dy) < bubbles[i].r) {
          hoveredRef.current = i
          break
        }
      }

      // Draw background bubbles (decorative)
      for (let i = 0; i < 12; i++) {
        const bx = (Math.sin(Date.now() * 0.0003 + i * 2.5) * 0.5 + 0.5) * w
        const by = (Math.cos(Date.now() * 0.0002 + i * 1.8) * 0.5 + 0.5) * h
        const br = 8 + Math.sin(i) * 4
        ctx.beginPath()
        ctx.arc(bx, by, br, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196, 162, 101, ${0.06 + Math.sin(Date.now() * 0.001 + i) * 0.03})`
        ctx.fill()
      }

      // Draw main bubbles
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i]
        const isHovered = hoveredRef.current === i
        const scale = isHovered ? 1.5 : 1

        // Orbit movement (only when not hovered)
        if (!isHovered) {
          const centerX = w / 2
          const centerY = h / 2
          const dx = b.x - centerX
          const dy = b.y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const nx = -dy / dist
          const ny = dx / dist
          b.vx = nx * 0.5
          b.vy = ny * 0.5
        }

        b.x += b.vx
        b.y += b.vy

        // Keep within bounds with soft bounce
        if (b.x < b.r + 10) b.vx = Math.abs(b.vx)
        if (b.x > w - b.r - 10) b.vx = -Math.abs(b.vx)
        if (b.y < b.r + 10) b.vy = Math.abs(b.vy)
        if (b.y > h - b.r - 10) b.vy = -Math.abs(b.vy)

        // Draw bubble
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r * scale, 0, Math.PI * 2)
        ctx.fillStyle = isHovered
          ? `${b.color}30`
          : `${b.color}18`
        ctx.fill()
        ctx.strokeStyle = isHovered ? b.color : `${b.color}60`
        ctx.lineWidth = isHovered ? 2.5 : 1.5
        ctx.stroke()

        // Draw text
        ctx.fillStyle = isHovered ? b.color : `${b.color}CC`
        ctx.font = `${isHovered ? 'bold' : 'normal'} ${isHovered ? 14 : 11}px Cairo, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(b.name, b.x, b.y - (isHovered ? 6 : 3))

        if (isHovered) {
          ctx.font = '11px Tajawal, sans-serif'
          ctx.fillStyle = `${b.color}AA`
          ctx.fillText(b.desc, b.x, b.y + 10)
        }
      }

      // Draw center label
      ctx.font = 'bold 13px Cairo, sans-serif'
      ctx.fillStyle = 'rgba(196, 162, 101, 0.6)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('المواد الدراسية', w / 2, h / 2)

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative w-full h-80 sm:h-96">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
      />
    </div>
  )
}

/* ─── Study Cards Component ─── */
function StudyCards() {
  const [spread, setSpread] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.study-card')
    if (spread) {
      gsap.to(cards, {
        x: (i) => (i - 2) * 120,
        rotation: (i) => (i - 2) * 5,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
      })
    } else {
      gsap.to(cards, {
        x: 0,
        rotation: (i) => (i - 2) * 12,
        duration: 0.5,
        ease: 'power3.inOut',
        stagger: 0.03,
      })
    }
  }, [spread])

  const handleCardHover = (idx: number, entering: boolean) => {
    if (!cardsRef.current || spread) return
    const cards = cardsRef.current.querySelectorAll('.study-card')
    const card = cards[idx]
    if (!card) return
    gsap.to(card, {
      y: entering ? -20 : 0,
      rotation: entering ? 0 : (idx - 2) * 12,
      scale: entering ? 1.05 : 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div ref={cardsRef} className="relative flex items-center justify-center h-48 sm:h-56">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="study-card absolute w-24 h-32 sm:w-28 sm:h-36 bg-white rounded-xl shadow-lg border border-gold/20 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
            style={{ zIndex: 5 - Math.abs(i - 2) }}
            onMouseEnter={() => handleCardHover(i, true)}
            onMouseLeave={() => handleCardHover(i, false)}
          >
            <img
              src="/images/logo.png"
              alt="شعار"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain opacity-60"
            />
            <span className="font-cairo text-xs text-navy/60 mt-2">
              ورقة عمل {i + 1}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSpread(!spread)}
        className="inline-flex items-center gap-2 bg-white/10 border border-gold/30 text-gold font-cairo font-semibold px-6 py-2.5 rounded-full hover:bg-gold/20 transition-all duration-300"
      >
        {spread ? 'إعادة التكديس' : 'انتشار الأوراق'}
      </button>
    </div>
  )
}

/* ─── Main Environment Section ─── */
export default function Environment() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current || !sectionRef.current) return
    const items = headerRef.current.querySelectorAll('.env-reveal')
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section
      id="environment"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-gradient-navy overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-navy-light/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="env-reveal inline-block font-tajawal text-gold font-semibold text-sm tracking-wider mb-2">
            استكشف عالمنا التعليمي
          </span>
          <h2 className="env-reveal font-cairo font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4">
            استكشف بيئتنا التعليمية
          </h2>
          <div className="env-reveal w-24 h-1 bg-gradient-gold-btn mx-auto rounded-full mb-6" />
          <p className="env-reveal font-tajawal text-white/70 text-base max-w-2xl mx-auto">
            نقدم لكم بيئة تعليمية تفاعلية تجمع بين الأصالة والحداثة، حيث يلتقي الإبداع بالمعرفة
          </p>
        </div>

        {/* Typewriter */}
        <div className="mb-14">
          <Typewriter />
        </div>

        {/* Orbiting Bubbles */}
        <div className="mb-14 bg-white/5 rounded-2xl border border-white/10 p-4">
          <h3 className="font-cairo font-bold text-white text-center text-lg mb-2">
            موادنا الدراسية
          </h3>
          <p className="font-tajawal text-white/50 text-sm text-center mb-4">
            مرر المؤشر فوق الفقاعات لاستكشاف المزيد
          </p>
          <OrbitingBubbles />
        </div>

        {/* Study Cards */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8">
          <h3 className="font-cairo font-bold text-white text-center text-lg mb-6">
            أوراق العمل التفاعلية
          </h3>
          <StudyCards />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 right-0 left-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 36C840 40 960 48 1080 52C1200 56 1320 56 1380 56L1440 56V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#002147"
          />
        </svg>
      </div>
    </section>
  )
}
