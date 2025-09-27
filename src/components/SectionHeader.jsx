import React from 'react'
import { motion } from 'framer-motion';

export const SectionHeader = ({ title, subtitle }) => (
    <motion.div
       className="text-center mb-12"
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, amount: 0.5 }}
       transition={{ duration: 0.5 }}
   >
       <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{title}</h2>
       <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
       <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
   </motion.div>
);
