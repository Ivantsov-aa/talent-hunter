import React from "react";
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        if (!location.pathname.includes('profile') && !location.pathname.includes('gallery') && !location.pathname.includes('settings')) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;