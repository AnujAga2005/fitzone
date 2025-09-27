import React from 'react'
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';


export const About = () => (
    <section id="about" className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
                title="ABOUT FITZONE"
                subtitle="Forging elite fitness with passion and community since 2010."
            />
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Gym Interior" className="rounded-lg shadow-2xl" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-3xl font-bold mb-4 text-red-500">Our Story</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        FitZone was born from a simple idea: to create a fitness space that feels more like a community than a gym. We believe that motivation thrives in a supportive environment, and our mission is to provide top-tier facilities, expert coaching, and a vibrant community that inspires every member to achieve their personal best.
                    </p>
                    <h3 className="text-3xl font-bold mb-4 text-red-500">Our Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                       To empower individuals to take control of their health and fitness journey by providing a world-class facility, expert guidance, and a motivating atmosphere that fosters growth, resilience, and lifelong wellness.
                    </p>
                </motion.div>
            </div>
        </div>
    </section>
);
