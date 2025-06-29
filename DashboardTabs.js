import React from "react";
import Tabs from "./components/Tabs";
import LessonPlan from "./components/Lessonplan";
import Schemeofwork from "./components/schemeofwork";
import Recordofwork from "./components/Recordofwork";
import Feedback from "./components/feedback";
import Announcements from "./components/Announcement";

export default function DashboardTabs(){
    const tabData=[
        {label:'Lesson Plan',content:<LessonPlan/>},
        {label:'Scheme of Work',content:<Schemeofwork/>},
        {label:'Record of Work',content:<Recordofwork/>},
        {label:'Feedback',content:<Feedback/>},
        {label:'Announcements',content:<Announcements/>},
    ];
    return(
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                My Education Automation System Dashboard 
            </h2>
            <Tabs tabs={tabData}/>
        </div>
    );
}