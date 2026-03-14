import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { Highlight } from "@/sections/Highlight";
import { Portfolio } from "@/sections/Portfolio";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Highlight />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

export default App;