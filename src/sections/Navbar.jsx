import React from 'react'
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollLink } from '../components/ScrollLink';
import { useTheme } from '../components/ThemeContext'; //
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from '../Icons/Icons';
//import {navLinks} from '../App.jsx';
export const Navbar = ({navLinks}) => {
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
