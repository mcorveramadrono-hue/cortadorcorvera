import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const stripePromise = loadStripe(
  "pk_live_51TBkUAGqAtdGNr4ydKtm0wjl5ubEpVB33KbyPYz9eeVSu6dpmnYfqdIsLRhJiJlmLbKG2aCDMKFbaTlqWWM27jTu00XH4A3JxM"
);

interface StripeCheckoutDialogProps {
  open: boolean;
  onClose: () => void;
  clientSecret: string;
}

const StripeCheckoutDialog = ({ open, onClose, clientSecret }: StripeCheckoutDialogProps) => {
  const options = { clientSecret };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-serif font-bold text-foreground">Pago con Tarjeta</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeCheckoutDialog;
