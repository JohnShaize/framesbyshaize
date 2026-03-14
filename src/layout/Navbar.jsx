import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "dark";

    setTheme(initialTheme);

    if (initialTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6">
        {/* Desktop */}
        <div className="relative hidden items-center justify-between md:flex">
          {/* expanding background bar */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 rounded-full origin-center transform-gpu border border-transparent bg-[color:color-mix(in_srgb,var(--color-surface)_80%,transparent)] backdrop-blur-[24px] will-change-[transform,opacity] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolled ? "opacity-100 scale-x-100" : "opacity-0 scale-x-[0.84]"
            }`}
          />

          {/* Left side */}
          <div className="flex items-center gap-2 pl-2 lg:pl-2">
            <a
              href="#"
              className={`rounded-[24px] px-4 py-1.5 text-xl font-bold tracking-tight text-foreground transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary ${
                isScrolled
                  ? "border border-transparent bg-transparent shadow-none"
                  : "glass-strong border-transparent"
              }`}
            >
              FS<span className="text-primary">.</span>
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`group hidden items-center gap-2 rounded-[24px] px-3 py-1.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] md:inline-flex ${
                isScrolled
                  ? "border border-transparent bg-transparent shadow-none"
                  : "glass-strong border-transparent"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/12 text-primary transition-colors">
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </span>

              <span className="pr-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isScrolled
                  ? "border border-transparent bg-transparent shadow-none"
                  : "glass-strong border-transparent"
              }`}
            >
              {navLinks.map((link, index) => (
                <a
                  href={link.href}
                  key={index}
                  className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="pr-2 lg:pr-2">
            <a href="#contact">
              <div
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isScrolled ? "scale-[0.98]" : "scale-100"
                }`}
              >
                <Button size="sm" className="rounded-[24px] px-5 py-1.5">
                  Contact Me
                </Button>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="glass-strong rounded-full px-4 py-2 text-xl font-bold tracking-tight text-foreground shadow-sm transition-colors hover:text-primary"
            >
              FS<span className="text-primary">.</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="glass-strong inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground shadow-sm transition-colors hover:text-primary"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 px-4 md:hidden">
          <div className="glass-strong animate-mobile-menu-in flex flex-col gap-4 rounded-[20px] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="rounded-xl py-2 text-lg text-muted-foreground transition-all duration-200 hover:bg-white/5 hover:px-2 hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>

            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button>Contact Me</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};