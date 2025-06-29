import React,{useEffect, useState} from 'react';
import API from '../api/axios';
import {toast} from 'react-toastify'
import Searchbar from './searchbar';
import StatusBadge from './components/StatusBadge';
export default function LessonPlan() {
    const [items,setItems]=useState([]);
    const [form,setForm]=useState({
        topic:'',
        objectives:'',
        date:''
    });

    const [editing,setEditing]=useState(false);
    const [editId,setEditId]=useState(null);

    const fetchItems = async ()=>{
        try{
            const res = await API.get("lesson/");
            setItems(res.data);
        } catch (error) {
            console.error(error);
            toast.error("failed to fetch lessons.")
        }
    };
    useEffect(()=>{
        fetchItems();
    }, []);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(editing){
                await API.put(`lesson/${editId}`, form);
                toast.success("lesson updated successfully!")
            }else{
                await API.post("lesson/",form);
                toast.success("lesson saved successfully!")
            }
            setForm({date:'',topics:'',objectives:''});
            setEditing(false);
            setEditId(null);
            fetchItems();
        }catch (error){
            toast.error("Error while saving.")
        }
    };

    const handleEdit = (lessonItem)=>{
        setLesson({
            date:lessonItem.date,
            topic:lessonItem.topics,
            objectives:lessonItem.objectives
        });
        setEditing(true);
        setEditId(lessonItem.id);
    };

    const handleDelete =async(id)=>{
        if(window.confirm("Are you sure you want to delete?")){
            try{
            await API.delete('lesson/${id}/');
            toast.success("Deleted successfully.")
            fetchItems();
        }catch (error) {
            toast.error("Failed to delete.");
        }
    }
    };
    const handleSearch=(query)=>{
        const filteredList=lessonPlans.filter (item=>
            item.topic.toLowerCase().includes(query.toLowerCase()) ||
            item.objectives.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(filteredList);
    };
  const LessonPlan = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('Draft');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('status', status);

    fetch('http://localhost:8000/api/lesson-plans/', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert('Lesson Plan submitted!');

        setTitle('');
        setFile(null);
        setStatus('Draft');
      })
      .catch(err => {
        console.error(err);
        alert('Error submitting lesson plan.');
      });
  };

  {lessonPlans.map((plan) => (
  <div key={plan.id} className="border p-4 rounded mb-2">
    <h3 className="font-semibold">{plan.title}</h3>
    <p>Status: <StatusBadge status={plan.status} /></p>
  </div>
))}

    return(
        <div>
            <h2>LessonPlan</h2>
            <Searchbar placeholder="Search Lesson Plans..." onSearch={handleSearch}/>
            <form onSubmit={handleSubmit}>
                <input placeholder='Date'value={date}onChange={e=>setDate(e.target.value)}required/>
                <input placeholder='Topics'value={topics}onChange={e=>setTopics(e.target.value)}required/>
                <textarea name="objectives" placeholder="Objectives"value={lesson.objectives}onChange={e=>setObjectives(e.target.value)}required/>
                <button type='Submit'>Add</button>
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    {editing?"Update Lesson":"Save Lesson"}
                </button>
            </form>
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">All Lessons</h2>
                {lessons.length===0?(
                    <p>No lessons available</p>
                ):(
                    <div className="space-y-4">
                        {lessons.map((l)=>(
                            <div key={l.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded shadow">
                                <p><strong>Date:</strong>{l.date}</p>
                                <p><strong>Topics:</strong>{l.topics}</p>
                                <p><strong>Objectives:</strong>{l.objectives}</p>
                                <div className="mt-3 flex gap-4">
                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={()=> handleEdit(l)}>Edit</button>
                                    <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={()=> handleDelete(l.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ul>
                {lessons.map((item,i)=><li key={i}>{item.date}:{item.topics}:{item.objectives}</li>)}
            </ul>
        </div>
    );
}
return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Upload Lesson Plan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* File Upload */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />

        {/* Status Selector */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Lesson Plan
        </button>
      </form>
    </div>
  );
};