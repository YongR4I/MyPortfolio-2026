import React from 'react';
import { projectsData } from '@/data';
import { notFound } from 'next/navigation';
import { BackButton } from './BackButton';
import ProjectHeroSlider from '@/components/ui/ProjectHeroSlider';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#18181B] text-white selection:bg-[#FF442B] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 md:p-8 z-50 bg-[#18181B]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BackButton />

          <div className="hidden md:flex gap-6">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="font-mono text-xs text-white/50 hover:text-white uppercase tracking-widest transition-colors">Live Site ↗</a>
            )}
            {project.githubLink && (
              <a href={project.githubLink === 'PRIVATE FOR NOW' ? '#' : project.githubLink} target={project.githubLink === 'PRIVATE FOR NOW' ? '_self' : '_blank'} rel="noreferrer" className="font-mono text-xs text-white/50 hover:text-white uppercase tracking-widest transition-colors">GitHub ↗</a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Pure Typography */}
      <header className="pt-40 md:pt-56 pb-12 md:pb-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <p className="font-mono text-[#FF442B] text-sm uppercase tracking-widest mb-6 md:mb-8">
          {project.year || '2026'}
        </p>
        <h1 className="font-['Inter_Display'] font-bold text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight mb-10 text-white">
          {project.title}
        </h1>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-3">
          {project.techStack?.map((tech: string, i: number) => (
            <span key={i} className="font-mono text-xs md:text-sm text-white/70 tracking-widest uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Massive Hero Image Slider & Video */}
      <section className="w-full px-4 md:px-8 lg:px-12 pb-24 md:pb-40 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
        <ProjectHeroSlider 
          images={[...(project.images || []), ...(project.video ? [project.video] : [])].length > 0 ? [...(project.images || []), ...(project.video ? [project.video] : [])] : [project.imagePlaceholder]} 
          alt={project.title} 
        />
      </section>

      {/* Story Content - Single Column Reading Experience */}
      <article className="max-w-3xl mx-auto px-6 pb-40 flex flex-col gap-24 md:gap-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both">

        {/* Overview */}
        {project.overview && (
          <section>
            <h2 className="font-mono text-[#FF442B] text-sm uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#FF442B]"></span>
              Overview
            </h2>
            <p className="font-['Inter_Display'] font-medium text-2xl md:text-3xl lg:text-4xl leading-[1.4] text-white/90">
              {project.overview}
            </p>
          </section>
        )}

        {/* Challenge & Execution */}
        {project.problemAndApproach && (
          <section>
            <h2 className="font-mono text-[#FF442B] text-sm uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#FF442B]"></span>
              Challenge & Execution
            </h2>
            <p className="font-['Inter_Display'] text-lg md:text-xl lg:text-2xl leading-[1.6] text-white/60">
              {project.problemAndApproach}
            </p>
          </section>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <section>
            <h2 className="font-mono text-[#FF442B] text-sm uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#FF442B]"></span>
              Results
            </h2>
            <div className="flex flex-col gap-6">
              {project.results.map((result: string, i: number) => (
                <div key={i} className="flex gap-6 items-start p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-[#FF442B] flex-shrink-0" />
                  <p className="font-['Inter_Display'] text-lg md:text-xl text-white/80 leading-relaxed">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Action */}
        <section className="pt-24 border-t border-white/10 flex flex-col items-center text-center">
          <h2 className="font-['Inter_Display'] text-3xl md:text-4xl font-bold mb-10">Want to see it in action?</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-['Inter_Display'] font-bold text-lg hover:scale-105 hover:bg-[#FF442B] hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                Visit Live Website
                <svg width="20" height="20" className="-rotate-45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink === 'PRIVATE FOR NOW' ? '#' : project.githubLink}
                target={project.githubLink === 'PRIVATE FOR NOW' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-full font-['Inter_Display'] font-bold text-lg border transition-all duration-300 flex items-center justify-center gap-3 ${project.githubLink === 'PRIVATE FOR NOW' ? 'border-white/10 text-white/30 cursor-not-allowed' : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'}`}
              >
                View Source Code
              </a>
            )}
          </div>
        </section>

      </article>
    </main>
  );
}
