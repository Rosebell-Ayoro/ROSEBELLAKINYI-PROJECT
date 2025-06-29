import React from 'react';

const StudentProgressBar = ({ percentage }) => {
  const color =
    percentage >= 90 ? 'bg-green-600'
    : percentage >= 60 ? 'bg-blue-500'
    : percentage >= 30 ? 'bg-yellow-500'
    : 'bg-red-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
      <div
        className={`h-full ${color} text-white text-sm text-center transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default StudentProgressBar;