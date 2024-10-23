'use client'

import { useState, useEffect } from "react";
import { cookieExists, getCookie } from "../_app"

export const UserChip: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState("unsure");
    const [name, setName] = useState("");
    
    useEffect(() => {
        setLoggedIn(cookieExists("name") ? "true" : "false");
        setName(getCookie("name"));
    }, [])

    async function handleLogout(){
        const response = await fetch("/api/auth/logout", {
            method: "POST"
        });
        if(response.ok){
            window.location.href = "/login";
        }
    }

    return (
        <div className="absolute inset-y-0 right-0 gap-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {loggedIn == "unsure" ? <></> : loggedIn == "true" ? 
                <>
                <a href="/dashboard" className="btn-primary text-sm">
                    <span>{name}</span>
                </a>
                <a onClick={handleLogout} className="btn-secondary text-sm cursor-pointer">
                    <span>Log Out</span>
                </a>
                </>
            : 
            
                <>
                <a href="/login" className="btn-primary text-sm">
                    <span>Log In</span>
                </a>
                <a href="/signup" className="btn-secondary text-sm">
                    <span>Sign Up</span>
                </a>
                </>
            }
        </div>
    )
        

}
