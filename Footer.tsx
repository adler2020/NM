import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let animationId = 0

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

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      alpha: number
    }

    const particles: Particle[] = []
    const count = 60

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw connections
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(196, 162, 101, ${0.15 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    if (!contentRef.current) return
    const els = contentRef.current.querySelectorAll('.hero-anim')
    gsap.fromTo(
      els,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-navy"
    >
      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30 pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto py-32"
      >
        {/* Logo */}
        <div className="hero-anim mb-8">
          <img
            src="/images/logo.png"
            alt="شعار ثانوية نور المعارف"
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Subtitle */}
        <p className="hero-anim text-white/80 font-tajawal text-lg sm:text-xl mb-4 tracking-wide">
          الإعلان الرسمي والانطلاقة الكبرى
        </p>

        {/* Main Title */}
        <h1 className="hero-anim font-cairo font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gradient-gold leading-tight mb-4">
          ثانوية نور المعارف الخاصة
        </h1>

        {/* Location */}
        <p className="hero-anim text-white/70 font-tajawal text-base sm:text-lg mb-8 flex items-center justify-center gap-2">
          <span className="inline-block w-8 h-px bg-gold/50" />
          كفر شمس - حوران
          <span className="inline-block w-8 h-px bg-gold/50" />
        </p>

        {/* CTA Buttons */}
        <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            className="inline-flex items-center gap-2 bg-gradient-gold-btn text-navy font-cairo font-bold px-8 py-3.5 rounded-full hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-xl shadow-gold/30"
          >
            اكتشف مميزاتنا
          </a>
          <a
            href="#announcement"
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-cairo font-bold px-8 py-3.5 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            اقرأ رسالتنا
          </a>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 right-0 left-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F8F0E3"
          />
        </svg>
      </div>
    </section>
  )
}
