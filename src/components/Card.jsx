import React from 'react'
import { motion } from 'framer-motion';


    export const Card = ({ children, className }) => (
        <motion.div
            className={`bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-red-500/20 transition-shadow duration-300 ${className}`}
            whileHover={{ translateY: -5 }}
        >
            {children}
        </motion.div>
    );

