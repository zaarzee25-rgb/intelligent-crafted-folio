import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { ResearchSection } from "@/components/portfolio/Research";
import { Services } from "@/components/portfolio/Services";
import { Blog } from "@/components/portfolio/Blog";
import { Contact, Footer } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arif Pratama — IoT Engineer, Fullstack Developer & Researcher" },
      {
        name: "description",
        content:
          "Portfolio of Arif Pratama — building intelligent systems through IoT, software, and applied research. Available for select engagements in 2026.",
      },
      { property: "og:title", content: "Arif Pratama — IoT Engineer & Researcher" },
      {
        property: "og:description",
        content: "IoT platforms, fullstack systems, and applied research engineered for production.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ResearchSection />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
