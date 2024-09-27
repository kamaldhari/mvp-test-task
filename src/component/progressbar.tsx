import React from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="w-full bg-gray-300 rounded mb-5">
            <div
                className={`h-5 bg-green-500 rounded transition-all duration-500`}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
