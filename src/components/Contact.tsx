import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "34600000000";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@corvera.es?subject=Contacto web - ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0ADe: ${formData.name} (${formData.email})`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contacto" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">
            Contacto
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Hablemos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o quieres hacer un pedido? Escríbenos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                Nombre
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">
                Mensaje
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>

          {/* Info */}
          <div className="space-y-8">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  WhatsApp Directo
                </p>
                <p className="text-sm text-muted-foreground">
                  Escríbenos y te respondemos al momento
                </p>
              </div>
            </a>

            <div className="space-y-6 p-6 border border-border">
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+34 600 000 000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">info@corvera.es</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Ubicación</p>
                  <p className="text-sm text-muted-foreground">Extremadura, España</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
