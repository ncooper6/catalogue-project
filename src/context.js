import React, {useState, useContext} from 'react'

const AppContext = React.createContext(); //creates a context so it can be accessed globally

const AppProvider = ({children}) => {
    const [catalogueType, setCatalogueType] = useState('360 Camera');//a state used for the side bar 

return (
    <AppContext.Provider
        value={{
            catalogueType,
            setCatalogueType,
        }}>
        {children}
    </AppContext.Provider>
    )
}//used so catalogue type can be accessed anywhere the sidebar is used

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}