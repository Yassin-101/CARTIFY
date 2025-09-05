import { createContext } from "react";

export const ShopContext = createContext(null)

const ShopContextProvider = (props) =>{
    const currency = "AED"

    const value = {
        currency
    }

    return <ShopContext.Provider value={value}>
    {props.children}
</ShopContext.Provider>
}





export default ShopContextProvider