import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';

export const Contact = () => {
    const [formStatus, setFormStatus] = useState('');

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');

    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
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
            setFormStatus('Message Sent!');
            e.target.reset();
            setTimeout(() => setFormStatus(''), 3000);
        } else {
            console.error('Submission Error:', result);
            setFormStatus('Error!');
        }
    } catch (error) {
        console.error('Failed to send message:', error);
        setFormStatus('Error!');
    }
};

    return (
        <section id="contact" className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="CONTACT US" subtitle="Have questions? Get in touch with us today." />
                <div className="grid md:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card>
                            <h3 className="text-3xl font-bold mb-6 text-red-500">Send a Message</h3>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <input name="name" type="text" placeholder="Your Name" required className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                                </div>
                                <div className="mb-4">
                                    <input name="email" type="email" placeholder="Your Email" required className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                                </div>
                                <div className="mb-4">
                                   <textarea name="message" placeholder="Your message..." rows="4" required className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                                </div>
                                <button type="submit" disabled={formStatus === 'Sending...'} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:bg-gray-400">
                                    {formStatus || 'Submit'}
                                </button>
                                {formStatus === 'Message Sent!' && <p className="text-center mt-4 text-green-500">Message Sent Successfully!</p>}
                                {formStatus === 'Error!' && <p className="text-center mt-4 text-red-500">Something went wrong. Please try again.</p>}
                            </form>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="space-y-6">
                             <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Our Location</h3>
                             <div className="h-64 rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225969562944!2d144.9537353159042!3d-37.81720997975207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620853580547!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Gym Location"
                                ></iframe>
                            </div>
                            <p><strong>Address:</strong> 123 Fitness St, Workout City, 90210</p>
                            <p><strong>Phone:</strong> (123) 456-7890</p>
                            <p><strong>Email:</strong> contact@fitzone.com</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
