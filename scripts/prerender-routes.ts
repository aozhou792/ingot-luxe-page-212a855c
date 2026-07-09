import { getIndexablePaths } from "../src/data/site-routes.ts";

/** Public indexable routes from src/data/site-routes.ts (single source of truth). */
export function getPrerenderRoutes(): string[] {
  return getIndexablePaths();
}
