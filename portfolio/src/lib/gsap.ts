import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const reduzMovimento = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ehToque = () => window.matchMedia("(hover: none)").matches;
