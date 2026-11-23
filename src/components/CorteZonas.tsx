import { useEffect, useRef, useState } from "react";
import jamonSilueta from "@/assets/jamon-1.png";
import cajaZonas from "@/assets/corvera-caja-zonas.png";

type Zona = {
  id: string;
  nombre: string;
  texto: string;
  puntos: string;
  // dirección en la que se separa la zona al cortarse
  dx: number;
  dy: number;
  etiqueta: [number, number];
};

const ZONAS: Zona[] = [
  {
    id: "maza",
    nombre: "Maza",
    texto:
      "La parte más ancha y jugosa de la pieza. Textura firme, sabor profundo y equilibrado, ligeramente dulce por su mayor infiltración de grasa.",
    puntos: "585,700 690,810 890,1050 955,1210 1020,1250 1085,1640 640,1500 520,1100 245,800",
    dx: 70,
    dy: -20,
    etiqueta: [760, 1220],
  },
  {
    id: "babilla",
    nombre: "Babilla",
    texto:
      "La cara interior, opuesta a la maza. Más magra y de fibra más fina, con un sabor suave y delicado.",
    puntos: "245,800 520,1100 640,1500 315,1615 185,1565 130,1160 115,1105",
    dx: -70,
    dy: 10,
    etiqueta: [370, 1290],
  },
  {
    id: "punta",
    nombre: "Punta",
    texto:
      "El extremo final del jamón. Textura singular y untuosa, con el sabor más concentrado de toda la pieza.",
    puntos: "640,1500 1085,1640 800,1920 295,1730 315,1615",
    dx: 0,
    dy: 70,
    etiqueta: [680, 1720],
  },
  {
    id: "jarrete",
    nombre: "Jarrete",
    texto:
      "La zona más cercana a la pezuña. Más fibrosa y veteada, de sabor intenso y aroma marcado.",
    puntos:
      "0,0 120,10 150,100 165,45 200,140 180,165 235,290 300,335 330,415 395,465 495,505 580,660 585,700 245,800 150,390",
    dx: -40,
    dy: -70,
    etiqueta: [390, 600],
  },
];

