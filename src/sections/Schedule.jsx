import React from 'react'
import { SectionHeader } from '../components/SectionHeader';


export const Schedule = () => {
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
