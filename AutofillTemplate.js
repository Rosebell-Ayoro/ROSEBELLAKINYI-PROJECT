import React, { useState } from 'react';

const AutoFillTemplate = () => {
  const [rows, setRows] = useState([]);

  const autofill = () => {
    const template = [
      { week: 1, topic: "Introduction to Algebra", objective: "Understand variables and expressions" },
      { week: 2, topic: "Linear Equations", objective: "Solve simple equations" },
      { week: 3, topic: "Graphs", objective: "Plot linear functions" },
    ];
    setRows(template);
  };

  return (
    <div className="p-4">
      <button
        onClick={autofill}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Autofill Template
      </button>

      <table className="w-full border text-left">
        <thead>
          <tr>
            <th className="border px-2 py-1">Week</th>
            <th className="border px-2 py-1">Content</th>
            <th className="border px-2 py-1">Activities</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{row.week}</td>
              <td className="border px-2 py-1">{row.content}</td>
              <td className="border px-2 py-1">{row.activities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutoFillTemplate;
