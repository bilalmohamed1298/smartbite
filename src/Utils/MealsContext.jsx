import { createContext, useEffect, useState } from "react";

export const MealsContext = createContext([]);



export function MealsContextProvider({children}){

    const [userDetails, setUserDetails] = useState({
        activity: 0
    })

    useEffect(() => {
        console.log(userDetails)
    
    }, [userDetails])
    

return (
<MealsContext.Provider
    value={{
        userDetails,
        setUserDetails
    }}
>
    {children}
</MealsContext.Provider>)
}