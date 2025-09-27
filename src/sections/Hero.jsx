import React from 'react'
import { motion } from 'framer-motion';
import { ScrollLink } from '../components/ScrollLink';

export const Hero = () => (
    <section id="home" className="relative h-screen flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-4">
            <motion.h1 
                className="text-5xl md:text-7xl font-extrabold mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                TRANSFORM YOUR BODY TODAY
            </motion.h1>
            <motion.p 
                className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto"
                 initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                Commit to be fit. Join our community and unleash the beast within. Your journey to a stronger, healthier you starts now.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <ScrollLink to="pricing" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg mr-4 transition duration-300 cursor-pointer">
                    Join Now
                </ScrollLink>
                <ScrollLink to="services" className="bg-transparent border-2 border-red-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-600 transition duration-300 cursor-pointer">
                    View Plans
                </ScrollLink>
            </motion.div>
        </div>
    </section>
);
