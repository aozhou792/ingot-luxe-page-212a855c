import { useEffect } from "react";

function revealAll(root: ParentNode = document) {
  root.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
    el.classList.add("in-view");
  });
}

export function useReveal() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );

    const observeReveal = (root: ParentNode = document) => {
      root.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };

    observeReveal();

    // Above-the-fold elements can miss the first IO callback during hydration; force-check once.
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("in-view");
          io.unobserve(el);
        }
      });
    });

    // Hard failsafe so content never stays invisible if IO stalls.
    const failsafe = window.setTimeout(() => revealAll(), 1200);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            observeReveal(node);
          }
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
