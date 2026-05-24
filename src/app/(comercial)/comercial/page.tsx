import { HeroSection } from './components/hero-section';
import { ProblemaSection } from './components/problema-section';
import { SolucionSection } from './components/solucion-section';
import { ComoFuncionaSection } from './components/como-funciona-section';
import { RoadmapSection } from './components/roadmap-section';
import { StickyBar } from './components/sticky-bar';

export default function ComercialPage() {
  return (
    <main className="relative bg-dark-900 overflow-x-hidden">
      <HeroSection />
      <ProblemaSection />
      <SolucionSection />
      <ComoFuncionaSection />
      <RoadmapSection />
      <StickyBar />
    </main>
  );
}