import React from "react";
export default function({placeholder, onSearch}) {
    return(
        <div className="my-4">
        <input
        type="text"
        placeholder={placeholder}
        onChange={(e)=>onSearch(e.target.value)}
        className="w-full p-2 border rounded shadow"
        />
        </div>
    );
}