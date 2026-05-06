import { createContext, useEffect, useReducer } from "react";
import type {Transaction} from "../types/index"


type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }  // ← acá definís que existe payload
  | { type: "DELETE_TRANSACTION"; payload: string }    // ← y acá también


const reducer = (state:Transaction[],action:Action) => {

    switch(action.type){
        case "ADD_TRANSACTION": return [action.payload,...state]
        case "DELETE_TRANSACTION" : return state.filter((transaccion)=>(transaccion.id !== action.payload))
        default: return state
    }
}

const initialState = localStorage.getItem("transactions") ? JSON.parse(localStorage.getItem("transactions")!) : []

// 1. Creás el context
type ContextType = {
    transactions: Transaction[]
    addTransaction: (t: Transaction) => void
    deleteTransaction: (id: string) => void
}

export const TransactionContext = createContext<ContextType>({
    transactions: [],
    addTransaction: () => {},
    deleteTransaction: () => {}
})


export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  // acá va el useReducer, useEffect y las funciones

    const [transactions,dispatch] =useReducer(reducer, initialState)

    useEffect(()=>{
        localStorage.setItem("transactions", JSON.stringify(transactions))
    },[transactions])

    const addTransaction = (t: Transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: t })
    }

    const deleteTransaction = (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id })
    }


    return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
        {children}
    </TransactionContext.Provider>
    )


}