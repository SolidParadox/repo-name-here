import { motion } from "framer-motion";

// Scroll In View
export default function SIV ( {children} ) {
  return ( 
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }} 
    transition={{duration: 1, type: "spring" }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
  );
};
