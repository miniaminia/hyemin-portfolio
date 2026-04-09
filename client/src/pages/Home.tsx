import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        <Hero
          name={portfolioData.name}
          title={portfolioData.title}
          subtitle={portfolioData.subtitle}
          description={portfolioData.description}
          email={portfolioData.email}
        />

        <section id="about">
          <Expertise items={portfolioData.expertise} />
        </section>

        <section id="experience">
          <Experience items={portfolioData.experience} />
        </section>

        <section id="works">
          <Works projects={portfolioData.projects} />
        </section>

        <Contact email={portfolioData.email} />
      </div>
    </div>
  );
}
