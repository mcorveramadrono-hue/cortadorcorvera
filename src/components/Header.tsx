import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoMC from "@/assets/logo-mc.png";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
        setIsOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Tienda", href: "/tienda" },
    { label: "Corte Original", href: "#sobre-nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Contacto", href: "#contacto" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
      return;
    }
    if (window.location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3 flex items-center justify-between">
        {/* Logo MC a la izquierda */}
        <a href="/#inicio" className="flex items-center">
          <img src={logoMC} alt="MC Cortador Corvera" className="h-12 md:h-16 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href.startsWith("/") ? link.href : (window.location.pathname === "/" ? link.href : `/${link.href}`)}
              onClick={(e) => handleNavClick(link.href, e)}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={() => navigate("/carrito")}
            className="relative inline-flex items-center justify-center w-10 h-10 text-foreground hover:text-primary transition-colors"
            aria-label="Carrito"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col items-center py-6 gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href.startsWith("/") ? link.href : (window.location.pathname === "/" ? link.href : `/${link.href}`)}
                onClick={(e) => handleNavClick(link.href, e)}
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
