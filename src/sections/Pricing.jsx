import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { ContactModal } from './ContactModal';
import { SectionHeader } from '../components/SectionHeader';

export const Pricing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');

    const plans = [
        { name: "Basic", price: "29", features: ["Gym Access", "Locker Room", "Cardio Zone", "Strength Zone"] },
        { name: "Pro", price: "49", features: ["All Basic Features", "Group Classes", "Sauna Access", "1 Personal Session/Month"], recommended: true },
        { name: "Elite", price: "79", features: ["All Pro Features", "Unlimited Personal Sessions", "Nutrition Plan", "Towel Service"] },
    ];

    const openModal = (planName) => {
        setSelectedPlan(planName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <section id="pricing" className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <SectionHeader title="MEMBERSHIP PLANS" subtitle="Choose a plan that works for you and start your journey." />
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className={`text-center h-full flex flex-col ${plan.recommended ? 'border-2 border-red-600 transform md:scale-105' : 'border-2 border-gray-300 dark:border-gray-700'}`}>
                                {plan.recommended && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>}
                                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                                <p className="text-5xl font-extrabold mb-4">${plan.price}<span className="text-lg font-normal text-gray-500 dark:text-gray-400">/mo</span></p>
                                <ul className="text-left space-y-2 mb-8 flex-grow">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center">
                                            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => openModal(plan.name)}
                                    className={`w-full py-3 px-6 font-bold rounded-lg transition duration-300 text-white ${plan.recommended ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-red-600'}`}>
                                    Contact Us
                                </button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
            <ContactModal isOpen={isModalOpen} onClose={closeModal} planName={selectedPlan} />
        </section>
    );
};
