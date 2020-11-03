import React from 'react';
import '../styles/fallback.css';

const DotLoader = () => {
    return (
        <div className="fallback">
            <div className="fallback_ball ball1"></div>
            <div className="fallback_ball ball2"></div>
            <div className="fallback_ball ball3"></div>
        </div>
    );
}

export default DotLoader;