import React,{useState, useEffect} from "react";
import API from '../api/axios';
import {toast} from 'react-toastify';
import Searchbar from "./searchbar";

export default function Announcements(){
    const [items,setItems]=useState([]);
    const [form,setForm]=useState({
    title:'',
    message:'',
    date:''
    });
    const [editing,setEditing]=useState(false);
    const [editId,setEditId]=useState(null);

    const fetchItems=async()=>{
        try{
            const res=await API.get("announcements/");
            setItems(res.data);
        }catch (error){
            toast.error("Failed to load announcements.");
        }
    };
    useEffect(()=>{
        fetchItems();
    }, []);
    const handleChange=e=>{
        setForm({...form, [e.target.name]:e.target.value});
    };
    const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put("announcements/${editId}/, form");
        toast.success("Announcement updated!");
      } else {
        await API.post("announcements/", form);
        toast.success("Announcement posted!");
      }
      setForm({ title: '', message: '', date: '' });
      setEditing(false);
      setEditId(null);
      fetchItems();
    } catch (error) {
      toast.error("Error saving announcement.");
    }
  };

  const handleEdit = item => {
    setForm({
      title: item.title,
      message: item.message,
      date: item.date
    });
    setEditing(true);
    setEditId(item.id);
  };

  const handleDelete = async id => {
    if (window.confirm("Are you sure?")) {
      try {
        await API.delete("announcements/${id}/");
        toast.success("Deleted successfully.");
        fetchItems();
      } catch (error) {
        toast.error("Delete failed.");
      }
    }
  };
  const handleSearch=(query)=>{
        const filteredList=announcements.filter (item=>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.message.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(filteredList);
    };
    
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Announcements</h1>
      <Searchbar placeholder="Search Announcements..." onSearch={handleSearch}/>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full p-2 border rounded" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">{editing ? "Update" : "Post"}</button>
      </form>

      <div className="mt-10 space-y-4">
        {items.map(item => (
          <div key={item.id} className="p-4 bg-gray-100 rounded shadow">
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>Message:</strong> {item.message}</p>
            <p><strong>Date:</strong> {item.date}</p>

            <div className="mt-2 flex gap-2">
              <button className="bg-yellow-500 text-white px-4 py-1 rounded" onClick={() => handleEdit(item)}>Edit</button>
              <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}