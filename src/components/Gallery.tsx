import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
import gallery12 from "@/assets/gallery/gallery-12.jpeg";
import gallery13 from "@/assets/gallery/gallery-13.jpeg";

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
  { src: gallery12, alt: "Plato de jamón ibérico cortado a cuchillo en un evento con tomates y pan" },
  { src: gallery13, alt: "Jamón ibérico en jamonera preparado para corte en un evento junto al río" },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeImage = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % images.length);
  };
  const goPrev = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="galeria" className="py-20 bg-corvera-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Galería
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            El arte del corte en cada lámina. Descubre la pasión y precisión que ponemos en cada plato.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="max-w-6xl mx-auto px-14 md:px-16"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div
                  className="cursor-pointer group overflow-hidden rounded-lg aspect-square"
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="default" aria-label="Foto anterior" title="Foto anterior" className="left-0 z-10 h-11 w-11 border border-primary [&_svg]:size-6" />
          <CarouselNext variant="default" aria-label="Foto siguiente" title="Foto siguiente" className="right-0 z-10 h-11 w-11 border border-primary [&_svg]:size-6" />
        </Carousel>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeImage}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-background flex items-center justify-center">
          {selectedIndex !== null && (
            <>
              <Button size="icon"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Imagen anterior"
                title="Imagen anterior"
                className="absolute left-2 md:left-4 z-10 h-11 w-11 rounded-full [&_svg]:size-6"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </Button>
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <Button size="icon"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Imagen siguiente"
                title="Imagen siguiente"
                className="absolute right-2 md:right-4 z-10 h-11 w-11 rounded-full [&_svg]:size-6"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
