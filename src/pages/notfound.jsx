import React, { useState, useEffect } from 'react';
import { history } from '../utils';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Cat Face */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Cat's face */}
          <div className="absolute inset-0 bg-gray-800 rounded-full" />
          
          {/* Eyes */}
          <div className="absolute top-16 left-12 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <div 
              className="w-4 h-4 bg-black rounded-full transition-all duration-200"
              style={{
                transform: isMoving 
                  ? `translate(${(mousePosition.x % 8) - 4}px, ${(mousePosition.y % 8) - 4}px)`
                  : 'none'
              }}
            />
          </div>
          <div className="absolute top-16 right-12 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <div 
              className="w-4 h-4 bg-black rounded-full transition-all duration-200"
              style={{
                transform: isMoving 
                  ? `translate(${(mousePosition.x % 8) - 4}px, ${(mousePosition.y % 8) - 4}px)`
                  : 'none'
              }}
            />
          </div>
          
          {/* Nose */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-300 rounded-full" />
          
          {/* Whiskers */}
          <div className="absolute top-24 left-4 space-y-2">
            <div className="w-12 h-0.5 bg-gray-600 transform rotate-12" />
            <div className="w-12 h-0.5 bg-gray-600" />
            <div className="w-12 h-0.5 bg-gray-600 transform -rotate-12" />
          </div>
          <div className="absolute top-24 right-4 space-y-2">
            <div className="w-12 h-0.5 bg-gray-600 transform -rotate-12" />
            <div className="w-12 h-0.5 bg-gray-600" />
            <div className="w-12 h-0.5 bg-gray-600 transform rotate-12" />
          </div>
          
          {/* Ears */}
          <div className="absolute -top-4 left-8 w-12 h-12 bg-gray-800 transform rotate-45" />
          <div className="absolute -top-4 right-8 w-12 h-12 bg-gray-800 transform rotate-45" />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Purr-page not found!</h2>
          <p className="text-gray-600">
            Looks like this page has been chased away by our playful cat!
          </p>
          <button 
    onClick={() => history.navigate("/dashboard")}
    className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
>
    Go Back Home
</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;