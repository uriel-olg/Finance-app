import { useTransactions } from "../hooks/useTransactions";
import { calSummary } from "../utils/calcSummary";
import { formatCurrency } from "../utils/formatCurrency";

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



    return (
    <div className="flex flex-col w-full m-auto pr-10 mt-10 text-white bg-transparent md:w-11/12 md:p-0" >
      {/* Topbar */}
        <div className="flex justify-between items-center mb-10 md:mt-5">
            <h1 className="text-xl md:text-l font-semibold">Dashboard</h1>
            <select className="bg-[#13151e] md:bg-[#13151e] border text-center text-ms border-gray-700  rounded-3xl md:text-l w-min p-1.5 ">
                <option className="text-lg bg-none">septiembre  </option>
            </select>
        </div>

        {/* Cards resumen */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-20 mb-10">

            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5">
                <p className="text-lg text-centertext-gray-400 ml-4 md:text-l">Balance total</p>
                <p className="text-xl font-semibold mt-2 ml-4 md:text-xl">
                    {formatCurrency(balance)}
                </p>
            </div>

            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5">
                <p className="text-lg text-white ml-4 md:text-l">Ingresos</p>
                <p className="text-xl font-semibold mt-2 text-green-400 ml-4 md:text-xl">
                    {formatCurrency(ingresosTotales)}
                </p>
            </div>

            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5">
                <p className="text-lg text-white ml-4 md:text-l">Gastos</p>
                <p className="text-xl font-semibold mt-2 text-red-500 ml-4 md:text-xl">
                    {formatCurrency(gastosTotales)}
                </p>
            </div>
        </div>

        {/* Paneles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gastos por categoría */}
            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5">

                <h2 className="text-l mb-4 md:text-l">Gastos por categoría</h2>

                <div className="flex flex-col gap-3">
                    {gastosPorCategoria.map((item) => (
                    <div
                        key={item.categoria}
                        className="flex items-center justify-between bg-[#1a1d2e] p-3 rounded-lg"
                    >
                        <span className="text-sm text-gray-300">{item.categoria}</span>
                        <span className="text-sm font-semibold">
                        {formatCurrency(item.total)}
                        </span>
                    </div>
                    ))}
                </div>
            </div>

            {/* Transacciones recientes */}
            <div className="bg-[#13132a] border border-gray-800 rounded-3xl p-5 mb-10 md:m-0">

                <h2 className="text-l mb-4 md:text-l ">Transacciones recientes</h2>

                <div className="flex flex-col divide-y divide-gray-800">
                    {transactions.slice(0, 5).map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between py-3"
                    >
                        <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {item.descripcion}
                        </span>
                        <span className="text-xs text-gray-400">
                            {item.categoriaTransaccion}
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
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};