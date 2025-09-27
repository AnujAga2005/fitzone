import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import {SunIcon, MoonIcon, MenuIcon, CloseIcon} from './Icons/Icons';
import { Card } from './components/Card';
import { ScrollLink } from './components/ScrollLink';
import {Hero} from './sections/Hero';
import {Navbar} from './sections/Navbar';
import  {Footer}  from './sections/Footer';
import { ThemeProvider } from './components/ThemeContext';
import { ContactModal } from './sections/ContactModal';
import { SectionHeader } from './components/SectionHeader';
import { Pricing } from './sections/Pricing';
import { Services } from './sections/Services';
import { Trainers } from './sections/Trainers';
import { Contact } from './sections/Contact';
import { About } from './sections/About';
import { Schedule } from './sections/Schedule';
import { BMICalculator } from './sections/BMI';








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

