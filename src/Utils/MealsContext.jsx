import { createContext, useState } from "react";

export const MealsContext = createContext([]);



export function MealsContextProvider({children}){

    const [bla, setbla] = useState("BlaBlaBla")

return (
<MealsContext.Provider
    value={{
        bla
    }}
>
    {children}
</MealsContext.Provider>)
}