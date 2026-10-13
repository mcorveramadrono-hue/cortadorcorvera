import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageSeo } from "@/lib/seo";

const PoliticaDevoluciones = () => {
  const navigate = useNavigate();
  usePageSeo({
    title: "Devoluciones y Reembolsos | Corvera Ibéricos",
    description: "Política de devoluciones, desistimiento y reembolsos de Corvera Ibéricos: plazos, excepciones para productos perecederos y formulario de desistimiento.",
    path: "/politica-devoluciones",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al inicio
        </button>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Política de Devoluciones y Reembolsos
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 [&_h2]:text-foreground [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-foreground">
          <p className="text-sm">Última actualización: 13 de octubre de 2026</p>

          <h2>1. Derecho de desistimiento (14 días)</h2>
          <p>
            Conforme a los artículos 102 a 108 del Real Decreto Legislativo 1/2007 (Ley General para la Defensa de los Consumidores y Usuarios), si eres consumidor dispones de <strong>14 días naturales</strong> desde que recibes el pedido para desistir de la compra sin dar ninguna explicación.
          </p>

          <h2>2. Productos que no admiten desistimiento</h2>
          <p>Según el artículo 103 de la misma ley, no se aplica el derecho de desistimiento a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Productos <strong>cortados a cuchillo, loncheados o deshuesados</strong> a petición del cliente (confeccionados según sus especificaciones).</li>
            <li>Productos <strong>perecederos</strong> o que puedan deteriorarse con rapidez.</li>
            <li>Productos <strong>precintados o envasados al vacío</strong> que, por razones de higiene, hayan sido desprecintados o abiertos tras la entrega.</li>
          </ul>
          <p>Las piezas enteras sin abrir y en su embalaje original sí pueden devolverse dentro del plazo.</p>

          <h2>3. Cómo devolver un producto</h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Escríbenos a <strong>corveraibericos@gmail.com</strong> indicando tu número de pedido y tu decisión de desistir. Puedes usar el formulario del punto 6 (no es obligatorio).</li>
            <li>Te indicaremos cómo y dónde enviar el producto. Debes devolverlo en un plazo máximo de 14 días naturales desde que nos comunicas el desistimiento.</li>
            <li>Los gastos directos de devolución corren a tu cargo, salvo que el producto llegue defectuoso o no corresponda con el pedido.</li>
          </ol>

          <h2>4. Reembolso</h2>
          <p>
            Te devolveremos todos los pagos recibidos, incluidos los gastos de envío estándar, en un plazo máximo de <strong>14 días naturales</strong> desde que nos comunicas el desistimiento. Podemos retener el reembolso hasta recibir el producto o hasta que nos acredites que lo has enviado. El reembolso se hará por el mismo medio de pago que usaste (tarjeta, transferencia o Bizum), sin coste para ti.
          </p>

          <h2>5. Productos defectuosos o dañados</h2>
          <p>
            Si el producto llega dañado, en mal estado o no corresponde con tu pedido, comunícanoslo lo antes posible a <strong>corveraibericos@gmail.com</strong> o al <strong>+34 676 70 30 34</strong>, con fotografías. Te ofreceremos la sustitución o el reembolso completo, incluidos los gastos de envío. Esto no limita la garantía legal de conformidad que te reconoce la ley (artículos 114 y siguientes del RDL 1/2007).
          </p>

          <h2>6. Modelo de formulario de desistimiento</h2>
          <div className="border border-border p-4 text-sm space-y-2">
            <p>A la atención de Marcos Corvera Madroño (Corvera Ibéricos), Madrid, España — corveraibericos@gmail.com:</p>
            <p>Por la presente le comunico que desisto de mi contrato de venta del siguiente bien: ______</p>
            <p>Pedido el / recibido el: ______</p>
            <p>Número de pedido: ______</p>
            <p>Nombre del consumidor: ______</p>
            <p>Domicilio del consumidor: ______</p>
            <p>Firma (solo si se envía en papel) y fecha: ______</p>
          </div>

          <h2>7. Servicios de cortador y eventos</h2>
          <p>
            Las cancelaciones de servicios de cortador profesional se rigen por las condiciones del presupuesto aceptado. Al tratarse de servicios en una fecha concreta, no se aplica el derecho de desistimiento (artículo 103.l del RDL 1/2007).
          </p>

          <h2>8. Reclamaciones</h2>
          <p>
            Tienes a tu disposición hojas de reclamaciones. También puedes acudir a las oficinas de consumo de tu comunidad autónoma o a la Junta Arbitral de Consumo.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaDevoluciones;
