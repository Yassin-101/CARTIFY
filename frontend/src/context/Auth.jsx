import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { Navigate } from "react-router-dom";

export const Auth = createContext()

export const Authprovider = ({children})=>{
    const [user,setUser] = useState(null)
    const [token,setToken] = useState(localStorage.getItem('token')||'')

    const signup = async(name,email,password)=>{
        try {
            const res = await axios.post('http://localhost:3100/api/auth/signup',{
                name,email,password
            })
            alert(res.data.message)
            return true
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message||"SignUp Failed")
            return false
        }
    }

    const login = async(email,password) =>{
        try {
           const res = await axios.post('http://localhost:3100/api/auth/login',{
            email,password
           }) 
             // Save user and token
        setUser(res.data.data.User);
        setToken(res.data.data.token);
        localStorage.setItem('token', res.data.data.token);

        // Use the backend message
        alert(res.data.message);

        // Return User object so frontend knows role
        return res.data.data.User;
        } catch (error) {
            alert(error.response?.data?.message || 'Login Failed')
            return false
        }
    }
    
    const logout = ()=>{
        setUser(null)
        setToken('')
        localStorage.removeItem('token')
        Navigate('/Login')
    }
    return (
        <Auth.Provider value={{user,token,signup,login,logout}}>
            {children}
        </Auth.Provider>
    )
}