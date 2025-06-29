import React,{useState} from 'react';
import API from '../api/axios';
import {toast} from 'react-toastify'
import Searchbar from './searchbar';
import StatusBadge from './components/StatusBadge';

export default function Recordofwork() {
    const [items,setItems]=useState([]);
    const [form,setForm]=useState({
        date:'',
        activity:'',
        remarks:''
    });
    const [editing,setEditing]=useState(false);
        const [editId,setEditId]=useState(null);
    
        const fetchItems = async ()=>{
            try{
                const res = await API.get("record/");
                setItems(res.data);
            } catch (error) {
                console.error(error);
                toast.error("failed to fetch records.")
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
                    await API.put(`record/${editId}`, form);
                    toast.success("records updated successfully!")
                }else{
                    await API.post("record/",form);
                    toast.success("records saved successfully!")
                }
                setForm({date:'',activity:'',remarks:''});
                setEditing(false);
                setEditId(null);
                fetchItems();
            }catch (error){
                toast.error("Error while saving.")
            }
        };
        const handleEdit = (recordItem)=>{
            setRecord({
                Date:recordItem.date,
                Activity:recordItem.activity,
                Remarks:schemeItem.remarks
            });
            setEditing(true);
            setEditId(recordItem.id);
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
            const filteredList=records.filter (item=>
                item.Activity.toLowerCase().includes(query.toLowerCase()) ||
                item.Remarks.toLowerCase().includes(query.toLowerCase()) 
        );
        setFiltered(filteredList);
    };
    const RecordOfWork = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [proofs, setProofs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', lessonTitle);
    proofs.forEach((file, index) => {
      formData.append(`proofs[${index}]`, file);
    });

    fetch('http://localhost:8000/api/record-of-work/', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert('Record of Work submitted!');
        setLessonTitle('');
        setProofs([]);
      })
      .catch(err => {
        console.error(err);
        alert('Error uploading record of work.');
      });
  };
  {records.map((record) => (
  <div key={record.id} className="flex justify-between items-center p-3 border-b">
    <div>
      <p className="font-medium">{record.title}</p>
      <small>{record.date}</small>
    </div>
    <StatusBadge status={record.status} />
  </div>
))}

    return(
        <div>
            <h2>Recordofwork</h2>
            <Searchbar placeholder="Search Record of Work..." onSearch={handleSearch}/>
            <form onSubmit={handleSubmit}>
                <input type='Date'value={date}onChange={e=>setDate(e.target.value)}required/>
                <input placeholder='Activity'value={activity}onChange={e=>setActivity(e.target.value)}required/>
                <textarea name="remarks" placeholder="Remarks"value={records.remarks}onChange={e=>setRemarks(e.target.value)}required/>
                <button type='Submit'>Submit</button>
            </form>
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">All Records</h2>
                {records.length===0?(
                    <p>No record available</p>
                ):(
                    <div className="space-y-4">
                        {records.map((l)=>(
                            <div key={l.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded shadow">
                                <p><strong>Date:</strong>{l.date}</p>
                                <p><strong>Activity:</strong>{l.topics}</p>
                                <p><strong>Remarks:</strong>{l.objectives}</p>
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
                {records.map((item,i)=><li key={i}>{item.date}:{item.activity}:{item.remarks}</li>)}
            </ul>
        </div>
    );
}
 return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Upload Record of Work</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lesson Title */}
        <input
          type="text"
          placeholder="Lesson Title"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* Upload Proofs */}
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={(e) => setProofs(Array.from(e.target.files))}
          className="w-full p-2 border rounded"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Record
        </button>
      </form>
    </div>
  );
};
