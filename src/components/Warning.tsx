import { AlertTriangle } from "lucide-react";

export const Warning = () => (
  <div className="bg-gold text-primary-foreground">
    <div className="container py-4 flex items-center justify-center gap-3 text-center">
      <AlertTriangle className="w-5 h-5 shrink-0" />
      <p className="text-xs md:text-sm font-bold uppercase tracking-wider">
        WARNING: This product contains nicotine. Nicotine is an addictive chemical. Strictly for 21 years and over.
      </p>
    </div>
  </div>
);
