import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Announcement() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const items = contentRef.current.querySelectorAll('.reveal-item')
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
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
      id="announcement"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-cream"
    >
      <div ref={contentRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal-item">
          <span className="inline-block font-tajawal text-gold font-semibold text-sm tracking-wider mb-2">
            بسم الله الرحمن الرحيم
          </span>
          <h2 className="font-cairo font-bold text-2xl sm:text-3xl md:text-4xl text-navy mb-4">
            انطلاقة جديدة نحو التميز
          </h2>
          <div className="w-24 h-1 bg-gradient-gold-btn mx-auto rounded-full" />
        </div>

        {/* Announcement Card */}
        <div className="reveal-item bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gold/10">
          {/* Opening */}
          <div className="text-center mb-8">
            <p className="font-tajawal text-navy/90 text-base sm:text-lg leading-relaxed mb-4">
              إلى أهالينا الكرام في بلدة كفر شمس الأبية، وإلى ربوع وقرى حوران المعطاءة..
            </p>
            <p className="font-tajawal text-navy/80 text-base leading-relaxed mb-4">
              إلى أولياء الأمور الحريصين على بناء مستقبل واعد لأبنائهم، وإلى طلابنا الأوفياء الطامحين نحو قمم التفوق والتميز الشريف؛
            </p>
            <p className="font-tajawal text-navy/80 text-base leading-relaxed">
              إيماناً منا بأن التعليم هو حجر الأساس لبناء الأمم وصناعة الوعي، ولأن مرحلة الشهادة الثانوية هي المنعطف الأهم والركيزة الأقوى في مسيرة الطالب الأكاديمية؛
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-l from-gold/30 to-transparent" />
            <div className="w-3 h-3 bg-gold rounded-full" />
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>

          {/* Main Announcement */}
          <div className="text-center mb-8">
            <p className="font-tajawal text-navy text-lg sm:text-xl leading-relaxed mb-4">
              نعلن لكم عن قرب فتح باب القبول والتسجيل للعام الدراسي الجديد في الصرح التعليمي الأحدث والأرقى في المنطقة:
            </p>
            <h3 className="font-cairo font-black text-xl sm:text-2xl md:text-3xl text-gradient-gold my-6">
              ثانوية نور المعارف الخاصة
            </h3>
            <p className="font-tajawal text-navy/80 text-base">
              (للمرحلة الثانوية بفرعيها: العلمي والأدبي)
            </p>
          </div>

          {/* Quote */}
          <div className="reveal-item bg-cream/60 rounded-xl p-6 border-r-4 border-gold">
            <p className="font-cairo font-bold text-navy text-base sm:text-lg leading-relaxed text-center italic">
              "ولأن نجاح أي منشأة يبدأ من قوة قيادتها وحكمتها، يسعدنا أن نفتح أبوابنا متسلحين بأفضل كادر تدريسي وإداري في المنطقة، لنكون الخيار الأول والآمن لمستقبل أبنائكم."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
