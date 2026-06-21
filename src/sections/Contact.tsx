import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const items = contentRef.current.querySelectorAll('.contact-reveal')
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 4000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-navy-dark"
    >
      {/* Top wave */}
      <div className="absolute top-0 right-0 left-0 rotate-180">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 36C840 40 960 48 1080 52C1200 56 1320 56 1380 56L1440 56V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#002147"
          />
        </svg>
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="contact-reveal inline-block font-tajawal text-gold font-semibold text-sm tracking-wider mb-2">
            نحن في انتظار تواصلكم
          </span>
          <h2 className="contact-reveal font-cairo font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4">
            نحن هنا لمساعدتك
          </h2>
          <div className="contact-reveal w-24 h-1 bg-gradient-gold-btn mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="contact-reveal bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-cairo font-bold text-white text-base mb-1">
                    العنوان
                  </h4>
                  <p className="font-tajawal text-white/70 text-sm leading-relaxed">
                    بلدة كفر شمس - حوران - سوريا
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-reveal bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-cairo font-bold text-white text-base mb-1">
                    البريد الإلكتروني
                  </h4>
                  <p className="font-tajawal text-white/70 text-sm" dir="ltr">
                    noor-almaarif.dirasi.com
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-reveal bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-cairo font-bold text-white text-base mb-1">
                    الهاتف
                  </h4>
                  <p className="font-tajawal text-white/70 text-sm" dir="ltr">
                    قريباً
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="contact-reveal bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="font-cairo font-bold text-white text-xl mb-2">
                    شكراً لتواصلكم
                  </h3>
                  <p className="font-tajawal text-white/70">
                    تم استلام رسالتكم بنجاح، وسنقوم بالرد عليكم في أقرب وقت
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-cairo text-white/80 text-sm mb-2">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white font-tajawal placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                        placeholder="أدخل اسمك"
                      />
                    </div>
                    <div>
                      <label className="block font-cairo text-white/80 text-sm mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white font-tajawal placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-cairo text-white/80 text-sm mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white font-tajawal placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                      placeholder="+963..."
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block font-cairo text-white/80 text-sm mb-2">
                      الرسالة
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-white font-tajawal placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all resize-none"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-gold-btn text-navy font-cairo font-bold py-3.5 rounded-xl hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-gold/20"
                  >
                    <Send className="w-5 h-5" />
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
