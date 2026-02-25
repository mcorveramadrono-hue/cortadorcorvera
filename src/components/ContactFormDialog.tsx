import { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage: string;
  title: string;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwakaa";

const ContactFormDialog = ({ isOpen, onClose, defaultMessage, title }: ContactFormDialogProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    mensaje: defaultMessage,
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Solicitud web - ${title}`,
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
        }),
      });

      if (!res.ok) throw new Error("Formspree error");

      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
        setFormData({ nombre: "", apellidos: "", email: "", telefono: "", mensaje: defaultMessage });
      }, 2000);
    } catch (err) {
      console.error("Error sending form:", err);
      const subject = encodeURIComponent(`Solicitud web - ${title}`);
      const body = encodeURIComponent(
        `Nombre: ${formData.nombre} ${formData.apellidos}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\n\nMensaje:\n${formData.mensaje}`
      );
      window.location.href = `mailto:mcorveramadrono@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-serif text-xl font-bold text-foreground">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div className="p-12 flex flex-col items-center gap-4 text-center">
            <CheckCircle size={48} className="text-primary" />
            <p className="font-serif text-xl font-semibold text-foreground">¡Mensaje enviado!</p>
            <p className="text-sm text-muted-foreground">Nos pondremos en contacto contigo lo antes posible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Apellido/s *</label>
                <input
                  type="text"
                  required
                  value={formData.apellidos}
                  onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tus apellidos"
                />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Teléfono *</label>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="+34 600 000 000"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Mensaje</label>
              <textarea
                required
                rows={4}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send size={16} />
              {sending ? "Enviando..." : "Enviar Solicitud"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactFormDialog;
