import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import gallery1 from "@/assets/gallery/gallery-1.jpeg";
import gallery2 from "@/assets/gallery/gallery-2.jpeg";
import gallery3 from "@/assets/gallery/gallery-3.jpeg";
import gallery4 from "@/assets/gallery/gallery-4.jpeg";
import gallery5 from "@/assets/gallery/gallery-5.jpeg";
import gallery6 from "@/assets/gallery/gallery-6.jpeg";
import gallery7 from "@/assets/gallery/gallery-7.jpeg";
import gallery8 from "@/assets/gallery/gallery-8.jpeg";
import gallery9 from "@/assets/gallery/gallery-9.jpeg";
import gallery10 from "@/assets/gallery/gallery-10.jpeg";
import gallery11 from "@/assets/gallery/gallery-11.jpeg";

const images = [
  { src: gallery1, alt: "Plato de jamón ibérico cortado a mano" },
  { src: gallery2, alt: "Detalle de corte de jamón ibérico" },
  { src: gallery3, alt: "Dos platos de jamón ibérico" },
  { src: gallery4, alt: "Plato de jamón con rosa de grasa" },
  { src: gallery5, alt: "Presentación elegante de jamón ibérico" },
  { src: gallery6, alt: "Plato de jamón ibérico con flor central" },
  { src: gallery7, alt: "Detalle de rosa de jamón" },
  { src: gallery8, alt: "Rosa de grasa sobre corte de jamón" },
  { src: gallery9, alt: "Cortador profesional en acción" },
  { src: gallery10, alt: "Corte de jamón en blanco y negro" },
  { src: gallery11, alt: "Lámina de jamón ibérico en cuchillo" },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Galería
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            El arte del corte en cada lámina. Descubre la pasión y precisión que ponemos en cada plato.
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid cursor-pointer group overflow-hidden rounded-lg"
              onClick={() => openImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeImage}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-black/95 flex items-center justify-center">
          {selectedIndex !== null && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 md:left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-[85vh] object-contain"
              />

              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 md:right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