// Tramos del recorrido: intro, 4 zonas, caja
const INICIO_ZONAS = 0.14;
const TRAMO = 0.17;
const INICIO_CAJA = INICIO_ZONAS + TRAMO * ZONAS.length; // 0.82

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const CorteZonas = () => {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducido(mq.matches);
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setP(clamp(-r.top / (total || 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (reducido) {
    return (
      <section id="el-corte" className="py-20 bg-corvera-cream" aria-label="El corte por zonas">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-3">El corte</p>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-8">Un jamón, cuatro sabores</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {ZONAS.map((z) => (
              <div key={z.id} className="border border-primary/20 bg-background p-6">
                <h3 className="font-serif text-2xl text-primary mb-2">{z.nombre}</h3>
                <p className="text-muted-foreground">{z.texto}</p>
              </div>
            ))}
          </div>
          <img src={cajaZonas} alt="Caja Corvera Ibéricos con el jamón envasado por zonas y folleto explicativo" className="w-full mt-10" loading="lazy" />
          <p className="text-muted-foreground leading-relaxed mt-8">
            No solo vendemos jamón: lo cortamos a cuchillo y envasamos maza, babilla, punta y jarrete por separado, con un folleto que explica cada zona y sus diferencias. Así, cada degustación se convierte en un recorrido por la pieza.
          </p>
        </div>
      </section>
    );
  }

  // progreso por zona (0 = intacta, 1 = cortada)
  const progZona = (i: number) => clamp((p - (INICIO_ZONAS + i * TRAMO)) / (TRAMO * 0.6));
  const activa = ZONAS.findIndex((_, i) => p >= INICIO_ZONAS + i * TRAMO && p < INICIO_ZONAS + (i + 1) * TRAMO);
  const pCaja = clamp((p - INICIO_CAJA) / 0.1);
  const pIntro = clamp(p / INICIO_ZONAS);

  return (
    <section
      id="el-corte"
      ref={ref}
      className="relative bg-corvera-cream"
      style={{ height: "520vh" }}
      aria-label="El corte por zonas: maza, babilla, punta y jarrete"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full max-w-6xl mx-auto px-6 grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 items-center gap-4 md:gap-12 py-20 md:py-0">
          {/* Ilustración */}
          <div className="relative h-full max-h-[48vh] md:max-h-[80vh] flex items-center justify-center">
            <svg
              viewBox="-120 -120 1326 2160"
              className="h-full w-auto transition-opacity duration-500"
              style={{ opacity: 1 - pCaja, transform: `scale(${1 - pCaja * 0.15})` }}
              role="img"
              aria-label="Jamón dividido en sus cuatro zonas"
            >
              <defs>
                {ZONAS.map((z) => (
                  <clipPath id={`clip-${z.id}`} key={z.id}>
                    <polygon points={z.puntos} />
                  </clipPath>
                ))}
              </defs>
              {ZONAS.map((z, i) => {
                const t = progZona(i);
                const esActiva = i === activa;
                return (
                  <g
                    key={z.id}
                    style={{
                      transform: `translate(${z.dx * t}px, ${z.dy * t}px)`,
                      transition: "transform 120ms linear",
                    }}
                  >
                    <image href={jamonSilueta} width="1086" height="1920" clipPath={`url(#clip-${z.id})`} />
                    <polygon
                      points={z.puntos}
                      className="fill-primary transition-opacity duration-300"
                      style={{ opacity: esActiva ? 0.55 : t * 0.25 }}
                    />
                    <polygon
                      points={z.puntos}
                      fill="none"
                      className="stroke-background"
                      strokeWidth={6}
                      strokeDasharray="4000"
                      strokeDashoffset={4000 * (1 - t)}
                    />
                    <text
                      x={z.etiqueta[0]}
                      y={z.etiqueta[1]}
                      textAnchor="middle"
                      className="fill-background font-serif uppercase transition-opacity duration-300"
                      style={{ fontSize: 64, letterSpacing: 6, opacity: t }}
                    >
                      {z.nombre}
                    </text>
                  </g>
                );
              })}
            </svg>
            <img
              src={cajaZonas}
              alt="Caja Corvera Ibéricos con el jamón envasado por zonas y folleto explicativo"
              className="absolute inset-0 m-auto w-full max-w-xl md:max-w-none object-contain pointer-events-none"
              style={{
                opacity: pCaja,
                transform: `translateY(${(1 - pCaja) * 60}px) scale(${0.85 + pCaja * 0.15})`,
              }}
              loading="lazy"
            />
          </div>

          {/* Texto */}
          <div className="relative min-h-[220px] md:min-h-[320px]">
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{ opacity: activa === -1 && pCaja === 0 ? 1 : 0, transform: `translateY(${pIntro * -10}px)` }}
              aria-hidden={!(activa === -1 && pCaja === 0)}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-3">El corte</p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
                Un jamón, cuatro sabores
              </h2>
              <p className="text-muted-foreground md:text-lg leading-relaxed">
                No todas las partes del jamón saben igual. Por eso lo cortamos a cuchillo y lo envasamos separando cada zona. Baja para descubrirlas.
              </p>
            </div>

            {ZONAS.map((z, i) => (
              <div
                key={z.id}
                className="absolute inset-0 transition-all duration-500"
                style={{ opacity: activa === i ? 1 : 0, transform: `translateY(${activa === i ? 0 : activa > i ? -24 : 24}px)` }}
                aria-hidden={activa !== i}
              >
                <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-3">
                  Zona {i + 1} de {ZONAS.length}
                </p>
                <h3 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4">{z.nombre}</h3>
                <p className="text-muted-foreground md:text-lg leading-relaxed">{z.texto}</p>
              </div>
            ))}

            <div
              className="absolute inset-0 transition-all duration-500"
              style={{ opacity: pCaja > 0.5 ? 1 : 0, transform: `translateY(${pCaja > 0.5 ? 0 : 24}px)` }}
              aria-hidden={pCaja <= 0.5}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium mb-3">Un corte original</p>
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Cada zona, en su sobre</h3>
              <p className="text-muted-foreground md:text-lg leading-relaxed mb-6">
                No solo vendemos jamón: lo cortamos a cuchillo y envasamos maza, babilla, punta y jarrete por separado, con un folleto que explica cada zona y sus diferencias. Así, cada degustación se convierte en un recorrido por la pieza.
              </p>
              <a
                href="/tienda"
                tabIndex={pCaja > 0.5 ? 0 : -1}
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                Ver productos
              </a>
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="absolute left-0 bottom-0 h-1 bg-primary/15 w-full" aria-hidden>
          <div className="h-full bg-primary" style={{ width: `${p * 100}%` }} />
        </div>
      </div>
    </section>
  );
};

export default CorteZonas;
