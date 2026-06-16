import { useTransactions } from "../hooks/useTransactions";
import { calSummary } from "../utils/calcSummary";
import { formatCurrency } from "../utils/formatCurrency";
import ingreso from "../assets/ingreso.png";
import comidaImg from "../assets/comida.png";
import transporteImg from "../assets/transporte.png";
import serviciosImg from "../assets/servicios.png";
import ocioImg from "../assets/ocio.png";
import saludImg from "../assets/salud.png";
import otroImg from "../assets/otros.png";

export const Home = () => {
  const { transactions } = useTransactions();
  const { balance, ingresosTotales, gastosTotales } = calSummary(transactions);

  const gastosPorCategoria = transactions
    .filter((t) => t.transaccion === "gasto")
    .reduce(
      (acc, t) => {
        const existe = acc.find(
          (item) => item.categoria === t.categoriaTransaccion,
        );
        if (existe) {
          existe.total += t.amount;
        } else {
          acc.push({ categoria: t.categoriaTransaccion, total: t.amount });
        }
        return acc;
      },
      [] as { categoria: string; total: number }[],
    );

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
    comida: "bg-blue-400",
    transporte: "bg-green-400",
    servicios: "bg-yellow-400",
    ocio: "bg-purple-400",
    salud: "bg-pink-400",
    ingreso: "bg-emerald-400",
    otro: "bg-gray-400",
  };

  const cardStyle = `
    bg-slate-900/70
    backdrop-blur-xl
    border border-slate-700/50
    rounded-3xl
    shadow-lg shadow-black/20
    transition-all duration-300
    hover:border-slate-600
    `;



  return (
    <div className="flex flex-col w-full h-full m-auto pb-3 pr-4 pl-4  text-white bg-transparent md:w-11/12 md:p-0 overflow-y-auto scrollbar-hide ">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-10 mt-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        <select
          className="
                bg-slate-900/80
                border
                border-slate-700
                rounded-2xl
                px-4
                py-2
                text-slate-300
                focus:outline-none
                focus:border-cyan-500
                transition-colors
                "
        >
          <option>Septiembre</option>
        </select>
      </div>

      {/* Cards resumen */}
      <div
        className="
        flex
        flex-col
        gap-6
        md:flex-row
        md:gap-6
        mb-10
        "
      >
        <div
          className={`${cardStyle} border border-gray-600 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5`}
        >
          <p className="text-lg text-gray-200 ml-4 md:text-xl">Balance total</p>
          <p className="text-xl font-semibold mt-2 ml-4 md:text-2xl text-blue-400">
            {formatCurrency(balance)}
          </p>
        </div>

        <div
          className={`${cardStyle} border border-gray-600 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5`}
        >
          <p className="text-lg text-gray-200 ml-4 md:text-xl">Ingresos</p>
          <p className="text-xl font-semibold mt-2 text-green-400 ml-4 md:text-2xl">
            {formatCurrency(ingresosTotales)}
          </p>
        </div>

        <div
          className={`${cardStyle} border border-gray-600 rounded-3xl p-5 relative md:m-auto md:w-1/3 md:p-3.5`}
        >
          <p className="text-lg text-gray-200 ml-4 md:text-xl">Gastos</p>
          <p className="text-xl font-semibold mt-2 text-red-500 ml-4 md:text-2xl">
            {formatCurrency(gastosTotales)}
          </p>
        </div>
      </div>

      {/* Paneles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gastos por categoría */}
        <div className={`${cardStyle} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-200">
              Gastos por categoría
            </h2>

            <span className="text-sm text-slate-400">
              {gastosPorCategoria.length} categorías
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {gastosPorCategoria.map((item) => {
              const porcentaje = (item.total / gastosTotales) * 100;
              
              
              return (
                <div
                  key={item.categoria}
                  className="
                    rounded-2xl
                    p-3
                    transition-all
                    duration-300
                    hover:bg-white/5
                    "
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="capitalize text-slate-300 font-medium">
                      {item.categoria}
                    </span>

                    <span className="font-semibold text-red-400">
                      {formatCurrency(item.total)}
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`
                            h-full
                            rounded-full
                            transition-all
                            duration-700
                            ${coloresCategoria[item.categoria as keyof typeof coloresCategoria]}
                            `}
                      style={{ width: `${porcentaje}%` }}
                    />
                  </div>

                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-slate-500">
                      {porcentaje.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transacciones recientes */}
        <div className={`${cardStyle} p-6 mb-10 md:mb-0`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-200">
              Transacciones recientes
            </h2>

            <span className="text-sm text-slate-400">
              {Math.min(transactions.length, 5)} movimientos
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {transactions.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="
                flex
                items-center
                gap-4
                p-3
                rounded-2xl
                transition-all
                duration-300
                hover:bg-white/5
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-slate-800
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    "
                >
                  <img
                    src={categoriasImg[item.categoriaTransaccion as keyof typeof categoriasImg]}
                    alt={item.categoriaTransaccion}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-medium text-slate-200 capitalize">
                      {item.categoriaTransaccion}
                    </span>

                    <span className="text-xs text-slate-400">{item.fecha}</span>
                  </div>

                  <span
                    className={`
                        text-base
                        font-semibold
                        ${
                          item.transaccion === "gasto"
                            ? "text-red-400"
                            : "text-emerald-400"
                        }
                        `}
                  >
                    {item.transaccion === "ingreso" ? "+" : "-"}
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
