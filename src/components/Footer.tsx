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
            <address className="not-italic text-xs text-background/40 leading-relaxed space-y-1">
              <div>Madrid, España</div>
              <div>
                <a href="tel:+34676703034" className="hover:text-background transition-colors">Tel: +34 676 70 30 34</a>
              </div>
              <div>
                <a href="mailto:corveraibericos@gmail.com" className="hover:text-background transition-colors">corveraibericos@gmail.com</a>
              </div>
            </address>
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
              href="instagram://user?username=corveraibericos"
              onClick={(e) => { setTimeout(() => { window.open('https://www.instagram.com/corveraibericos/', '_blank'); }, 500); }}
              className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
            >
              <Instagram size={18} />
              @corveraibericos
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 text-center space-y-2">
          <Link
            to="/politica-privacidad"
            className="text-xs text-background/40 hover:text-background/70 tracking-widest transition-colors"
          >
            Política de Privacidad
          </Link>
          <p className="text-xs text-background/30 tracking-widest">
            © {new Date().getFullYear()} Corvera Ibéricos · Un Corte Original. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
