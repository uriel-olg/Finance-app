import { useTransactions } from "../hooks/useTransactions"
import { useState, } from "react"


export const Transacciones = ()=>{

    const {transactions} = useTransactions()
    const [botonActivo,setbotonActivo] = useState<'todos' | 'ingreso' | 'gasto'> ("todos")
    const [busquedaTexto,setbusquedaTexto] = useState("")
    const Filtrar =
        transactions
        .filter(item => botonActivo === "todos" ? true : item.transaccion === botonActivo)
        .filter(item => item.descripcion.toLowerCase().includes(busquedaTexto.toLowerCase()))
    
    
    return (
    
    <div className="flex flex-col w-full h-full px-6 py-10 text-white bg-[#0f1117]">
        <nav className="flex justify-between items-center mb-10">
                <h2 className="flex font-bold">Transacciones</h2>
                <div className="flex gap-5">
                    <button onClick={()=>{setbotonActivo("todos")}} className={botonActivo === "todos" ? "bg-cyan-500 p-2 rounded-xl font-bold" : "bg-gray-400 p-2 rounded-xl"}>Todos</button>
                    <button onClick={()=>{setbotonActivo("ingreso")}} className={botonActivo === "ingreso" ? "bg-emerald-900 p-2 rounded-xl font-bold" : "bg-gray-400 p-2 rounded-xl"}>Ingresos</button>
                    <button onClick={()=>{setbotonActivo("gasto")}} className={botonActivo === "gasto" ? "bg-red-600 p-2 rounded-xl font-bold" : "bg-gray-400 p-2 rounded-xl"}>Gastos</button>
                </div>
        </nav>
                
        <input type="text" value={busquedaTexto} onChange={(e)=>{setbusquedaTexto(e.target.value)}}   placeholder="Buscar transaccion" className="w-11/12 h-10 text-white text-center bg-gray-400 rounded-md"/>

        <div>
            <div className="text-white">
                <span>Descripcion</span>
                <span>Categoria</span>
                <span>Fecha</span>
                <span>Monto</span>
            </div>
            <div className="flex justify-center items-center">
                {Filtrar.map((item)=>(

                    <div className="text-white">
                        <div>{item.descripcion}</div>
                        <span>{item.categoriaTransaccion}</span>
                        <span>{item.fecha}</span>
                        <span>{item.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>

    )
}