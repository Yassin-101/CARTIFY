import { createContext, useContext, useState } from "react";

const AdminContext = createContext()

export const useAdmin = ()=> useContext(AdminContext)

export const AdminProvider = ({children})=>{
    const [pageTitle,setPageTitle] = useState("Dashboard")

    return (
        <AdminContext.Provider value={{pageTitle,setPageTitle}}>
            {children}
        </AdminContext.Provider>
    )
}