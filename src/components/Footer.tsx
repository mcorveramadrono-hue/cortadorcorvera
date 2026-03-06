import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import corveraLogo from "@/assets/corvera-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-corvera-dark py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={corveraLogo} alt="Corvera" className="h-10 w-auto invert" />
              <p className="text-xs tracking-[0.25em] text-background/60 uppercase">Un Corte Original</p>
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
              href="instagram://user?username=cortadormc"
              onClick={(e) => { setTimeout(() => { window.open('https://www.instagram.com/cortadormc/', '_blank'); }, 500); }}
              className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
            >
              <Instagram size={18} />
              @cortadormc
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 text-center">
          <p className="text-xs text-background/30 tracking-widest">
            © {new Date().getFullYear()} Cortador Corvera · Un Corte Original. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
