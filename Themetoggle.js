import React,{ useContext } from "react";
import { Themecontext } from "./contexts/Themecontext";

const Themetoggle=()=> {
    const{theme, toggleTheme}=useContext(Themecontext);

    return(
        <button onClick={toggleTheme}className="theme-toggle-button">
            Switch to{theme==='light'?'Dark':'Light'}Theme
        </button>
    );
};
export default Themetoggle;