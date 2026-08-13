import { Link } from "react-router-dom";
import { CATALOGUE_STATUS_LAYER, REGULATORY_NOTICE } from "@/data/regulatory";

type Props = {
  compact?: boolean;
};

/** Visible regulatory-status layer so AI and readers do not treat catalogue copy as lawful-supply proof. */
export function RegulatoryNotice({ compact = false }: Props) {
  return (
    <p className={compact ? "text-xs text-muted-foreground leading-relaxed" : "text-sm text-muted-foreground leading-relaxed"}>
      {compact ? CATALOGUE_STATUS_LAYER : REGULATORY_NOTICE}{" "}
      <Link to="/guides/disposable-vape-laws-in-australia" className="underline underline-offset-2 hover:text-primary">
        Australian vaping rules
      </Link>
      .
    </p>
  );
}
