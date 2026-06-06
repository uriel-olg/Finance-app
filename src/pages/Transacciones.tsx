import { useTransactions } from "../hooks/useTransactions"
import { useState, } from "react"
import ingreso from "../assets/ingreso.png"
import comidaImg from "../assets/comida.png"
import transporteImg from "../assets/transporte.png"
import serviciosImg from "../assets/servicios.png"
import ocioImg from "../assets/ocio.png"
import saludImg from "../assets/salud.png"
import otroImg from "../assets/otros.png"


export const Transacciones = ()=>{

    const {transactions} = useTransactions()
    const [botonActivo,setbotonActivo] = useState<'todos' | 'ingreso' | 'gasto'> ("todos")
    const [busquedaTexto,setbusquedaTexto] = useState("")
    const Filtrar =
        transactions
        .filter(item => botonActivo === "todos" ? true : item.transaccion === botonActivo)
        .filter(item => item.descripcion.toLowerCase().includes(busquedaTexto.toLowerCase()))
    
    
const base = "w-3/12 md:w-min p-2 md:px-3 rounded-3xl text-sm md:text-l transition-all duration-300 ease-in-out active:scale-95 hover:cursor-pointer"    


const categoriasImg = {
        comida: comidaImg,
        transporte: transporteImg,
        servicios: serviciosImg,
        ocio: ocioImg,
        salud: saludImg,
        ingreso: ingreso,
        otro: otroImg,
    };


const coloresCategoria = {

        comida: "bg-blue-300/90 text-blue-900",
        transporte: "bg-green-300/90 text-green-900",
        servicios: "bg-yellow-300/90 text-yellow-900",
        ocio: "bg-purple-300/90 text-purple-900",
        salud: "bg-pink-300/90 text-pink-900",
        ingreso: "bg-emerald-300/90 text-emerald-900",
        otro: "bg-gray-300/90 text-gray-900",
    };



return (
    
    <div className="flex flex-col w-full h-full pl-5 pr-5 text-white overflow-y-auto scrollbar-hide mt-0">

        <nav className="flex flex-col w-full gap-8 mb-8 md:flex-row md:w-11/12 md:flex md:m-auto md:mb-10 md:mt-10 items-center ">

            <h2 className=" text-xl md:text-xl">Transacciones</h2>

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
                
        <input type="text" value={busquedaTexto} onChange={(e)=>{setbusquedaTexto(e.target.value)}}   placeholder="🔍 Buscar transaccion..." className=" w-12/12 p-5 h-10 flex justify-center text-center text-sm bg-[#13132a] border border-gray-600 rounded-3xl md:w-11/12 md:m-auto md:mt-0 mb-10 md:text-xl"/>

        <div className="bg-[#13132a] flex flex-col w-full h-min mb-5 border border-gray-600 rounded-3xl p-5 md:w-11/12 md:m-auto md:mt-10 ">

            <div className="text-sm grid grid-cols-4 w-full h-1/12 items-center justify-between border-b border-gray-600 md:text-xl ">
                <span className="md:text-lg flex  ">Descripcion</span>
                <span className="md:text-lg flex justify-center">Categoria</span>
                <span className="md:text-lg flex justify-center">Fecha</span>
                <span className="md:text-lg flex justify-end">Monto</span>
            </div>

            <div className=" justify-between h-min items-center ">
                {Filtrar.length === 0 ? (<div className="md:text-2xl h-full p-30 flex justify-center text-center items-center">no hay transacciones </div>) 
                : ( Filtrar.map((item) => (
                    <div className="grid grid-cols-4 text-white w-full justify-around mb-5 pb-2 mt-5 border-b border-gray-500/50 ">
                        <div className="w-full flex flex-col text-xs md:text-lg">
                            <img src={categoriasImg[item.categoriaTransaccion]} className="w-6 md:w-10"/>
                            {item.descripcion}</div>
                        <span className={`w-min pl-2 pr-2 md:pl-4 md:pr-4 md:h-5 md:text-lg p-3 h-min flex justify-end m-auto items-center rounded-4xl text-xs ${coloresCategoria[item.categoriaTransaccion]}`}>{item.categoriaTransaccion}</span>
                        <span className="flex justify-center items-center text-xs md:text-lg">{item.fecha}</span>
                        <span className={`flex justify-end items-center text-xs md:text-lg font-semibold ${item.transaccion === "ingreso" ? "text-green-500" : "text-red-500"}`}>{item.transaccion === "ingreso" ? "+ $" : "- $" } {item.amount}</span>
                    </div>
                )))
                }
            </div>
        </div>
    </div>

    )
}