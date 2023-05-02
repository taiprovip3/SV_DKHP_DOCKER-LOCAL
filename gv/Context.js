import {createContext, useState} from 'react';
export const MyData = createContext();

const Context = ({children}) => {
    const [fruits, setFruits] = useState(require("./fruits"));
    const [carts, setCarts] = useState(require("./carts"));

    return (
        <MyData.Provider value={{ fruits, carts }}>
            {children}
        </MyData.Provider>
    )
}

export default Context