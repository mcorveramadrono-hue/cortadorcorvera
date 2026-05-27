import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageSeo } from "@/lib/seo";

const PoliticaCookies = () => {
  const navigate = useNavigate();
  usePageSeo({
    title: "Política de Cookies | Corvera Ibéricos",
    description: "Política de cookies de Corvera Ibéricos: tipos de cookies que usamos, finalidad y cómo gestionar tus preferencias.",
    path: "/politica-cookies",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </button>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Política de Cookies
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-foreground">
          <p className="text-sm text-muted-foreground/70">Última actualización: 21 de mayo de 2026</p>

          <h2>1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario al navegar. Permiten reconocer al usuario y recordar información sobre su visita.
          </p>

          <h2>2. Cookies utilizadas en este sitio</h2>
          <p>
            En cumplimiento del artículo 22.2 de la Ley 34/2002 (LSSI-CE), informamos de que <strong>este sitio web únicamente utiliza cookies técnicas estrictamente necesarias</strong> para su correcto funcionamiento. Estas cookies están exentas del deber de obtener consentimiento previo.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Cookies de sesión y carrito:</strong> permiten mantener los productos seleccionados en el carrito de compra y gestionar el proceso de pedido.</li>
            <li><strong>Cookies del proveedor de pago (Stripe):</strong> necesarias para procesar pagos de forma segura y prevenir el fraude.</li>
            <li><strong>Almacenamiento local (localStorage):</strong> se utiliza para conservar el contenido del carrito entre visitas y mejorar la experiencia de compra.</li>
          </ul>
          <p>
            <strong>No se utilizan cookies de análisis, publicidad ni de seguimiento de terceros</strong> que requieran consentimiento.
          </p>

          <h2>3. Gestión y desactivación de cookies</h2>
          <p>
            El usuario puede en cualquier momento configurar su navegador para aceptar, rechazar o eliminar las cookies. A continuación se facilitan los enlaces oficiales para gestionar las cookies en los principales navegadores:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
          </ul>
          <p>
            La desactivación de las cookies técnicas puede afectar al correcto funcionamiento del proceso de compra.
          </p>

          <h2>4. Modificaciones</h2>
          <p>
            Esta Política de Cookies puede modificarse en función de exigencias legislativas, reglamentarias o de adaptación a instrucciones de la Agencia Española de Protección de Datos. Se recomienda revisarla periódicamente.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoliticaCookies;
