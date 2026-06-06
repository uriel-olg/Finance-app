import { calSummary } from "../utils/calcSummary";
import {formatCurrency } from "../utils/formatCurrency"
import { useTransactions } from "../hooks/useTransactions";
import { useStats } from "../hooks/useStats"


export const Estadisticas = ()=>{

    const {
        MesActivo,
    setMesActivo,
    promedio,
    variacion,
    mesMasGastado,
    mesMasAhorradoFiltrado,
    categoriaTop,
    
    } = useStats()
    
    const {transactions} = useTransactions()
    const {gastosTotales } = calSummary(transactions);
    
    const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];  

    const gastosPorCategoria = transactions
    .filter((t) => t.transaccion === "gasto")
    .reduce((acc, t) => {
        const existe = acc.find(
            (item) => item.categoria === t.categoriaTransaccion
        );
        if (existe) {
            existe.total += t.amount;
        } else {
            acc.push({ categoria: t.categoriaTransaccion, total: t.amount });
        }
        return acc;
    }, [] as { categoria: string; total: number }[]);


    const coloresCategoria = {
        comida: "bg-blue-500",
        transporte: "bg-green-500",
        servicios: "bg-yellow-500",
        ocio: "bg-purple-500",
        salud: "bg-pink-500",
        ingreso: "bg-emerald-500",
        otro: "bg-gray-500",
    };

    const base = "w-3/12 md:w-min p-2 md:px-3 rounded-xl text-sm md:text-l transition-all duration-300 ease-in-out active:scale-95 hover:cursor-pointer border border-gray-600"    
    
    
    return (
    
    <div className="flex flex-col w-full h-full md:9pt-10 pl-2 pr-2">

        <nav className="flex flex-row text-white justify-between items-center p-5">
            <p>Estadisticas</p>
            
            <div className="flex flex-row justify-end gap-5">
                <button className={`${base} ${MesActivo === "3M" ?  "bg-sky-500" : 6 }`} onClick={()=> setMesActivo("3M")}>3M</button>
                <button className={`${base} ${MesActivo === "6M" ? "bg-sky-500" : 6}`} onClick={()=> setMesActivo("6M")}>6M</button>
                <button className={`${base} ${MesActivo === "1Año" ? "bg-sky-500" : 1}`} onClick={()=> setMesActivo("1Año")}>1A</button>
            </div>
        </nav>

        <div className="flex flex-row text-white justify-between p-5 gap-5">
            
            <div className="w-full bg-[#13132a] border border-gray-500/80 rounded-3xl p-6 ">
                <p className="text-slate-200 ">Promedio mensual</p>
                <p className="font-semibold text-2xl text-slate-50 ">${promedio ? promedio : 4500}</p>
                <p className={`${variacion >= 1 ? "text-green-500 " : "text-red-500"}`}>{variacion >= 1 ? "▲" : "▼"} {variacion ? <p>{variacion}% mes ant</p>: "no hay datos"}</p>
            </div>

            <div className="w-full bg-[#13132a] border border-gray-600 rounded-3xl p-6 ">
                <p className="text-slate-200 ">Mes con mas gastos</p>
                <p className="font-semibold text-2xl">{mesMasGastado ? meses[Number(mesMasGastado.mes.split("-")[1]) - 1] : "marzo"}</p>
                <p className="text-cyan-400">$ {mesMasGastado ? (mesMasGastado.total).toLocaleString("es-AR"): 3000} gastados</p>
            </div>

            <div className="w-full bg-[#13132a] border border-gray-600 rounded-3xl p-6 ">
                <p className="text-slate-200 ">Mayor ahorro</p>
                <p className="font-semibold text-2xl">{mesMasAhorradoFiltrado ?  meses[Number(mesMasAhorradoFiltrado.fecha) - 1]: "enero"}</p>
                <p className={`${mesMasAhorradoFiltrado?.ingreso - mesMasAhorradoFiltrado?.gasto >= 0 ? "text-green-500" : "text-red-500" }`}>
                    {(mesMasAhorradoFiltrado?.ingreso - mesMasAhorradoFiltrado?.gasto) >= 0
                        ? "▲"
                        : "▼"}
                    $                
                    {mesMasAhorradoFiltrado
                        ? (mesMasAhorradoFiltrado.ingreso - mesMasAhorradoFiltrado.gasto)
                            .toLocaleString("es-AR")
                        : 0}
                    {" "}
                    ahorrados
                </p>
            </div>
            
            <div className="w-full bg-[#13132a] border border-gray-600 rounded-3xl p-6">
                <p className="text-slate-200 ">Categoria top</p>
                <p className="font-semibold text-2xl">{categoriaTop ? categoriaTop.categoriaTransaccion : "comida"}</p>
                <p className="text-red-500">{categoriaTop ? (categoriaTop.total / gastosTotales) * 100 : 45}% del gasto total</p> {}
            </div>

        </div>

        <div className="flex flex-row justify-between text-white gap-10 w-full h-min mt-5 pl-5 pr-5">
            
            <div className="bg-[#13132a] border border-gray-600 rounded-3xl p-6 w-full">
                <p className="text-lg font-semibold">promedio mensual </p>
                <div></div>
                <div>
                    <div className="flex flex-row gap-5">
                        <p>Ingresos</p>
                        <p>Gastos</p>
                    </div>
                    
                </div>
            </div>
            
            <div className="bg-[#13132a] border border-gray-600 rounded-3xl p-6 w-full">
                <p className="font-semibold text-lg">Distribucíon de gastos</p>

                <div className="flex flex-col gap-3">
                                    
                    {gastosPorCategoria.map((item) => { 
                    const porcentaje = (item.total / gastosTotales) * 100
                    
                    return (
                        <div
                        key={item.categoria}
                        className="grid grid-cols-[25%_60%_10%] gap-3.5 w-full h-min border-b items-center border-gray-700 p-3 ">
                            <span className="text-sm text-gray-300 md:text-lg">{item.categoria}</span>
                            <div className="flex bg-gray-700 w-full h-2 rounded-2xl" >
                                <div className={`h-2 bg-blue-500 rounded-3xl ${coloresCategoria[item.categoria as keyof typeof coloresCategoria]}`} style={{width:`${porcentaje}%`}}></div>
                            </div>
                                    {porcentaje.toFixed()}%
                            </div>
                        )})
                    }
                </div>

            </div>
        
        </div>

    </div>
    )
    
}
