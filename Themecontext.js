import React, {createContext,useState,useEffect, Children} from 'react';
export const Themecontext=createContext();

export const ThemeProvider=({Children})=>{
    const [theme,setTheme]=useState(()=>{
        return localStorage.getItem('theme')||'light';
    });
    useEffect(()=>{
        document.body.className=theme;
        localStorage.setItem('theme',theme);
    },[theme]);
    const toggleTheme=()=>{
        setTheme((prevTheme)=>(prevTheme==='light'?'dark':'light'));
    };
    return(
        <Themecontext.Provider value={{theme, toggleTheme}}>
            {Children}
        </Themecontext.Provider>
    );
};