import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// --- THEME CONTEXT & PROVIDER ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

// --- HELPER COMPONENTS & ICONS ---

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Card = ({ children, className }) => (
    <motion.div
        className={`bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-red-500/20 transition-shadow duration-300 ${className}`}
        whileHover={{ translateY: -5 }}
    >
        {children}
    </motion.div>
);

const SectionHeader = ({ title, subtitle }) => (
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

const ScrollLink = ({ to, children, className, onClick, offset = -70 }) => {
    const handleClick = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById(to);
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <a href={`#${to}`} onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

const ContactModal = ({ isOpen, onClose, planName }) => {
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

// --- WEBSITE SECTIONS ---

const Navbar = ({navLinks}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map(link => document.getElementById(link.toLowerCase().replace(/ /g, "")));
            let current = 'home';
            sections.forEach(section => {
                if (section) {
                    const sectionTop = section.offsetTop - 80;
                    if (window.scrollY >= sectionTop) {
                        current = section.id;
                    }
                }
            });
            setActiveLink(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navLinks]);

    const handleLinkClick = (link) => {
        setActiveLink(link.toLowerCase().replace(/ /g, ""));
        setIsOpen(false);
    };

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FIT<span className="text-red-600">ZONE</span></h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navLinks.map(link => (
                                <ScrollLink
                                    key={link}
                                    to={link.toLowerCase().replace(/ /g, "")}
                                    onClick={() => handleLinkClick(link)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${activeLink === link.toLowerCase().replace(/ /g, "") ? 'text-red-500 font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                >
                                    {link}
                                </ScrollLink>
                            ))}
                            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                            </button>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleTheme} className="p-2 mr-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                           {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-white focus:outline-none">
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900">
                            {navLinks.map(link => (
                                <ScrollLink
                                    key={link}
                                    to={link.toLowerCase().replace(/ /g, "")}
                                    onClick={() => handleLinkClick(link)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${activeLink === link.toLowerCase().replace(/ /g, "") ? 'text-red-500 bg-gray-100 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    {link}
                                </ScrollLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = () => (
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

const About = () => (
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

const Services = () => {
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

const Schedule = () => {
    const scheduleData = {
        Monday: [{ time: "6am-7am", class: "HIIT" }, { time: "6pm-7pm", class: "Powerlifting" }],
        Tuesday: [{ time: "7am-8am", class: "Yoga" }, { time: "5pm-6pm", class: "CrossFit" }],
        Wednesday: [{ time: "6am-7am", class: "Cycling" }, { time: "6pm-7pm", class: "Zumba" }],
        Thursday: [{ time: "7am-8am", class: "Yoga" }, { time: "7pm-8pm", class: "HIIT" }],
        Friday: [{ time: "6am-7am", class: "Boxing" }, { time: "5pm-6pm", class: "CrossFit" }],
        Saturday: [{ time: "9am-10am", class: "Powerlifting" }, { time: "11am-12pm", class: "Cycling" }],
        Sunday: [{ time: "10am-11am", class: "Yoga" }, { time: "4pm-5pm", class: "Open Gym" }],
    };

    return (
        <section id="schedule" className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="CLASS SCHEDULE" subtitle="Find a class that fits your schedule and push your limits." />
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 min-w-[700px] md:min-w-full">
                        {Object.entries(scheduleData).map(([day, classes]) => (
                            <div key={day} className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4">
                                <h3 className="text-xl font-bold text-center text-red-500 mb-4">{day}</h3>
                                <div className="space-y-4">
                                    {classes.map((item, index) => (
                                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-center">
                                            <p className="font-semibold">{item.class}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Trainers = () => {
    const trainers = [
        { name: "John Doe", specialty: "Strength & Conditioning", img: "../ins3.png" },
        { name: "Jane Smith", specialty: "Yoga & Flexibility", img: "../ins2.png" },
        { name: "Mike Johnson", specialty: "HIIT & CrossFit", img: "../ins1.png" },
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

const Pricing = () => {
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

const BMICalculatorResult = ({ bmi, message, age }) => {
    if (!bmi) return null;

    const minBmi = 15;
    const maxBmi = 40;
    const bmiRange = maxBmi - minBmi;

    const getPosition = (bmiValue) => {
        const clampedBmi = Math.max(minBmi, Math.min(bmiValue, maxBmi));
        const percentage = ((clampedBmi - minBmi) / bmiRange) * 100;
        return percentage;
    };

    const position = getPosition(bmi);

    return (
        <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {age && age < 20 && (
                <p className="text-sm text-yellow-500 mb-4">
                    Note: Standard BMI categories are for adults age 20 and over. Consult a healthcare provider for children and teens.
                </p>
            )}
            <p className="text-2xl">Your BMI is</p>
            <p className="text-6xl font-extrabold text-red-500 my-2">{bmi}</p>
            <p className="text-2xl font-semibold">{message}</p>

            <div className="w-full max-w-lg mx-auto mt-6">
                <div className="relative">
                    <div className="flex rounded-full overflow-hidden h-3 bg-gray-300 dark:bg-gray-700">
                        <div style={{ width: '14%' }} className="bg-blue-400" title="Underweight (BMI < 18.5)"></div>
                        <div style={{ width: '26%' }} className="bg-green-400" title="Normal (BMI 18.5-24.9)"></div>
                        <div style={{ width: '20%' }} className="bg-yellow-400" title="Overweight (BMI 25-29.9)"></div>
                        <div style={{ width: '40%' }} className="bg-red-400" title="Obese (BMI > 30)"></div>
                    </div>
                    <div className="absolute -bottom-2 transition-all duration-500" style={{ left: `${position}%`, transform: 'translateX(-50%)', top: '100%' }}>
                        <div className="w-0 h-0 
                            border-l-8 border-l-transparent
                            border-r-8 border-r-transparent
                            border-t-8 border-t-gray-900 dark:border-t-white">
                        </div>
                    </div>
                </div>
                <div className="flex justify-between text-xs mt-3 text-gray-600 dark:text-gray-400">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                </div>
            </div>
        </motion.div>
    );
};

const BMICalculator = () => {
    const [weightUnit, setWeightUnit] = useState('kg');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [age, setAge] = useState('');
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');

    const resetValues = () => {
        setWeight('');
        setHeight('');
        setHeightFt('');
        setHeightIn('');
        setAge('');
        setBmi(null);
        setMessage('');
    };
    
    const handleWeightUnitChange = (unit) => {
        setWeightUnit(unit);
        resetValues();
    };

    const handleHeightUnitChange = (unit) => {
        setHeightUnit(unit);
        resetValues();
    }

    const calculateBmi = (e) => {
        e.preventDefault();
        
        if (!age || age <= 0 || age > 120) {
            setMessage('Please enter a valid age.'); setBmi(null); return;
        }

        let weightInKg;
        if (weightUnit === 'kg') {
            if (!weight || weight <= 0) {
                setMessage('Please enter a valid weight.'); setBmi(null); return;
            }
            weightInKg = parseFloat(weight);
        } else {
            if (!weight || weight <= 0) {
                setMessage('Please enter a valid weight.'); setBmi(null); return;
            }
            weightInKg = parseFloat(weight) / 2.20462;
        }

        let heightInM;
        if (heightUnit === 'cm') {
            if (!height || height <= 0) {
                setMessage('Please enter a valid height.'); setBmi(null); return;
            }
            heightInM = parseFloat(height) / 100;
        } else {
            if (!heightFt || heightFt < 0) {
                setMessage('Please enter a valid height in feet.'); setBmi(null); return;
            }
            const totalInches = (parseFloat(heightFt) * 12) + (parseFloat(heightIn) || 0);
             if (totalInches <= 0) {
                setMessage('Please enter a valid height.'); setBmi(null); return;
            }
            heightInM = totalInches * 0.0254;
        }

        if (isNaN(weightInKg) || isNaN(heightInM) || heightInM === 0) {
             setMessage('Please enter valid numbers.'); setBmi(null); return;
        }
        
        const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(1);
        setBmi(bmiValue);

        if (bmiValue < 18.5) setMessage('Underweight');
        else if (bmiValue < 25) setMessage('Normal weight');
        else if (bmiValue < 30) setMessage('Overweight');
        else setMessage('Obese');
    };
    
    const UnitButton = ({ value, label, currentUnit, setUnit }) => (
         <button 
            type="button"
            onClick={() => setUnit(value)}
            className={`px-4 py-2 w-20 text-center rounded-md font-semibold transition-colors ${currentUnit === value ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
        >
            {label}
        </button>
    );

    return (
        <section id="bmicalculator" className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="BMI CALCULATOR" subtitle="Check your Body Mass Index to get a quick snapshot of your health." />
                <Card>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col items-center">
                            <label className="mb-2 font-semibold">Weight Unit</label>
                            <div className="flex space-x-2 p-1 bg-gray-300 dark:bg-gray-600 rounded-lg">
                               <UnitButton value="kg" label="kg" currentUnit={weightUnit} setUnit={handleWeightUnitChange} />
                               <UnitButton value="lbs" label="lbs" currentUnit={weightUnit} setUnit={handleWeightUnitChange} />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <label className="mb-2 font-semibold">Height Unit</label>
                            <div className="flex space-x-2 p-1 bg-gray-300 dark:bg-gray-600 rounded-lg">
                               <UnitButton value="cm" label="cm" currentUnit={heightUnit} setUnit={handleHeightUnitChange} />
                               <UnitButton value="ft" label="ft" currentUnit={heightUnit} setUnit={handleHeightUnitChange} />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={calculateBmi}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label htmlFor="weight" className="mb-2 font-semibold block">Weight ({weightUnit})</label>
                                <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={weightUnit === 'kg' ? 'e.g., 70' : 'e.g., 155'} />
                            </div>
                             <div>
                                <label htmlFor="age" className="mb-2 font-semibold block">Age</label>
                                <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., 25" />
                            </div>
                            <div>
                                <label htmlFor="height" className="mb-2 font-semibold block">Height ({heightUnit === 'cm' ? 'cm' : 'ft, in'})</label>
                                {heightUnit === 'cm' ? (
                                    <input type="number" id="height" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., 175" />
                                ) : (
                                    <div className="flex space-x-2">
                                        <input type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} className="w-1/2 p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="ft" />
                                        <input type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} className="w-1/2 p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="in" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 h-[50px]">Calculate</button>
                    </form>
                    <BMICalculatorResult bmi={bmi} message={message} age={age} />
                </Card>
            </div>
        </section>
    );
};

const Contact = () => {
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

const Footer = () => (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">FIT<span className="text-red-600">ZONE</span></h2>
            <p className="mb-4">Your ultimate fitness partner.</p>
            <p>&copy; {new Date().getFullYear()} FitZone. All Rights Reserved.</p>
        </div>
    </footer>
);

// --- Main App Component ---
function AppContent() {
    const navLinks = ["Home", "About", "Services", "Schedule", "Trainers", "Pricing", "BMI Calculator", "Contact"];
    return (
        <div className="bg-white dark:bg-black">
            <Navbar navLinks={navLinks}/>
            <main>
                <Hero />
                <About />
                <Services />
                <Schedule />
                <Trainers />
                <Pricing />
                <BMICalculator />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

