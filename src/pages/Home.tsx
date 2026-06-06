import { useTransactions } from "../hooks/useTransactions";
import { calSummary } from "../utils/calcSummary";
import { formatCurrency } from "../utils/formatCurrency";
import ingreso from "../assets/ingreso.png"
import comidaImg from "../assets/comida.png"
import transporteImg from "../assets/transporte.png"
import serviciosImg from "../assets/servicios.png"
import ocioImg from "../assets/ocio.png"
import saludImg from "../assets/salud.png"
import otroImg from "../assets/otros.png"


export const Home = () => {
    const { transactions } = useTransactions();
    const { balance, ingresosTotales, gastosTotales } = calSummary(transactions);

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
        comida: "bg-blue-500",
        transporte: "bg-green-500",
        servicios: "bg-yellow-500",
        ocio: "bg-purple-500",
        salud: "bg-pink-500",
        ingreso: "bg-emerald-500",
        otro: "bg-gray-500",
    };



    return (
    <div className="flex flex-col w-full m-auto pb-3 pr-5 pl-5 mt-10 text-white bg-transparent md:w-11/12 md:p-0 overflow-y-auto scrollbar-hide " >
      {/* Topbar */}
        <div className="flex justify-between items-center mb-10 md:mt-5">
            <h1 className="text-xl md:text-l font-semibold">Dashboard</h1>
            <select className="bg-[#13151e] md:bg-[#13151e] border text-center text-ms border-gray-700  rounded-3xl md:text-l w-min p-1.5 ">
                <option className="text-lg bg-none">septiembre  </option>
            </select>
        </div>

        {/* Cards resumen */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-8 mb-10">

            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5">
                <p className="text-lg text-gray-200 ml-4 md:text-l">Balance total</p>
                <p className="text-xl font-semibold mt-2 ml-4 md:text-xl text-blue-500">
                    {formatCurrency(balance)}
                </p>
            </div>

            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5">
                <p className="text-lg text-gray-200 ml-4 md:text-l">Ingresos</p>
                <p className="text-xl font-semibold mt-2 text-green-400 ml-4 md:text-xl">
                    {formatCurrency(ingresosTotales)}
                </p>
            </div>

            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5">
                <p className="text-lg text-gray-200 ml-4 md:text-l">Gastos</p>
                <p className="text-xl font-semibold mt-2 text-red-500 ml-4 md:text-xl">
                    {formatCurrency(gastosTotales)}
                </p>
            </div>
        </div>

        {/* Paneles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gastos por categoría */}
            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5">

                <h2 className="text-l mb-4 md:text-lg font-semibold text-gray-400">Gastos por categoría</h2>

                <div className="flex flex-col gap-3">
                    {gastosPorCategoria.map((item) => { 
                        
                        const porcentaje = (item.total / gastosTotales) * 100
                        
                        return (
                        <div
                            key={item.categoria}
                            className="grid grid-cols-3 gap-3.5 w-full h-min border-b justify-around items-center border-gray-700 p-3 ">

                            <span className="text-sm text-gray-300 md:text-lg">{item.categoria}</span>
                            <div className="flex bg-gray-700 w-full h-2 rounded-2xl" >
                                <div className={`h-2 bg-blue-500 rounded-3xl ${coloresCategoria[item.categoria as keyof typeof coloresCategoria]}`} style={{width:`${porcentaje}%`}}></div>
                            </div>
                            <span className="flex text-sm font-semibold text-red-500 justify-end">
                            {formatCurrency(item.total)}
                            </span>
                        </div>
                    )})
                    }
                </div>
            </div>

            {/* Transacciones recientes */}
            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 mb-10 md:m-0">

                <h2 className="text-l mb-4 md:text-lg font-semibold text-gray-400">Transacciones recientes</h2>

                <div className="flex flex-col divide-y divide-gray-800">
                    {transactions.slice(0, 5).map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-5 py-3"
                    >   
                        <div className="flex  rounded-full items-center">
                            
                            <img
                            src={categoriasImg[item.categoriaTransaccion]}
                            alt=""
                            className="w-13 h-11 m-auto justify-center items-center"
                            />                        
                        </div>
                        <div className="flex flex-row w-full justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-sm md:text-lg font-medium">
                                    {item.categoriaTransaccion}
                                </span>
                                <span className="text-xs md:text-m text-gray-400">
                                    {item.fecha}
                                </span>
                            </div>
                            <span
                            className={`text-sm font-semibold ${
                                item.transaccion === "gasto"
                                ? "text-red-500"
                                : "text-green-400"
                            }`}
                            >
                            {formatCurrency(item.amount)}
                            </span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};