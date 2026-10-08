import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface ScrollRevealProps extends BoxProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  ...rest
}: ScrollRevealProps) {
  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <Box
      component={motion.div}
      initial={{
        opacity: 0,
        ...offsets[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
export default ScrollReveal;
