import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Linkedin, 
  ChevronRight, 
  GraduationCap, 
  Beaker, 
  Briefcase,
  Download,
  ArrowUpRight,
  Languages,
  Menu,
  X
} from "lucide-react";
import { CONTENT } from "./constants.ts";
import React from "react";

type Language = "en" | "fr";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-3"
    >
      <span className="h-px w-8 bg-black shrink-0" aria-hidden />
      <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-black m-0">
        {title}
      </h2>
    </motion.div>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl font-sans font-normal tracking-tight text-zinc-600 max-w-3xl pl-11 m-0"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isHeroExpanded, setIsHeroExpanded] = useState<boolean>(false);
  const t = CONTENT[lang];
  const servicePackages = lang === "fr"
    ? [
        {
          tier: "Starter",
          title: "Pack Starter - Consultation Technique",
          points: [
            "Discussion initiale de votre projet ou de votre challenge",
            "Revue des materiaux et de la strategie de formulation",
            "Recommandations expertes et prochaines etapes"
          ]
        },
        {
          tier: "Avance",
          title: "Pack Avance - Support Formulation & Developpement",
          points: [
            "Analyse approfondie de votre systeme (epoxy, retardateur de flamme ou vitrimer)",
            "Strategies de formulation adaptees",
            "Conseils sur la selection des materiaux et l'optimisation des performances",
            "Support technique continu"
          ]
        },
        {
          tier: "Expert",
          title: "Pack Expert - Partenariat R&D Complet",
          points: [
            "Accompagnement complet du concept a l'application",
            "Developpement de nouvelles formulations ou technologies",
            "Strategie de performance au feu et de recyclabilite (retardance flamme & systemes vitrimers)",
            "Optimisation des procedes et accompagnement a la montee en echelle",
            "Collaboration a long terme et soutien a l'innovation"
          ]
        }
      ]
    : [
        {
          tier: "Starter",
          title: "Starter Package - Technical Consultation",
          points: [
            "Initial discussion of your project or challenge",
            "Review of materials and formulation strategy",
            "Expert recommendations and next steps"
          ]
        },
        {
          tier: "Advanced",
          title: "Advanced Package - Formulation & Development Support",
          points: [
            "In-depth analysis of your system (epoxy, flame-retardant, or vitrimer)",
            "Tailored formulation strategies",
            "Guidance on material selection and performance optimization",
            "Ongoing technical support"
          ]
        },
        {
          tier: "Expert",
          title: "Expert Package - Full R&D Partnership",
          points: [
            "Complete support from concept to application",
            "Development of new formulations or technologies",
            "Fire performance and recyclability strategy (flame retardancy & vitrimer systems)",
            "Process optimization and scale-up guidance",
            "Long-term collaboration and innovation support"
          ]
        }
      ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "fr" : "en"));
    setIsMobileNavOpen(false);
    setIsHeroExpanded(false);
  };

  return (
    <div className="min-h-screen bg-brand-50 selection:bg-brand-100 selection:text-brand-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          <div className="font-sans font-semibold text-lg tracking-tight">
            Dr. Antoine Ishak<span className="text-brand-600">.</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
              <a href="#about" className="hover:text-brand-600 transition-colors">{t.nav.about}</a>
              <a href="#research" className="hover:text-brand-600 transition-colors">{t.nav.research}</a>
              <a href="#packages" className="hover:text-brand-600 transition-colors">
                {lang === "fr" ? "Offres de Services" : "Service Packages"}
              </a>
            </div>

            <div className="h-6 w-px bg-zinc-200 hidden md:block" />

            <button
              type="button"
              aria-expanded={isMobileNavOpen}
              aria-label={
                isMobileNavOpen
                  ? lang === "fr"
                    ? "Fermer le menu"
                    : "Close menu"
                  : lang === "fr"
                    ? "Ouvrir le menu"
                    : "Open menu"
              }
              onClick={() => setIsMobileNavOpen((open) => !open)}
              className="md:hidden p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 text-xs font-mono font-medium hover:bg-zinc-50 transition-all text-zinc-600"
            >
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>

            <a 
              href="mailto:a.ishak.consulting@gmail.com" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-full hover:bg-brand-900 transition-all text-sm font-medium"
            >
              {t.nav.contact} <ArrowUpRight size={14} />
            </a>
          </div>

          <AnimatePresence>
            {isMobileNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 top-full z-45 md:hidden glass border-b border-zinc-100 shadow-lg"
              >
                <div className="max-w-7xl mx-auto px-2 py-2 flex flex-col text-sm font-medium text-zinc-600">
                  <a
                    href="#about"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-zinc-50 hover:text-brand-600 transition-colors"
                  >
                    {t.nav.about}
                  </a>
                  <a
                    href="#research"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-zinc-50 hover:text-brand-600 transition-colors"
                  >
                    {t.nav.research}
                  </a>
                  <a
                    href="#packages"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-zinc-50 hover:text-brand-600 transition-colors"
                  >
                    {lang === "fr" ? "Offres de Services" : "Service Packages"}
                  </a>
                  <a
                    href="mailto:a.ishak.consulting@gmail.com"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="sm:hidden mx-2 mt-1 mb-2 flex items-center justify-center gap-2 px-4 py-3 bg-brand-500 text-white rounded-full hover:bg-brand-900 transition-all"
                  >
                    {t.nav.contact} <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.button
            type="button"
            aria-label={lang === "fr" ? "Fermer le menu" : "Close menu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-39 bg-zinc-900/20 md:hidden"
            onClick={() => setIsMobileNavOpen(false)}
          />
        )}
      </AnimatePresence>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="about" className="section-padding min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto relative overflow-hidden">
          {/* Materials Background */}
          <div className="absolute inset-0 -z-20 pointer-events-none">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[90%] bg-linear-to-br from-brand-200/70 via-brand-100/50 to-transparent rounded-full blur-3xl" />
            <div className="hidden lg:block absolute right-[4%] top-1/2 -translate-y-1/2 w-[310px] rounded-3xl border border-brand-200/80 bg-white/85 shadow-xl shadow-brand-100/60 p-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-brand-600 mb-3">Service Focus</div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="h-11 rounded-lg border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-mono text-xs">EP</div>
                <div className="h-11 rounded-lg border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-mono text-xs">FR</div>
                <div className="h-11 rounded-lg border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-mono text-xs">VT</div>
                <div className="h-11 rounded-lg border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-mono text-xs">TS</div>
                <div className="h-11 rounded-lg border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-mono text-xs">TP</div>
                <div className="h-11 rounded-lg border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-mono text-xs">R&D</div>
              </div>
              <div className="font-mono text-xs text-brand-700/80">Portfolio:</div>
              <div className="font-mono text-sm text-brand-800 mt-1">Epoxy + Flame Retardancy + Vitrimer</div>
            </div>
            <div className="hidden md:block absolute right-[8%] bottom-[14%] text-brand-700/45 font-mono text-xs tracking-wider">
              Polymer Materials Consulting
            </div>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full h-full -z-10 opacity-[0.12] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="text-brand-700">
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="430" cy="390" r="90" />
                <circle cx="290" cy="300" r="34" />
                <circle cx="560" cy="300" r="34" />
                <circle cx="430" cy="560" r="48" />
                <line x1="332" y1="330" x2="386" y2="362" />
                <line x1="526" y1="330" x2="474" y2="362" />
                <line x1="430" y1="480" x2="430" y2="512" />
                <line x1="430" y1="300" x2="430" y2="220" />
                <circle cx="680" cy="170" r="20" />
                <circle cx="650" cy="220" r="12" />
                <line x1="668" y1="185" x2="658" y2="208" />
                <circle cx="150" cy="640" r="26" />
                <circle cx="205" cy="655" r="14" />
                <line x1="176" y1="646" x2="191" y2="651" />
              </g>
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-medium tracking-tighter text-zinc-900 mb-10 leading-[0.9]">
                {t.hero.title} <br />
                <span className="text-zinc-500">{t.hero.subtitle}</span>
              </h1>
              <div className="max-w-3xl mb-12">
                <p
                  className={`whitespace-pre-line text-base md:text-lg text-zinc-600 leading-8 transition-all ${
                    isHeroExpanded ? "" : "max-h-32 overflow-hidden"
                  }`}
                >
                  {t.hero.description}
                </p>
                <button
                  type="button"
                  onClick={() => setIsHeroExpanded((prev) => !prev)}
                  className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors"
                >
                  {isHeroExpanded
                    ? lang === "fr"
                      ? "Voir moins"
                      : "Show less"
                    : lang === "fr"
                      ? "Voir plus"
                      : "Show more"}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <a 
                  href="#research" 
                  className="group flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-full hover:bg-brand-900 transition-all"
                >
                  {t.hero.cta} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center gap-4 px-2">
                  <a href="https://www.linkedin.com/in/a-ishak-consulting-6272a33ba/" className="p-3 text-zinc-400 hover:text-brand-600 transition-colors"><Linkedin size={20} /></a>
                  <a href="mailto:a.ishak.consulting@gmail.com" className="p-3 text-zinc-400 hover:text-brand-600 transition-colors"><Mail size={20} /></a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Research Section */}
        <section id="research" className="section-padding bg-zinc-50">
          <div className="max-w-7xl mx-auto">
            <SectionHeader title={t.research.title} subtitle={t.research.subtitle} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.research.projects.map((project, index) => (
                <motion.div
                  key={`${lang}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 bg-white border border-zinc-200 border-t-2 border-t-brand-100 rounded-3xl hover:border-t-brand-500 hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform">
                    <Beaker size={24} />
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mb-2">{project.year}</div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-4">{project.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-zinc-100 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
       <section id="packages" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title={lang === "fr" ? "Offres de Services" : "Service Packages"}
              subtitle={lang === "fr" ? "Choisissez le niveau d'accompagnement adapte a votre projet" : "Choose the level of support that matches your project"}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicePackages.map((pkg, index) => (
                <motion.div
                  key={`${lang}-${index}`}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group p-6 rounded-3xl border transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 ${
                    index === 1
                      ? "bg-brand-50 border-brand-200 shadow-lg shadow-brand-100/40 hover:shadow-xl hover:shadow-brand-200/50"
                      : "bg-white border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/50"
                  }`}
                >
                  <div className="mb-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      index === 1
                        ? "bg-brand-500 text-white"
                        : index === 2
                          ? "bg-orange-50 text-orange-700 border border-orange-200"
                          : "bg-zinc-100 text-zinc-600"
                    }`}>
                      {pkg.tier}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 mb-4 leading-snug">{pkg.title}</h3>
                  <ul className="space-y-2 text-sm text-zinc-600 mb-6">
                    {pkg.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-brand-600 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <div className="mt-12">
              <a
                href="mailto:a.ishak.consulting@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white text-sm font-medium hover:bg-brand-900 transition-colors shadow-md shadow-brand-200/50"
              >
                {lang === "en" ? "Discuss a collaboration" : "Discuter une collaboration"} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section> 

        {/* CV Section */}
       {/*  <section id="cv" className="section-padding bg-brand-500 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-brand-100 font-mono text-sm tracking-widest uppercase mb-2"
                >
                  <span className="h-px w-8 bg-brand-100"></span>
                  {t.cv.title}
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-sans font-medium tracking-tight">{t.cv.subtitle}</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-white text-brand-500 rounded-full font-medium hover:bg-brand-50 transition-all"
              >
                <Download size={18} /> {t.cv.download}
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         
              <div>
                <div className="flex items-center gap-3 mb-8 text-zinc-300">
                  <Briefcase size={20} />
                  <h3 className="text-sm font-medium uppercase tracking-wider">{t.cv.experienceTitle}</h3>
                </div>
                <div className="space-y-12">
                  {t.cv.experience.map((exp, index) => (
                    <div key={`${lang}-${index}`} className="relative pl-8 border-l border-brand-900">
                      <div className="absolute left-0 top-0 w-2 h-2 bg-brand-600 rounded-full -translate-x-1/2 mt-2" />
                      <div className="text-sm font-mono text-brand-100 mb-1">{exp.period}</div>
                      <h4 className="text-xl font-medium mb-1">{exp.role}</h4>
                      <div className="text-zinc-200 text-sm mb-4">{exp.institution}</div>
                      <p className="text-zinc-200/90 text-sm leading-relaxed max-w-md">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

             
              <div>
                <div className="flex items-center gap-3 mb-8 text-zinc-300">
                  <GraduationCap size={20} />
                  <h3 className="text-sm font-medium uppercase tracking-wider">{t.cv.educationTitle}</h3>
                </div>
                <div className="space-y-12">
                  {t.cv.education.map((edu, index) => (
                    <div key={`${lang}-${index}`} className="relative pl-8 border-l border-brand-900">
                      <div className="absolute left-0 top-0 w-2 h-2 bg-brand-600 rounded-full -translate-x-1/2 mt-2" />
                      <div className="text-sm font-mono text-brand-100 mb-1">{edu.period}</div>
                      <h4 className="text-xl font-medium mb-1">{edu.degree}</h4>
                      <div className="text-zinc-200 text-sm mb-2">{edu.institution}</div>
                      <p className="text-zinc-200/90 text-xs font-mono uppercase tracking-tighter">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-zinc-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-zinc-400 text-sm">
              {t.footer.copy}
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/a-ishak-consulting-6272a33ba/" className="text-zinc-400 hover:text-zinc-900 transition-colors"><Linkedin size={18} /></a>
              <a href="mailto:a.ishak.consulting@gmail.com" className="text-zinc-400 hover:text-zinc-900 transition-colors"><Mail size={18} /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
