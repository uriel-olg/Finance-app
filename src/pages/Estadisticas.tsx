import { useState } from "react"







export const Estadisticas = ()=>{

    const [MesActivo,setMesActivo] = useState <"3M" | "6M" | "1Año"> ("6M")

    return (
    
    <div className="flex flex-col w-full h-full mt-10 pl-2 pr-2">
        <nav className="flex flex-row text-white justify-between items-center p-5">
            <p>Estadisticas</p>
            <div className="flex flex-row justify-end gap-5">
                <button className="bg-[#13132a] border border-gray-100 rounded-xl p-2" onClick={()=> setMesActivo("3M")}>3M</button>
                <button className="bg-[#13132a] border border-gray-100 rounded-xl p-2" onClick={()=> setMesActivo("6M")}>6M</button>
                <button className="bg-[#13132a] border border-gray-100 rounded-xl p-2" onClick={()=> setMesActivo("1Año")}>1Año</button>
            </div>
        </nav>

        <div className="flex flex-row text-white justify-between p-5">
            <div className="bg-[#13132a] border border-gray-100 rounded-xl p-2 ">
                <p>Promedio mensual</p>
                <p>${}</p>
                <p>% vs mes ant</p>
            </div>
            <div className="bg-[#13132a] border border-gray-100 rounded-xl p-2 ">
                <p>Mes con mas gastos</p>
                <p>mes</p>
                <p>$ gastados</p>
            </div>
            <div className="bg-[#13132a] border border-gray-100 rounded-xl p-2 ">
                <p>Mayor ahorro</p>
                <p>enero</p>
                <p>$ ahorrados</p>
            </div>
            <div className="bg-[#13132a] border border-gray-100 rounded-xl p-2">
                <p>Categoria top</p>
                <p>Comida</p>
                <p>${} del gasto</p>
            </div>
        </div>

        <div className="flex flex-row justify-between m-auto text-white gap-10">
            <div className="bg-[#13132a] border border-gray-400 rounded-xl p-2">
                <p>promedio mensual </p>
                <div></div>
                <div>
                    <div ></div>
                    <p>Ingresos</p>
                    <p>Gastos</p>
                    <div></div>
                </div>
            </div>
            <div className="bg-[#13132a] border rounded-xl p-2">
                <p>Distribucion de gastos</p>

            </div>
        </div>
    </div>)
    
}

    
