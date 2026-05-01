import { motion } from "framer-motion";

export default function TypeReveal({ text, className = "", style = {}, stagger = 0.012 }) {
  if (!text) return null;
  const words = text.split(/(\s+)/);
  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}
