import React from 'react'

export const Footer = () => (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">FIT<span className="text-red-600">ZONE</span></h2>
            <p className="mb-4">Your ultimate fitness partner.</p>
            <p>&copy; {new Date().getFullYear()} FitZone. All Rights Reserved.</p>
        </div>
    </footer>
);
