import React,{useEffect,useState} from 'react';
import API from '../api/axios';
import {toast} from 'react-toastify'
import Searchbar from './searchbar';
import SchemeOfWorkCalendar from './SchemeOfWorkCalendar';
import AutoFillTemplate from './AutofillTemplate';

export default function Schemeofwork() {
    const [items,setItems]=useState([]);
    const [form,setForm]=useState({
        week:'',
        content:'',
        activities:''
    });
    const [editing,setEditing]=useState(false);
        const [editId,setEditId]=useState(null);
    
        const fetchItems = async ()=>{
            try{
                const res = await API.get("schemes/");
                setItems(res.data);
            } catch (error) {
                console.error(error);
                toast.error("failed to fetch schemes.")
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
                        await API.put(`scheme/${editId}`, form);
                        toast.success("scheme updated successfully!")
                    }else{
                        await API.post("scheme/",form);
                        toast.success("scheme saved successfully!")
                    }
                    setForm({week:'',content:'',activities:''});
                    setEditing(false);
                    setEditId(null);
                    fetchItems();
                }catch (error){
                    toast.error("Error while saving.")
                }
            };
        
            const handleEdit = (schemeItem)=>{
                setLesson({
                    week:schemeItem.week,
                    content:schemeItem.content,
                    activities:schemeItem.activities
                });
                setEditing(true);
                setEditId(schemeItem.id);
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
                const filteredList=schemes.filter (item=>
                    item.week.toLowerCase().includes(query.toLowerCase()) ||
                    item.content.toLowerCase().includes(query.toLowerCase()) ||
                    item.activities.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(filteredList);
    };
    const SchemeOfWork = () => {
  return (
    <div className="space-y-8 p-6">
      <SchemeOfWorkCalendar />
      <AutoFillTemplate />
    </div>
  );
};


    return(
        <div>
            <h2>Schemeofwork</h2>
            <Searchbar placeholder="Search Schemes of Work..." onSearch={handleSearch}/>
            <form onSubmit={handleSubmit}>
                <input placeholder='Week'value={week}onChange={e=>setWeek(e.target.value)}required/>
                <input placeholder='content'value={topics}onChange={e=>setContent(e.target.value)}required/>
                <textarea name="activities" placeholder="activities"value={scheme.activities}onChange={e=>setActivities(e.target.value)}required/>
                <button type='Submit'>Add</button>
            </form>
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">All schemes</h2>
                {scheme.length===0?(
                    <p>No schemes available</p>
                ):(
                    <div className="space-y-4">
                        {schemes.map((l)=>(
                            <div key={l.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded shadow">
                                <p><strong>Week:</strong>{l.week}</p>
                                <p><strong>Content:</strong>{l.content}</p>
                                <p><strong>Activities:</strong>{l.activities}</p>
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
                {entries.map((item,i)=><li key={i}>{item.week}:{item.content}:{item.activities}</li>)}
            </ul>
        </div>
    );
}