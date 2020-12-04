import { createContext } from "react";

export interface IUser {
    fullname?: string,
}

export interface IGlobalContext {
    user: IUser,
    logged: boolean,
    setContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
}

export const GlobalContext = createContext<IGlobalContext>(
    {
        user: {
            fullname: "Renys"
        },
        logged: false,
        setContext: () => console.log()
    }
);