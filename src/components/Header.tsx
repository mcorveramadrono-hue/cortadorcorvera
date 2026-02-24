import { useState } from "react";
import { Menu, X } from "lucide-react";
import corveraLogo from "@/assets/corvera-logo.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <img src={corveraLogo} alt="Corvera" className="h-10 md:h-12 w-auto" />
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase hidden sm:block">Un Corte Original</p>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col items-center py-6 gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
