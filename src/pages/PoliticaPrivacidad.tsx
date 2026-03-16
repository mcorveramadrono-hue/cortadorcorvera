import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaPrivacidad = () => {
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
          Política de Privacidad
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-foreground">

          <p className="text-sm text-muted-foreground/70">Última actualización: 16 de marzo de 2026</p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos personales recogidos a través de este sitio web es <strong>Cortador Corvera (Miguel Corvera Madroño)</strong>, con correo electrónico de contacto: <strong>mcorveramadrono@gmail.com</strong>.
          </p>

          <h2>2. Datos que recopilamos</h2>
          <p>A través de nuestros formularios de contacto y proceso de compra, recopilamos los siguientes datos personales:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nombre y apellidos</li>
            <li>DNI/NIE</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Dirección postal completa (calle, ciudad, provincia, código postal)</li>
            <li>Datos de pedido (productos seleccionados, cantidades, importes)</li>
            <li>Contenido de mensajes o notas adicionales</li>
          </ul>
          <p>
            <strong>Datos de pago:</strong> Si elige pagar con tarjeta de crédito/débito, los datos de pago son procesados directamente por <strong>Stripe, Inc.</strong> a través de su plataforma segura. En ningún momento almacenamos ni tenemos acceso a los datos completos de su tarjeta.
          </p>

          <h2>3. Finalidad del tratamiento</h2>
          <p>Los datos personales facilitados serán tratados con las siguientes finalidades:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gestionar y procesar los pedidos realizados a través de nuestra tienda online.</li>
            <li>Realizar la entrega de los productos adquiridos en la dirección indicada.</li>
            <li>Emitir facturas y documentación fiscal correspondiente.</li>
            <li>Comunicarnos con usted para informarle del estado de su pedido.</li>
            <li>Atender y gestionar las consultas o reclamaciones que nos remita.</li>
            <li>Cumplir con las obligaciones legales y fiscales aplicables.</li>
          </ul>

          <h2>4. Base legal del tratamiento</h2>
          <p>La base legal para el tratamiento de sus datos es:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Ejecución de un contrato</strong> (art. 6.1.b del RGPD): para la gestión de pedidos y la entrega de productos.</li>
            <li><strong>Consentimiento del interesado</strong> (art. 6.1.a del RGPD): otorgado al aceptar esta política al enviar formularios o realizar una compra.</li>
            <li><strong>Obligación legal</strong> (art. 6.1.c del RGPD): para el cumplimiento de obligaciones fiscales y contables.</li>
            <li><strong>Interés legítimo</strong> (art. 6.1.f del RGPD): para la atención de consultas y mejora del servicio.</li>
          </ul>

          <h2>5. Conservación de los datos</h2>
          <p>
            Los datos de pedidos y facturación se conservarán durante los plazos legalmente establecidos (mínimo 5 años conforme a la legislación fiscal y mercantil). Los datos de contacto se conservarán mientras se mantenga la relación comercial o usted no solicite su supresión.
          </p>

          <h2>6. Comunicación de datos a terceros</h2>
          <p>
            Los datos proporcionados podrán ser comunicados a los siguientes terceros en calidad de encargados del tratamiento:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Stripe, Inc.</strong>: procesamiento seguro de pagos con tarjeta de crédito/débito. Stripe cumple con los estándares PCI DSS nivel 1.</li>
            <li><strong>Formspree</strong>: servicio de gestión de formularios para notificaciones de contacto y pedidos.</li>
            <li><strong>Empresas de transporte</strong>: para la entrega de los productos adquiridos, compartiéndose nombre, dirección y teléfono del destinatario.</li>
          </ul>
          <p>No se realizarán transferencias internacionales de datos fuera del Espacio Económico Europeo, salvo las derivadas del uso de los servicios mencionados, que cuentan con las garantías adecuadas (cláusulas contractuales tipo o decisiones de adecuación).</p>

          <h2>7. Derechos del usuario</h2>
          <p>Usted tiene derecho a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Acceder</strong> a sus datos personales.</li>
            <li><strong>Rectificar</strong> los datos inexactos o incompletos.</li>
            <li><strong>Suprimir</strong> sus datos cuando ya no sean necesarios.</li>
            <li><strong>Oponerse</strong> al tratamiento de sus datos.</li>
            <li><strong>Limitar</strong> el tratamiento en determinadas circunstancias.</li>
            <li><strong>Portabilidad</strong> de sus datos en un formato estructurado.</li>
            <li><strong>Retirar el consentimiento</strong> en cualquier momento sin que ello afecte a la licitud del tratamiento previo.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, puede contactarnos en <strong>mcorveramadrono@gmail.com</strong>, indicando su solicitud y adjuntando copia de su documento de identidad.
          </p>
          <p>
            Asimismo, tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>.
          </p>

          <h2>8. Derecho de desistimiento</h2>
          <p>
            De conformidad con la normativa vigente en materia de defensa de consumidores y usuarios, el cliente dispone de un plazo de <strong>14 días naturales</strong> desde la recepción del producto para ejercer su derecho de desistimiento sin necesidad de justificación. Para ejercerlo, deberá comunicarlo por escrito a <strong>mcorveramadrono@gmail.com</strong>.
          </p>
          <p>
            Debido a la naturaleza perecedera de nuestros productos (jamones y paletas ibéricas), el derecho de desistimiento podrá verse limitado conforme al artículo 103.d) del Real Decreto Legislativo 1/2007, cuando el producto haya sido abierto o cortado.
          </p>

          <h2>9. Condiciones de compra</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Todos los precios mostrados incluyen IVA.</li>
            <li>El envío es gratuito para pedidos superiores a 20 kg. Para pedidos inferiores, los gastos de envío son de 15 €.</li>
            <li>Los pesos indicados son aproximados, pudiendo existir variaciones propias del producto natural.</li>
            <li>Los métodos de pago disponibles son tarjeta de crédito/débito (Stripe) y transferencia bancaria.</li>
            <li>En caso de transferencia bancaria, el pedido se reservará durante 5 días hábiles desde la confirmación del pedido.</li>
          </ul>

          <h2>10. Cookies</h2>
          <p>
            Este sitio web no utiliza cookies de seguimiento ni cookies publicitarias. Únicamente se utilizan cookies técnicas estrictamente necesarias para el funcionamiento del sitio y del proceso de compra.
          </p>

          <h2>11. Seguridad</h2>
          <p>
            Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado. Los pagos con tarjeta se procesan a través de la pasarela segura de Stripe, certificada con PCI DSS nivel 1.
          </p>

          <h2>12. Modificaciones</h2>
          <p>
            Nos reservamos el derecho a modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de última actualización.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;
