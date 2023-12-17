import * as React from "react";
import { Override } from "framer";

export function CanvasOverride(): Override {
    React.useEffect(() => {
        // Your JavaScript code here

        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext('2d');

        // ... rest of your JavaScript code

        // Ensure to call setupCanvas and update functions
        setupCanvas();
        update(0);
        window.addEventListener("resize", setupCanvas);

        // Cleanup on component unmount
        return () => window.removeEventListener("resize", setupCanvas);
    }, []);

    return {
        // Override properties here if needed
    };
}

export function LinkOverride(): Override {
    return {
        dangerouslySetInnerHTML: { __html: `<div class="links">
            <a href="https://dev.to/uuuuuulala/coding-an-interactive-and-damn-satisfying-cursor-7-simple-steps-2kb-of-code-1c8b" target="_blank">tutorial<img class="icon" src="https://ksenia-k.com/img/icons/link.svg"></a>
        </div>` }
    };
}

export function StyleOverride(): Override {
    return {
        dangerouslySetInnerHTML: { __html: `<style>
            body, html { /* ... */ }
            .links { /* ... */ }
            a { /* ... */ }
            a img.icon { /* ... */ }
            @media (max-width: 1199px) { /* ... */ }
            @media (max-width: 809px) { /* ... */ }
        </style>` }
    };
}