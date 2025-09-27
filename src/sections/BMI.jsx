import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';

export const BMICalculatorResult = ({ bmi, message, age }) => {
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


export const BMICalculator = () => {
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
