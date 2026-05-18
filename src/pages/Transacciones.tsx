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
    
    
const base = "w-3/12 md:w-min p-2 md:px-3 rounded-3xl text-sm md:text-l transition-all duration-300 ease-in-out active:scale-95 hover:cursor-pointer"    
return (
    
    <div className="flex flex-col w-full h-full pr-8 py-10 text-white">

        <nav className="flex flex-col w-full gap-8 mb-10 m-auto md:flex-row md:w-11/12 items-center  ">

            <h2 className="flex text-xl md:text-xl">Transacciones</h2>

            <div className="flex flex-row w-full justify-between md:justify-end md:gap-5">
                <button
                onClick={() => setbotonActivo("todos")}
                className={`${base} ${botonActivo === "todos"
                    ? "bg-sky-600 hover:opacity-90  border border-gray-600"
                    : "bg-[#13132a] border border-gray-600 hover:bg-bg-active "
                }`}>Todos</button>

                <button
                    onClick={() => setbotonActivo("ingreso")}
                    className={`${base} ${botonActivo === "ingreso"
                        ? "bg-emerald-500 hover:opacity-90  border border-gray-600"
                        : "bg-[#13132a] border border-gray-600 hover:bg-bg-active "
                    }`}>Ingresos</button>

                <button
                    onClick={() => setbotonActivo("gasto")}
                    className={`${base} ${botonActivo === "gasto"
                        ? "bg-red-500 hover:opacity-90  border border-gray-600"
                        : "bg-[#13132a] border border-gray-600 hover:bg-bg-active "
                    }`}>Gastos</button>
            </div>
            
        </nav>
                
        <input type="text" value={busquedaTexto} onChange={(e)=>{setbusquedaTexto(e.target.value)}}   placeholder="🔍 Buscar transaccion..." className=" w-12/12 p-5 h-10 text-center text-sm bg-[#13132a] border border-gray-600 rounded-3xl mb-10 md:w-11/12 m-auto text-3xl"/>

        <div className="bg-[#13132a] flex  flex-col w-full h-full border border-gray-600 rounded-2xl p-3 md:w-11/12 m-auto">
            <div className="text-sm flex flex-row w-full h-1/12 items-center justify-between border-b border-gray-600 md:text-xl ">
                <span className="md:text-lg">Descripcion</span>
                <span className="md:text-lg">Categoria</span>
                <span className="md:text-lg">Fecha</span>
                <span className="md:text-lg">Monto</span>
            </div>
            <div className="flex justify-center h-full items-center">
                {Filtrar.length === 0 ? (<div className="md:text-2xl">no hay transacciones </div>) 
                : ( Filtrar.map((item) => (
                    <div className="text-white">
                        <div>{item.descripcion}</div>
                        <span>{item.categoriaTransaccion}</span>
                        <span>{item.fecha}</span>
                        <span>{item.amount}</span>
                    </div>
                )))
                }
            </div>
        </div>
    </div>

    )
}