import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink, 
  ChevronRight, 
  GraduationCap, 
  Beaker, 
  BookOpen, 
  Briefcase,
  Download,
  ArrowUpRight,
  Languages
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
      className="flex items-center gap-2 text-brand-600 font-mono text-sm tracking-widest uppercase mb-2"
    >
      <span className="h-px w-8 bg-brand-600"></span>
      {title}
    </motion.div>
    {subtitle && (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-zinc-900"
      >
        {subtitle}
      </motion.h2>
    )}
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const t = CONTENT[lang];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleLang = () => setLang(prev => prev === "en" ? "fr" : "en");

  return (
    <div className="min-h-screen bg-brand-50 selection:bg-brand-100 selection:text-brand-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-sans font-semibold text-lg tracking-tight">
            Dr. Alex Hazen<span className="text-brand-600">.</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
              <a href="#about" className="hover:text-brand-600 transition-colors">{t.nav.about}</a>
              <a href="#research" className="hover:text-brand-600 transition-colors">{t.nav.research}</a>
              <a href="#publications" className="hover:text-brand-600 transition-colors">{t.nav.publications}</a>
              <a href="#cv" className="hover:text-brand-600 transition-colors">{t.nav.cv}</a>
            </div>

            <div className="h-6 w-px bg-zinc-200 hidden md:block" />

            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 text-xs font-mono font-medium hover:bg-zinc-50 transition-all text-zinc-600"
            >
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>

            <a 
              href="mailto:rhazen603@gmail.com" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-full hover:bg-brand-900 transition-all text-sm font-medium"
            >
              {t.nav.contact} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="about" className="section-padding min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto relative overflow-hidden">
          {/* Chemistry Background Element */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full h-full -z-10 opacity-[0.08] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="text-brand-600">
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="400" cy="400" r="100" />
                <circle cx="250" cy="300" r="40" />
                <circle cx="550" cy="300" r="40" />
                <circle cx="400" cy="550" r="60" />
                <line x1="400" y1="300" x2="400" y2="200" />
                <line x1="400" y1="500" x2="400" y2="400" />
                <line x1="290" y1="300" x2="360" y2="300" />
                <line x1="440" y1="300" x2="510" y2="300" />
                <line x1="330" y1="350" x2="270" y2="320" />
                <path d="M 400 400 L 500 500 M 400 400 L 300 500" />
                <circle cx="100" cy="100" r="20" />
                <circle cx="700" cy="700" r="30" />
                <line x1="100" y1="120" x2="100" y2="200" />
                <path d="M 600 100 L 700 200 L 600 300" />
              </g>
            </svg>
          </div>

          {/* Blurred Lab Image Background */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-1/2 h-full -z-20 opacity-20 blur-3xl pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=1000" 
              alt="Laboratory" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-medium tracking-tighter text-zinc-900 mb-8 leading-[0.9]">
                {t.hero.title} <br />
                <span className="text-zinc-400">{t.hero.subtitle}</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl leading-relaxed mb-10">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#research" 
                  className="group flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-full hover:bg-brand-900 transition-all"
                >
                  {t.hero.cta} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center gap-4 px-2">
                  <a href="#" className="p-3 text-zinc-400 hover:text-brand-600 transition-colors"><Linkedin size={20} /></a>
                  <a href="#" className="p-3 text-zinc-400 hover:text-brand-600 transition-colors"><Github size={20} /></a>
                  <a href="mailto:rhazen603@gmail.com" className="p-3 text-zinc-400 hover:text-brand-600 transition-colors"><Mail size={20} /></a>
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
                  className="group p-8 bg-white border border-zinc-200 rounded-3xl hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500"
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
        <section id="publications" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <SectionHeader title={t.publications.title} subtitle={t.publications.subtitle} />
            <div className="space-y-6">
              {t.publications.items.map((pub, index) => (
                <motion.div
                  key={`${lang}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-zinc-100 hover:bg-zinc-50 transition-colors rounded-xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen size={16} className="text-brand-600" />
                      <span className="text-xs font-mono text-zinc-400">{pub.date}</span>
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 mb-1 group-hover:text-brand-600 transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-zinc-500 italic mb-1">{pub.journal}</p>
                    <p className="text-xs text-zinc-400">{pub.authors}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-8">
                    <a 
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-brand-600 transition-colors"
                    >
                      DOI: {pub.doi} <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CV Section */}
        <section id="cv" className="section-padding bg-brand-500 text-white overflow-hidden">
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
              {/* Experience */}
              <div>
                <div className="flex items-center gap-3 mb-8 text-zinc-300">
                  <Briefcase size={20} />
                  <h3 className="text-xl font-medium uppercase tracking-wider text-sm">{t.cv.experienceTitle}</h3>
                </div>
                <div className="space-y-12">
                  {t.cv.experience.map((exp, index) => (
                    <div key={`${lang}-${index}`} className="relative pl-8 border-l border-brand-900">
                      <div className="absolute left-0 top-0 w-2 h-2 bg-brand-600 rounded-full -translate-x-1/2 mt-2" />
                      <div className="text-sm font-mono text-brand-100 mb-1">{exp.period}</div>
                      <h4 className="text-xl font-medium mb-1">{exp.role}</h4>
                      <div className="text-zinc-300 text-sm mb-4">{exp.institution}</div>
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-3 mb-8 text-zinc-300">
                  <GraduationCap size={20} />
                  <h3 className="text-xl font-medium uppercase tracking-wider text-sm">{t.cv.educationTitle}</h3>
                </div>
                <div className="space-y-12">
                  {t.cv.education.map((edu, index) => (
                    <div key={`${lang}-${index}`} className="relative pl-8 border-l border-brand-900">
                      <div className="absolute left-0 top-0 w-2 h-2 bg-brand-600 rounded-full -translate-x-1/2 mt-2" />
                      <div className="text-sm font-mono text-brand-100 mb-1">{edu.period}</div>
                      <h4 className="text-xl font-medium mb-1">{edu.degree}</h4>
                      <div className="text-zinc-300 text-sm mb-2">{edu.institution}</div>
                      <p className="text-zinc-400 text-xs font-mono uppercase tracking-tighter">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-zinc-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-zinc-400 text-sm">
              {t.footer.copy}
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors"><Github size={18} /></a>
              <a href="mailto:rhazen603@gmail.com" className="text-zinc-400 hover:text-zinc-900 transition-colors"><Mail size={18} /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
