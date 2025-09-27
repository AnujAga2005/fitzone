import React from 'react'
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import ins1 from '../../assets/ins1.png';
import ins2 from '../../assets/ins2.png';
import ins3 from '../../assets/ins3.png';

export const Trainers = () => {
    const trainers = [
        { name: "John Doe", specialty: "Strength & Conditioning", img:ins3 },
        { name: "Jane Smith", specialty: "Yoga & Flexibility", img: ins2},
        { name: "Mike Johnson", specialty: "HIIT & CrossFit", img: ins1 },
    ];
    
    return (
        <section id="trainers" className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="MEET OUR TRAINERS" subtitle="Our certified trainers are here to guide you every step of the way." />
                <div className="grid md:grid-cols-3 gap-8">
                    {trainers.map((trainer, index) => (
                         <motion.div
                            key={trainer.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <Card className="text-center overflow-hidden">
                                <img src={trainer.img} alt={trainer.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-600" />
                                <h3 className="text-2xl font-bold">{trainer.name}</h3>
                                <p className="text-red-500 font-semibold">{trainer.specialty}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
