import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect as uE } from "react";
import L from "@studio-freight/lenis";
export function SmoothScrollOverride() {
  return function (p) {
    uE(() => {
      const l = new L({
        // ---------------------------------------------------
        // Modify these settings to change the scroll settings
        duration: 1.75,
        smoothTouch: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.75,
        autoResize: true
      });
      function raf(t) {
        l.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }, []);
    return /*#__PURE__*/_jsx("div", {
      ...p,
      children: p.children
    });
  };
}
export function InfiniteScrollOverride() {
  return function (p) {
    uE(() => {
      const l = new L({
        // ---------------------------------------------------
        // Modify these settings to change the scroll settings
        infinite: true,
        duration: 1.75,
        smoothTouch: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.75,
        autoResize: true
      });
      function raf(t) {
        l.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }, []);
    return /*#__PURE__*/_jsx("div", {
      ...p,
      children: p.children
    });
  };
}
export const __FramerMetadata__ = {
  "exports": {
    "InfiniteScrollOverride": {
      "type": "reactHoc",
      "name": "InfiniteScrollOverride",
      "annotations": {
        "framerContractVersion": "1"
      }
    },
    "SmoothScrollOverride": {
      "type": "reactHoc",
      "name": "SmoothScrollOverride",
      "annotations": {
        "framerContractVersion": "1"
      }
    },
    "__FramerMetadata__": {
      "type": "variable"
    }
  }
};
//# sourceMappingURL=./Smooth_Infinite_Obfs.map