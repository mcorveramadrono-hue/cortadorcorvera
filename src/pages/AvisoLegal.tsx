import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AvisoLegal = () => {
  const navigate = useNavigate();

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
          Aviso Legal
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-foreground">
          <p className="text-sm text-muted-foreground/70">Última actualización: 21 de mayo de 2026</p>

          <h2>1. Información general (LSSI-CE)</h2>
          <p>
            En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos del titular del sitio web:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Titular:</strong> Marcos Corvera Madroño (Corvera Ibéricos)</li>
            <li><strong>Actividad:</strong> Comercialización de productos ibéricos y servicios de cortador profesional</li>
            <li><strong>Domicilio:</strong> Madrid, España</li>
            <li><strong>Correo electrónico:</strong> corveraibericos@gmail.com</li>
            <li><strong>Teléfono:</strong> +34 676 70 30 34</li>
            <li><strong>Sitio web:</strong> www.corveraibericos.com</li>
          </ul>

          <h2>2. Objeto</h2>
          <p>
            El presente aviso legal regula el uso del sitio web www.corveraibericos.com. La navegación por el mismo atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este aviso.
          </p>

          <h2>3. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales), así como su diseño gráfico y códigos fuente, son propiedad intelectual del titular o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente.
          </p>
          <p>
            Las marcas, nombres comerciales y signos distintivos son titularidad del titular o terceros, sin que pueda entenderse que el acceso al sitio web atribuya ningún derecho sobre las mismas.
          </p>

          <h2>4. Condiciones de uso</h2>
          <p>
            El usuario se compromete a hacer un uso adecuado de los contenidos y servicios y a no emplearlos para incurrir en actividades ilícitas, lesivas de derechos de terceros, o que infrinjan la normativa sobre propiedad intelectual o cualquier otra norma del ordenamiento jurídico aplicable.
          </p>

          <h2>5. Exclusión de responsabilidad</h2>
          <p>
            El titular no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones, virus informáticos, averías telefónicas o desconexiones en el funcionamiento operativo del sistema electrónico, motivadas por causas ajenas al titular.
          </p>

          <h2>6. Enlaces</h2>
          <p>
            En el caso de que en el sitio web se incluyesen enlaces o hipervínculos hacia otros sitios de Internet, el titular no ejercerá ningún tipo de control sobre dichos sitios y sus contenidos.
          </p>

          <h2>7. Legislación aplicable y jurisdicción</h2>
          <p>
            La relación entre el titular y el usuario se regirá por la normativa española vigente. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del consumidor cuando se trate de relaciones con consumidores.
          </p>
          <p>
            Conforme al artículo 14 del Reglamento (UE) 524/2013, se informa al consumidor de la existencia de la plataforma de resolución de litigios en línea de la Comisión Europea, accesible en{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr
            </a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AvisoLegal;
