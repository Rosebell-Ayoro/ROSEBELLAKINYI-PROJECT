import React,{useEffect,useState} from 'react';
import API from '../api/axios';
import {toast} from 'react-toastify';
import Searchbar from './searchbar';
import StatusBadge from './components/StatusBadge';

export default function Feedback(){
    const [feedbacks,setFeedbacks]=useState([]);
    const [form,setForm]=useState({
        student_name:'',
        supervisor:'',
        feedback:''
    });
    const fetchFeedbacks = async () => {
    try {
      const res = await API.get("feedback/");
      setFeedbacks(res.data);
    } catch (error) {
      toast.error("Failed to load feedback.");
    }
  };
   useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("feedback/", form);
      toast.success("Feedback submitted!");
      setForm({ student_name: '', supervisor: '', feedback: '' });
      fetchFeedbacks();  
    } catch (error) {
      toast.error("Failed to submit.");
    }
  };
  const handleSearch=(query)=>{
        const filteredList=feedbacks.filter (item=>
            item.student_name.toLowerCase().includes(query.toLowerCase()) ||
            item.supervisor.toLowerCase().includes(query.toLowerCase()) ||
            item.feedback.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(filteredList);
    };
    const SupervisorFeedback = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/submissions/')
      .then(res => res.json())
      .then(data => setSubmissions(data));
  }, []);

  const handleStatusChange = (id, newStatus, comment) => {
    fetch(`http://localhost:8000/api/submissions/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: newStatus,
        feedback: comment,
      }),
    })
      .then(res => res.json())
      .then(updated => {
        setSubmissions(prev =>
          prev.map(s => (s.id === id ? { ...s, ...updated } : s))
        );
        alert(`Submission ${newStatus}`);
      });
  };

  {submissions.map((sub) => (
  <div key={sub.id} className="p-4 border rounded-xl mb-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-bold">{sub.lesson_title}</h3>
      <StatusBadge status={sub.status} />
    </div>
    <p className="mb-2">Submitted by: {sub.student_name}</p>
    <textarea
      defaultValue={sub.feedback || ''}
      onChange={(e) => (sub.tempFeedback = e.target.value)}
      className="w-full p-2 border rounded"
    />
    ...
  </div>
))}

    return(
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Student Feedback (Realtime)</h1>
            <h2>Supervisor Feedback</h2>
            <Searchbar placeholder="Search Feedback..." onSearch={handleSearch}/>
            <form onSubmit={handleSubmit}>
            <input name="student_name" value={form.student_name} onChange={handleChange} placeholder="Student Name" className="w-full p-2 border rounded" />
            <input name="supervisor" value={form.supervisor} onChange={handleChange} placeholder="Supervisor" className="w-full p-2 border rounded" />
            <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Feedback" className="w-full p-2 border rounded" />
            <button className="w-full bg-blue-600 text-white p-2 rounded">Submit</button>  
            </form>
            <div className="mt-10 space-y-4">
        {feedbacks.map(item => (
          <div key={item.id} className="p-4 bg-gray-100 rounded shadow">
            <p><strong>Student:</strong> {item.student_name}</p>
            <p><strong>Supervisor:</strong> {item.supervisor}</p>
            <p><strong>Feedback:</strong> {item.feedback}</p>
          </div>
        ))}
      </div>
        </div>
    );
}
return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Supervisor Feedback</h2>

      {submissions.map(sub => (
        <div
          key={sub.id}
          className="border rounded-xl p-4 bg-white shadow space-y-2"
        >
          <h3 className="font-semibold text-lg">{sub.lesson_title}</h3>
          <p>Status: <span className="font-bold">{sub.status}</span></p>

          <textarea
            placeholder="Write feedback..."
            className="w-full border p-2 rounded"
            defaultValue={sub.feedback || ''}
            onChange={(e) => (sub.tempFeedback = e.target.value)}
          />

          <div className="flex gap-4 mt-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => handleStatusChange(sub.id, 'Approved', sub.tempFeedback || '')}
            >
              Approve
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => handleStatusChange(sub.id, 'Rejected', sub.tempFeedback || '')}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};