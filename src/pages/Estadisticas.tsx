import { calSummary } from "../utils/calcSummary";
import { formatCurrency } from "../utils/formatCurrency";
import { useTransactions } from "../hooks/useTransactions";
import { useStats } from "../hooks/useStats";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Line,
  ComposedChart,
} from "recharts";

export const Estadisticas = () => {
  const {
    MesActivo,
    setMesActivo,
    promedio,
    variacion,
    mesMasGastado,
    mesMasAhorradoFiltrado,
    categoriaTop,
    totalGastosMes,
  } = useStats();

  const { transactions } = useTransactions();
  const { gastosTotales } = calSummary(transactions);

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

  const coloresCategoria = {
    comida: "bg-blue-500",
    transporte: "bg-green-500",
    servicios: "bg-yellow-500",
    ocio: "bg-purple-500",
    salud: "bg-pink-500",
    ingreso: "bg-emerald-500",
    otro: "bg-gray-500",
  };

  const cardStyle = `
    bg-slate-900/70
    backdrop-blur-sm
    border border-slate-700/50
    rounded-3xl
    p-6
    shadow-lg shadow-black/20
    transition-all duration-300
    hover:border-slate-600
    `;

  const base = `
    w-3/12 md:w-min
    px-4 py-2
    rounded-xl
    text-sm
    font-medium
    transition-all duration-300
    active:scale-95
    border
    flex justify-center
    `;

  console.log("meses", totalGastosMes);
  return (
    <div className="flex flex-col w-full h-min px-4 md:px-8 py-0">
      <nav className="flex flex-row text-white justify-between items-center p-5">
        <p className="text-xl font-bold">Estadísticas</p>

        <div className="flex gap-3">
          <button
            className={`${base} ${MesActivo === "3M" ? "bg-cyan-500 shadow-lg shadow-cyan-500/20 border border-cyan-700" : "bg-slate-800 border-slate-700 hover:bg-slate-700"}`}
            onClick={() => setMesActivo("3M")}
          >
            3M
          </button>
          <button
            className={`${base} ${MesActivo === "6M" ? "bg-cyan-500 shadow-lg shadow-cyan-500/20 border border-cyan-700" : "bg-slate-800 border-slate-700 hover:bg-slate-700"}`}
            onClick={() => setMesActivo("6M")}
          >
            6M
          </button>
          <button
            className={`${base} ${MesActivo === "1Año" ? "bg-cyan-500 shadow-lg shadow-cyan-500/20 border border-cyan-700" : "bg-slate-800 border-slate-700 hover:bg-slate-700"}`}
            onClick={() => setMesActivo("1Año")}
          >
            1A
          </button>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row text-white justify-between p-5 gap-5">
        <div className={`w-full ${cardStyle}`}>
          <p className="text-sm uppercase tracking-wider text-slate-400">
            Promedio mensual 📈
          </p>

          <p className="text-3xl font-bold text-white mt-2">
            {promedio ? formatCurrency(promedio) : "Sin datos"}
          </p>

          <div
            className={`mt-2 flex items-center gap-2 ${
              variacion >= 1 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span>{variacion >= 1 ? "▲" : "▼"}</span>
            <span>
              {variacion ? `${variacion}% vs mes anterior` : "Sin datos"}
            </span>
          </div>
        </div>

        <div className={`w-full ${cardStyle}`}>
          <p className="text-sm uppercase tracking-wider text-slate-400">
            Mes con más gastos 💸
          </p>

          <p className="text-3xl font-bold text-white mt-2">
            {mesMasGastado
              ? meses[Number(mesMasGastado.mes.split("-")[1]) - 1]
              : "Sin datos"}
          </p>

          <p className="mt-2 text-cyan-400 font-medium">
            {mesMasGastado ? formatCurrency(mesMasGastado.total) : "Sin datos"}
          </p>
        </div>

        <div className={`w-full ${cardStyle}`}>
          <p className="text-sm uppercase tracking-wider text-slate-400">
            Mayor ahorro 💰
          </p>

          <p className="text-3xl font-bold text-white mt-2">
            {mesMasAhorradoFiltrado
              ? meses[Number(mesMasAhorradoFiltrado.fecha) - 1]
              : "Sin datos"}
          </p>

          <p
            className={`mt-2 font-medium ${
                mesMasAhorradoFiltrado &&
                mesMasAhorradoFiltrado.ingreso - mesMasAhorradoFiltrado.gasto >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
            >
            {mesMasAhorradoFiltrado
              ? formatCurrency(
                  mesMasAhorradoFiltrado.ingreso - mesMasAhorradoFiltrado.gasto, 
                )
              : "Sin datos"}
          </p>
        </div>

        <div className={`w-full ${cardStyle}`}>
          <p className="text-sm uppercase tracking-wider text-slate-400">
            Categoría top 🎯
          </p>

          <p className="text-3xl font-bold text-white mt-2 capitalize">
            {categoriaTop ? categoriaTop.categoriaTransaccion : "Sin datos"}
          </p>

          <p className="mt-2 text-red-400 font-medium">
            {categoriaTop
              ? ((categoriaTop.total / gastosTotales) * 100).toFixed(0)
              : "0"}
            % del gasto total
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between text-white gap-10 w-full h-80 mt-5 pl-5 pr-5">
        <div
          className={`${cardStyle}w-full h-80 border border-gray-600 rounded-3xl p-6  `}
        >
          <p className="text-lg font-semibold">promedio mensual </p>

          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={totalGastosMes}>
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="ingreso" fill="#22c55e" />

              <Bar dataKey="gastos" fill="#ef4444" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`bg-${cardStyle} border border-gray-600 rounded-3xl p-6 w-full`}
        >
          <p className="font-semibold text-lg">Distribucíon de gastos</p>

          <div className="flex flex-col gap-3">
            {gastosPorCategoria.map((item) => {
              const porcentaje = (item.total / gastosTotales) * 100;

              return (
                <div
                  key={item.categoria}
                  className="
                        grid grid-cols-[25%_60%_10%]
                        items-center
                        gap-4
                        py-4
                        border-b
                        border-slate-800
                        "
                >
                  <span className="text-sm text-gray-300 md:text-lg">
                    {item.categoria}
                  </span>
                  <div className="bg-slate-800 h-3 rounded-full overflow-hidden">
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
                  {porcentaje.toFixed()}%
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
