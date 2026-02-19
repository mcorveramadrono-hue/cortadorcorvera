import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-corvera-dark py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-bold">MC</span>
              </div>
              <div>
                <p className="font-serif text-xl font-bold tracking-widest text-background">CORVERA</p>
                <p className="text-xs tracking-[0.25em] text-background/60 uppercase">Un Corte Original</p>
              </div>
            </div>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs">
              Jamón ibérico de la más alta calidad, seleccionado con la exigencia que mereces.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-background/40 font-medium">
              Navegación
            </p>
            <nav className="flex flex-col gap-2">
              {["Inicio", "Productos", "Servicios", "Contacto"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-background/40 font-medium">
              Síguenos
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
            >
              <Instagram size={18} />
              @corvera_jamon
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 text-center">
          <p className="text-xs text-background/30 tracking-widest">
            © {new Date().getFullYear()} CORVERA · Un Corte Original. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
