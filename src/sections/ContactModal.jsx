import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from '../Icons/Icons';



export const ContactModal = ({ isOpen, onClose, planName }) => {
    const [formStatus, setFormStatus] = useState('');

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');

    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
        planName: planName,
        access_key: '385d3253-8ccc-4002-87c8-091439a85b08' // <-- PASTE YOUR KEY HERE
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.success) {
            setFormStatus('Sent!');
            e.target.reset();
            setTimeout(() => {
                onClose();
                setFormStatus('');
            }, 2000);
        } else {
            console.error('Submission Error:', result);
            setFormStatus('Error!');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        setFormStatus('Error!');
    }
};
    
    if (!isOpen) return null;

    return (
        <AnimatePresence>
             <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500">
                        <CloseIcon />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You've selected the <span className="font-bold text-red-500">{planName}</span> plan. Please fill out your details below.</p>
                     {formStatus === 'Sent!' ? (
                        <div className="text-center py-10">
                            <p className="text-2xl font-bold text-green-500">Thank You!</p>
                            <p className="text-gray-600 dark:text-gray-400">Your request has been sent.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="modal_name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                <input id="modal_name" name="name" type="text" placeholder="Your Name" required className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="modal_email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input id="modal_email" name="email" type="email" placeholder="Your Email" required className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="modal_message" className="block text-gray-700 dark:text-gray-300 mb-2">Message (Optional)</label>
                                <textarea id="modal_message" name="message" placeholder="Any questions?" rows="3" className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                            </div>
                            <button type="submit" disabled={formStatus === 'Sending...'} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:bg-gray-400">
                                {formStatus || 'Send Message'}
                            </button>
                            {formStatus === 'Error!' && <p className="text-center mt-4 text-red-500">Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
