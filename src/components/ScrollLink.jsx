import React from 'react'

export const ScrollLink = ({ to, children, className, onClick, offset = -70 }) => {
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
