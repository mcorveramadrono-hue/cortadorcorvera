import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PoliticaPrivacidad = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </button>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Política de Privacidad
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-foreground">

          <p className="text-sm text-muted-foreground/70">Última actualización: {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos personales recogidos a través de este sitio web es <strong>Cortador Corvera</strong>, con correo electrónico de contacto: <strong>mcorveramadrono@gmail.com</strong>.
          </p>

          <h2>2. Datos que recopilamos</h2>
          <p>A través de nuestro formulario de contacto recopilamos los siguientes datos personales:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Contenido del mensaje enviado</li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <p>Los datos personales facilitados serán tratados con las siguientes finalidades:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Atender y gestionar las consultas, solicitudes o presupuestos enviados a través del formulario de contacto.</li>
            <li>Comunicarnos con usted para dar respuesta a su solicitud.</li>
            <li>Gestionar la relación comercial derivada, en su caso.</li>
          </ul>

          <h2>4. Base legal del tratamiento</h2>
          <p>
            La base legal para el tratamiento de sus datos es el <strong>consentimiento del interesado</strong> (art. 6.1.a del RGPD), otorgado al enviar el formulario de contacto, así como el <strong>interés legítimo</strong> del responsable para atender las solicitudes recibidas (art. 6.1.f del RGPD).
          </p>

          <h2>5. Conservación de los datos</h2>
          <p>
            Los datos personales se conservarán durante el tiempo necesario para atender su solicitud y, en su caso, durante los plazos legalmente establecidos para el cumplimiento de obligaciones legales.
          </p>

          <h2>6. Comunicación de datos a terceros</h2>
          <p>
            Los datos proporcionados podrán ser comunicados a los siguientes terceros en calidad de encargados del tratamiento:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Formspree</strong>: servicio de gestión de formularios que procesa los datos enviados a través del formulario de contacto.</li>
          </ul>
          <p>No se realizarán transferencias internacionales de datos fuera del Espacio Económico Europeo, salvo las derivadas del uso de los servicios mencionados, que cuentan con las garantías adecuadas.</p>

          <h2>7. Derechos del usuario</h2>
          <p>Usted tiene derecho a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Acceder</strong> a sus datos personales.</li>
            <li><strong>Rectificar</strong> los datos inexactos o incompletos.</li>
            <li><strong>Suprimir</strong> sus datos cuando ya no sean necesarios.</li>
            <li><strong>Oponerse</strong> al tratamiento de sus datos.</li>
            <li><strong>Limitar</strong> el tratamiento en determinadas circunstancias.</li>
            <li><strong>Portabilidad</strong> de sus datos en un formato estructurado.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, puede contactarnos en <strong>mcorveramadrono@gmail.com</strong>, indicando su solicitud y adjuntando copia de su documento de identidad.
          </p>
          <p>
            Asimismo, tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Este sitio web no utiliza cookies de seguimiento ni cookies publicitarias. Únicamente se utilizan cookies técnicas estrictamente necesarias para el funcionamiento del sitio.
          </p>

          <h2>9. Seguridad</h2>
          <p>
            Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
          </p>

          <h2>10. Modificaciones</h2>
          <p>
            Nos reservamos el derecho a modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de última actualización.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
