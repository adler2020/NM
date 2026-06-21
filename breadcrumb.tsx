import { MapPin, Mail, ExternalLink } from 'lucide-react'

const quickLinks = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'رسالتنا', href: '#announcement' },
  { label: 'ما يميزنا', href: '#features' },
  { label: 'البيئة التعليمية', href: '#environment' },
  { label: 'تواصل معنا', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-navy-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* School Info */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="شعار ثانوية نور المعارف"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h4 className="font-cairo font-bold text-white text-base">
                  ثانوية نور المعارف الخاصة
                </h4>
                <p className="font-tajawal text-white/50 text-xs">
                  بالعلم والعمل نبني قادة الغد
                </p>
              </div>
            </div>
            <p className="font-tajawal text-white/60 text-sm leading-relaxed">
              مؤسسة تعليمية رائدة مكرسة لتقديم تعليم ثانوي متميز في بيئة محفزة تتيح لطلابنا تحقيق أقصى إمكاناتهم.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-cairo font-bold text-gold text-base mb-4">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-tajawal text-white/60 hover:text-gold transition-colors text-sm inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-cairo font-bold text-gold text-base mb-4">
              معلومات التواصل
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="font-tajawal text-white/60 text-sm">
                  بلدة كفر شمس - حوران
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span
                  className="font-tajawal text-white/60 text-sm"
                  dir="ltr"
                >
                  noor-almaarif.dirasi.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-tajawal text-white/40 text-xs text-center sm:text-right">
              جميع الحقوق محفوظة © 2025 ثانوية نور المعارف الخاصة
            </p>
            <p className="font-tajawal text-white/30 text-xs text-center sm:text-left">
              فبالشكر تدوم النعم
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
