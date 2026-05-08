/** Passed when opening a product from home — preserves scroll for Back to home only. */
export type ProductLocationState = {
  homeScrollY?: number;
};

/** Only set on the Back to home link so Index restores scroll (not for other / navigations). */
export type HomeRestoreState = {
  homeScrollY: number;
  restoreHomeScroll: true;
};
