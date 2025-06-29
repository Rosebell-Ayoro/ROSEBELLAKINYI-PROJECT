import React from 'react';
import { Link } from 'react-router-dom';
import StudentProgressBar from './components/StudentProgressBar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Welcome to My Educationg Automation System</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <Link to="/lessonplan" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Lesson Plan</h2>
          <p>Manage lesson plans for students on attachment.</p>
        </Link>

        <Link to="/schemeofwork" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-green-600">Scheme of Work</h2>
          <p>Prepare & track schemes of work for supervisors.</p>
        </Link>

        <Link to="/recordofwork" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-purple-600">Record of Work</h2>
          <p>View and update work done by students weekly.</p>
        </Link>

        <Link to="/feedback" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-pink-600">Feedback</h2>
          <p>Give and receive feedback in realtime.</p>
        </Link>

        <Link to="/announcements" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-yellow-600">Announcements</h2>
          <p>Post and view system-wide announcements.</p>
        </Link>

        <Link to="/reports" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Reports</h2>
          <p>Generate reports for admin and supervisors.</p>
        </Link>

      </div>
    </div>
  );
}
<div className="space-y-4">
  {students.map(student => (
    <div key={student.id} className="border p-4 rounded shadow">
      <h3 className="font-semibold mb-1">{student.name}</h3>
      <StudentProgressBar percentage={student.progress} />
    </div>
  ))}
</div>