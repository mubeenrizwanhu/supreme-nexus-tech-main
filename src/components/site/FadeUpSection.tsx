import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeUpSection({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.15,
          },
        },
        hidden: { opacity: 0, y: 20 },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function FadeUpItem({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
        hidden: { opacity: 0, y: 15 },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
