import { useEffect, useState } from "react";
import { toast as showToast } from "@/hooks/use-toast";
import { X, Send, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage: string;
  title: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactFormDialog = ({ isOpen, onClose, defaultMessage, title }: ContactFormDialogProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, mensaje: defaultMessage }));
      setAcceptPrivacy(false);
      setSent(false);
    }
  }, [isOpen, defaultMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nombre: formData.nombre.trim(),
      apellidos: formData.apellidos.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      mensaje: formData.mensaje.trim(),
    };

    if (!payload.nombre || !payload.apellidos || !payload.email || !payload.telefono || !payload.mensaje) {
      showToast({
        title: "Faltan datos",
        description: "Rellena todos los campos del formulario.",
        variant: "destructive",
      });
      return;
    }

    if (!EMAIL_REGEX.test(payload.email)) {
      showToast({
        title: "Email no válido",
        description: "Introduce un correo electrónico válido.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          asunto: `Solicitud web - ${title}`,
          nombre: payload.nombre,
          apellidos: payload.apellidos,
          email: payload.email,
          telefono: payload.telefono,
          mensaje: payload.mensaje,
          origen: "servicio",
        },
      });

      if (error) throw error;

      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
        setFormData({ nombre: "", apellidos: "", email: "", telefono: "", mensaje: defaultMessage });
      }, 2000);
    } catch (err: any) {
      console.error("Error sending form:", err);
      showToast({
        title: "Error al enviar",
        description: err?.message || "No se pudo enviar el mensaje. Prueba a contactarnos por WhatsApp o teléfono.",
        variant: "destructive",
        duration: 6000,
      });
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
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Nombre *</label>
                <input
                  type="text"
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
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="+34 600 000 000"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Mensaje</label>
              <textarea
                rows={4}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="privacy"
                required
                checked={acceptPrivacy}
                onChange={(e) => setAcceptPrivacy(e.target.checked)}
                className="mt-1 accent-primary"
              />
              <label htmlFor="privacy" className="text-xs text-muted-foreground leading-relaxed">
                He leído y acepto la{" "}
                <Link to="/politica-privacidad" target="_blank" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
                . *
              </label>
            </div>
            <button
              type="submit"
              disabled={sending || !acceptPrivacy}
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
