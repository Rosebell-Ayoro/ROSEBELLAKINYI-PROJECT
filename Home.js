import React from 'react';
import{link} from 'react-router-dom';
export default function Home(){
    return(
        <div className="min-h-screen flex flex-col justify-center items-center bg-grey-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
            <h1 className="text-4xl font-bold mb-4 text-center">My Education Automation System</h1>
            <p className="text-lg mb-8 text-center">Manage Lesson Plans, Scheme of work, Record of work, and Feedback for Students on Attachment.</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-ig shadow text-center transition">Login
                </link>
                <link to="/register" className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-ig shadow text-center transition">Register
                </link>
                <link to="/lesson" className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-ig shadow text-center transition">Lesson Plan
                </link>
                <link to="/scheme" className="bg-yellow-600 hover:bg-yellow-700 text-white py-4 px-6 rounded-ig shadow text-center transition">Scheme of work
                </link>
                <link to="/records" className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-ig shadow text-center transition">Record of work
                </link>
                <link to="/feedback" className="bg-pink-600 hover:bg-pink-700 text-white py-4 px-6 rounded-ig shadow text-center transition">Feedback
                </link>
            </div>
        </div>
    );
}
{items.map(item =>(
    <div key={item.id} className="bg-blue-100 p-2 rounded mb-2">
        {item.title}:{item.message}
    </div>
))}