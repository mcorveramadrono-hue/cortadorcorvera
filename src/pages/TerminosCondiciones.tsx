import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageSeo } from "@/lib/seo";

const TerminosCondiciones = () => {
  const navigate = useNavigate();
  usePageSeo({
    title: "Términos y Condiciones | Corvera Ibéricos",
    description: "Términos y condiciones de compra en Corvera Ibéricos: pedidos, envíos, pagos, devoluciones y derechos del consumidor.",
    path: "/terminos-condiciones",
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
          Términos y Condiciones de Venta
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-foreground">
          <p className="text-sm text-muted-foreground/70">Última actualización: 21 de mayo de 2026</p>

          <h2>1. Identificación del vendedor</h2>
          <p>
            <strong>Marcos Corvera Madroño (Corvera Ibéricos)</strong>, con domicilio en Madrid (España), correo electrónico <strong>corveraibericos@gmail.com</strong> y teléfono <strong>+34 676 70 30 34</strong>.
          </p>

          <h2>2. Objeto</h2>
          <p>
            Las presentes condiciones regulan la venta a distancia de productos ibéricos y la contratación de servicios de cortador profesional a través del sitio web www.corveraibericos.com.
          </p>

          <h2>3. Productos y precios</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Todos los precios están expresados en euros (€) e incluyen el IVA aplicable.</li>
            <li>Los pesos indicados de jamones, paletas y otros productos son aproximados, ya que se trata de productos naturales sujetos a variaciones.</li>
            <li>El titular se reserva el derecho a modificar los precios en cualquier momento, aplicándose el precio vigente en el momento de la confirmación del pedido.</li>
          </ul>

          <h2>4. Proceso de compra</h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Selección de productos y añadir al carrito.</li>
            <li>Cumplimentación de los datos de envío y facturación.</li>
            <li>Selección del método de pago.</li>
            <li>Aceptación expresa de la Política de Privacidad y de las presentes condiciones.</li>
            <li>Confirmación del pedido y recepción del email de confirmación.</li>
          </ol>

          <h2>5. Métodos de pago</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Tarjeta de crédito/débito</strong> (incluidos Apple Pay y Google Pay) a través de Stripe (procesamiento seguro PCI DSS nivel 1).</li>
            <li><strong>Transferencia bancaria:</strong> el pedido se reservará durante 5 días hábiles hasta la recepción del importe.</li>
            <li><strong>Bizum:</strong> el pedido se reservará durante 5 días hábiles hasta la recepción del importe.</li>
          </ul>

          <h2>6. Envíos y plazos de entrega</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Envío gratuito para pedidos superiores a 20 kg. Para pedidos inferiores, los gastos de envío son de 5 €.</li>
            <li>Los envíos se realizan únicamente a la Península Ibérica (España peninsular y Portugal continental). Para envíos a Baleares, Canarias, Ceuta, Melilla u otros destinos, contacte previamente.</li>
            <li>El plazo habitual de entrega es de 24 a 72 horas hábiles desde la confirmación del pago.</li>
            <li>Los plazos pueden verse afectados por causas ajenas (festivos, condiciones meteorológicas, transportista, etc.).</li>
          </ul>

          <h2>7. Derecho de desistimiento</h2>
          <p>
            El consumidor dispone de <strong>14 días naturales</strong> desde la recepción del pedido para desistir del contrato sin necesidad de justificación, conforme al Real Decreto Legislativo 1/2007.
          </p>
          <p>
            Para ejercerlo, deberá comunicarlo por escrito a <strong>corveraibericos@gmail.com</strong> indicando número de pedido y datos de contacto. El reembolso se efectuará por el mismo medio de pago utilizado, una vez recibido el producto en perfecto estado y sin abrir.
          </p>
          <p>
            <strong>Excepciones:</strong> conforme al artículo 103.d) del citado Real Decreto, no procederá el desistimiento en productos perecederos abiertos, cortados, loncheados o que por su naturaleza no puedan ser devueltos. Los gastos de devolución correrán a cargo del cliente, salvo defecto del producto.
          </p>

          <h2>8. Garantía y reclamaciones</h2>
          <p>
            Conforme a la normativa de consumidores y usuarios, los productos están sujetos a la garantía legal aplicable. Cualquier incidencia con el pedido debe comunicarse en un plazo máximo de 24 horas desde la recepción, aportando fotografías y descripción del problema a <strong>corveraibericos@gmail.com</strong>.
          </p>
          <p>
            Existen hojas de reclamaciones a disposición del consumidor. Asimismo, puede acudir a la plataforma europea de resolución de litigios en línea:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://ec.europa.eu/consumers/odr
            </a>.
          </p>

          <h2>9. Servicios de cortador profesional y eventos</h2>
          <p>
            La contratación de servicios de corte de jamón para eventos, catering y servicios a domicilio se regirá por el presupuesto particular acordado con el cliente. La confirmación de reserva podrá requerir el abono de una señal.
          </p>

          <h2>10. Cancelaciones</h2>
          <p>
            El cliente podrá cancelar el pedido antes de su preparación sin coste. Una vez preparado o enviado, aplicará el procedimiento de desistimiento descrito en el punto 7.
          </p>

          <h2>11. Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier controversia serán competentes los Juzgados y Tribunales del domicilio del consumidor.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerminosCondiciones;
