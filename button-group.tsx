import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'رسالتنا', href: '#announcement' },
  { label: 'ما يميزنا', href: '#features' },
  { label: 'البيئة التعليمية', href: '#environment' },
  { label: 'تواصل معنا', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="شعار ثانوية نور المعارف"
              className="h-14 w-14 object-contain"
            />
            <div className={`hidden sm:block font-cairo font-bold text-sm leading-tight transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}>
              <span className="block">نور المعارف</span>
              <span className="block text-xs font-normal opacity-80">الخاصة</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-tajawal text-sm font-medium transition-all duration-300 hover:text-gold relative group ${
                  scrolled ? 'text-navy' : 'text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-gold-btn text-navy font-cairo font-bold text-sm px-6 py-2.5 rounded-full hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/25"
            >
              سجل الآن
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-navy' : 'text-white'
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gold/20 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-tajawal text-navy font-medium py-2 hover:text-gold transition-colors border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-gradient-gold-btn text-navy font-cairo font-bold py-3 rounded-full mt-3"
          >
            سجل الآن
          </a>
        </div>
      </div>
    </nav>
  )
}
