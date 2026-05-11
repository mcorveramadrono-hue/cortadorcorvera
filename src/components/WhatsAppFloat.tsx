import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "34676703034";
const DEFAULT_MESSAGE =
  "Hola, vengo de la web de Corvera Ibéricos y me gustaría más información.";

const HIDDEN_ROUTES = ["/checkout", "/confirmar-pago", "/marcar-envio"];

const WhatsAppFloat = () => {
  const { pathname } = useLocation();

  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl md:bottom-6 md:right-6"
    >
      <MessageCircle size={24} className="fill-white" strokeWidth={0} />
      <span className="hidden text-sm font-semibold sm:inline">
        ¿Dudas? Escríbenos
      </span>
    </a>
  );
};

export default WhatsAppFloat;
