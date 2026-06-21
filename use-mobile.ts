import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Users,
  BookOpen,
  Monitor,
  UserCheck,
  ClipboardList,
  Shield,
  GraduationCap,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Users,
    title: 'بيئة تعليمية نموذجية ومحدودة السعة',
    description:
      'تضم المدرسة (8) شعب صفية متكاملة مخصصة حصرياً لصفوف المرحلة الثانوية، مما يضمن خفض الكثافة الطلابية داخل القاعات، ورفع كفاءة الاستيعاب، وتأمين التركيز والمتابعة المباشرة من المعلم لكل طالب وطالبة.',
  },
  {
    icon: BookOpen,
    title: 'كادر تدريسي نخبوي لشهادة البكالوريا',
    description:
      'تم اختيار مدرسينا بعناية فائقة من صفوة الكفاءات التربوية المشهود لها في المواد العلمية والأدبية، مع تخصيص الشعبة الثامنة الرديفة للتقوية المكثفة لطلاب شهادة الثانوية العامة.',
  },
  {
    icon: Monitor,
    title: 'التحول الرقمي الاستباقي ومواكبة العصر',
    description:
      'انطلاقاً من رؤيتنا بأن التكنولوجيا أداة لتبسيط العلوم، نتميز بدمج المناهج الرقمية وأدوات العرض الحديثة، مع ربط فصولنا بالمنصة الافتراضية المساعدة للمدرسة.',
  },
  {
    icon: UserCheck,
    title: 'فصل تام بين الجنسين',
    description:
      'حرصاً على توفير بيئة تعليمية مريحة وممتلئة بالخصوصية والتركيز، تم تخصيص أقسام مستقلة تماماً لكل من الطلاب والطالبات بما يتماشى مع قيمنا التربوية والاجتماعية.',
  },
  {
    icon: ClipboardList,
    title: 'أوراق عمل تفاعلية ومتابعة مستمرة مع الأهل',
    description:
      'نؤمن بأن التعليم شراكة بين المدرسة والمنزل؛ لذا نعتمد نظام أوراق العمل الدورية لقياس مستوى الطلاب، مع قنوات تواصل مستمرة لإطلاع أولياء الأمور على أدق التفاصيل الأكاديمية.',
  },
  {
    icon: Shield,
    title: 'كرامة مصانة ومواطنة جامعة',
    description:
      'نلتزم بتطبيق لائحة أحكام داخلية صارمة تضمن بيئة تربوية آمنة، ترتكز على الأخلاق القويمة، العدالة الاجتماعية، وترسيخ قيم الاحترام المتبادل والعيش المشترك.',
  },
  {
    icon: GraduationCap,
    title: 'سياسة أقساط مرنة وميسرة',
    description:
      'تيسيراً على أهالينا ومراعاة للظروف المعيشية، اعتمدت الإدارة المالية خطاً سعرياً مرناً للأقساط السنوية يُسدد على دفعات ميسرة، مع تقديم حسومات تشجيعية خاصة للأخوة، ومنح دراسية تصل إلى 100%.',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current || !sectionRef.current) return

    const cards = cardsRef.current.querySelectorAll('.feature-card')
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-white"
    >
      {/* Top wave */}
      <div className="absolute top-0 right-0 left-0 rotate-180">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 36C840 40 960 48 1080 52C1200 56 1320 56 1380 56L1440 56V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#F8F0E3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block font-tajawal text-gold font-semibold text-sm tracking-wider mb-2">
            سبعة أسباب تجعلنا الخيار الأمثل
          </span>
          <h2 className="font-cairo font-bold text-2xl sm:text-3xl md:text-4xl text-navy mb-4">
            لماذا تختار نور المعارف؟
          </h2>
          <div className="w-24 h-1 bg-gradient-gold-btn mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="feature-card group bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-cairo font-bold text-navy text-base sm:text-lg mb-3 leading-snug group-hover:text-gold-dark transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-tajawal text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/20 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 right-0 left-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 36C840 40 960 48 1080 52C1200 56 1320 56 1380 56L1440 56V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#F8F0E3"
          />
        </svg>
      </div>
    </section>
  )
}
