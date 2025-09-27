import React from 'react'
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';

export const Services = () => {
    const services = [
        { title: "Personal Training", description: "One-on-one sessions with certified trainers to create a plan tailored to your goals." },
        { title: "Group Classes", description: "From HIIT to Yoga, join high-energy group classes that make fitness fun." },
        { title: "Strength Training", description: "Access our state-of-the-art weight room with free weights, machines, and power racks." },
        { title: "Cardio Zone", description: "Get your heart pumping with our extensive range of treadmills, ellipticals, and bikes." },
        { title: "Nutrition Coaching", description: "Expert advice to complement your training and help you achieve your goals faster." },
        { title: "Online Coaching", description: "Train with us from anywhere in the world with our virtual coaching programs." },
    ];
    
    return (
        <section id="services" className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="OUR SERVICES"
                    subtitle="We offer a wide range of services to help you reach your fitness goals."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="text-center h-full">
                                <h3 className="text-2xl font-bold mb-4 text-red-500">{service.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
