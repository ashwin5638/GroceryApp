import { motion } from 'motion/react'
import { EASE } from '../../lib/motion'


const Reveal = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, ease: EASE }}
  >
    {children}
  </motion.div>
)

export default Reveal