import React,{useState} from "react";
export default function Tabs({tabs}) {
    const [activeTab, setActiveTab]=useState(0);

    return(
        <div>
            {/*Tab Navigation*/}
            <div className="flex space-x-4 border-b border-gray-300 mb-4">
                {tabs.map((tab,index)=>(
                    <button
                    key={index}
                    onClick={()=>setActiveTab(index)}
                    className={`px-4 py-2 font-semibold text-sm border-b-2 transition-all ${
                        index===activeTab
                        ?'border-blue-600 text-blue-600'
                        :'border-transparent text-gray-600 hover:text-blue-500'
                    }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/*Tab Content*/}
            <div className="bg white p-4 rounded shadow">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}