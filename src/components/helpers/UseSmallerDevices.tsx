"use client";

import React, { useState, useEffect } from 'react';

const useSmallerDevices = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if the window matches the media query
  const checkMobile = () => {
    const matchesMediaQuery = window.matchMedia('(max-width: 768px)').matches;
    const matchesWidth = window.innerWidth <= 768;
    return matchesMediaQuery || matchesWidth;
  };

  const handleResize = () => {
    setIsMobile(checkMobile()); // Update the state based on the screen size or media query
  };

  useEffect(() => {
    // Initial check for the screen size and media query on mount
    handleResize();

    // Listen for window resize events to update state dynamically
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {isMobile}; // Only render children if it's a mobile screen
};

export default useSmallerDevices;

