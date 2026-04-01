import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "34676703034";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", telefono: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.telefono || !payload.message) {
      toast({
        title: "Faltan datos",
        description: "Revisa que nombre, email, teléfono y mensaje estén completos.",
        variant: "destructive",
      });
      return;
    }

    if (!EMAIL_REGEX.test(payload.email)) {
      toast({
        title: "Email no válido",
        description: "Introduce un email correcto para poder enviarte respuesta.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          asunto: `Contacto web - ${payload.name}`,
          nombre: payload.name,
          email: payload.email,
          telefono: payload.telefono,
          mensaje: payload.message,
          origen: "contacto",
        },
      });

      if (error) throw error;

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ name: "", email: "", telefono: "", message: "" });
      }, 3000);
    } catch (err: any) {
      console.error("Error sending form:", err);
      toast({
        title: "Error al enviar",
        description: err?.message || "No se pudo enviar el mensaje. Prueba por WhatsApp o teléfono.",
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] uppercase text-primary font-medium">Contacto</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Hablemos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o quieres hacer un pedido? Escríbenos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <CheckCircle size={48} className="text-primary" />
              <p className="font-serif text-xl font-semibold text-foreground">¡Gracias por tu mensaje!</p>
              <p className="text-sm text-muted-foreground">Te responderemos lo antes posible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <label className="text-sm tracking-widest uppercase text-muted-foreground block mb-2">Mensaje</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
                {sending ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          )}

          <div className="space-y-8">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-primary-foreground" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">WhatsApp Directo</p>
                <p className="text-sm text-muted-foreground">Escríbenos y te respondemos al momento</p>
              </div>
            </a>

            <div className="space-y-6 p-6 border border-border">
              <a href="tel:+34676703034" className="flex items-start gap-4 group">
                <Phone size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+34 676 703 034</p>
                </div>
              </a>
              <a href="mailto:mcorveramadrono@gmail.com" className="flex items-start gap-4 group">
                <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Email</p>
                  <p className="text-sm text-muted-foreground">mcorveramadrono@gmail.com</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Ubicación</p>
                  <p className="text-sm text-muted-foreground">Madrid</p>
                </div>
              </div>
              <a href="instagram://user?username=corveraibericos" onClick={() => { setTimeout(() => { window.open('https://www.instagram.com/corveraibericos/', '_blank'); }, 500); }} className="flex items-start gap-4 group">
                <Instagram size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Instagram</p>
                  <p className="text-sm text-muted-foreground">@corveraibericos</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
