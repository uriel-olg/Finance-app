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
    <div className="flex-col w-full h-full px-6 py-10 text-white bg-transparent ">
      {/* Topbar */}
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-semibold">Dashboard</h1>

            <select className="bg-[#13151e] border w-1/12 h-12/12 p-3 border-gray-700  rounded-lg text-2xl font-semibold text-center">
                <option>Abril</option>
            </select>
        </div>

        {/* Cards resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <div className="bg-[#13132a] border border-gray-800 rounded-xl p-5 relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r rounded-t-xl"></div>
            <p className="text-lg text-gray-400">Balance total</p>
            <p className="text-4xl font-semibold mt-2">
                {formatCurrency(balance)}
            </p>
            </div>

            <div className="bg-[#13132a] border border-gray-800 rounded-xl p-5 relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"></div>
            <p className="text-lg text-gray-400">Ingresos</p>
            <p className="text-4xl font-semibold mt-2 text-green-400">
                {formatCurrency(ingresosTotales)}
            </p>
            </div>

            <div className="bg-[#13132a] border border-gray-800 rounded-xl p-5 relative">
            <div className="absolute top-0 left-0 right-0 h-[3px]  rounded-t-xl"></div>
            <p className="text-lg text-gray-400">Gastos</p>
            <p className="text-4xl font-semibold mt-2 text-red-500">
                {formatCurrency(gastosTotales)}
            </p>
            </div>
        </div>

        {/* Paneles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gastos por categoría */}
            <div className="bg-[#13132a] border border-gray-800 rounded-xl p-5">

                <h2 className="text-2xl font-semibold mb-4">Gastos por categoría</h2>

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
            <div className="bg-[#13132a] border border-gray-800 rounded-xl p-5">

                <h2 className="text-2xl font-semibold mb-4">Transacciones recientes</h2>

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