import React, { useEffect, useState } from 'react';

const UserActivityLog = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/activity-log/')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">User Activity Log</h2>

      <div className="space-y-3">
        {activities.map((log, idx) => (
          <div key={idx} className="border-b pb-2">
            <p className="font-semibold">{log.user}</p>
            <p>{log.action}</p>
            <p className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivityLog;