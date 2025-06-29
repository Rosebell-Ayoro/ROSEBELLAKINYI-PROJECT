import React from 'react';

const StatusBadge = ({ status }) => {
  const colorMap = {
    Draft: 'bg-gray-200 text-gray-800',
    Submitted: 'bg-blue-100 text-blue-800',
    Approved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  const badgeClass = colorMap[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${badgeClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;