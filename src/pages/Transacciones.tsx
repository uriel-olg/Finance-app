import { useTransactions } from "../hooks/useTransactions";
import { useState } from "react";
import ingreso from "../assets/ingreso.png";
import comidaImg from "../assets/comida.png";
import transporteImg from "../assets/transporte.png";
import serviciosImg from "../assets/servicios.png";
import ocioImg from "../assets/ocio.png";
import saludImg from "../assets/salud.png";
import otroImg from "../assets/otros.png";

export const Transacciones = () => {
  const { transactions } = useTransactions();
  const [botonActivo, setbotonActivo] = useState<"todos" | "ingreso" | "gasto">(
    "todos",
  );
  const [busquedaTexto, setbusquedaTexto] = useState("");
  const Filtrar = transactions
    .filter((item) =>
      botonActivo === "todos" ? true : item.transaccion === botonActivo,
    )
    .filter((item) =>
      item.descripcion.toLowerCase().includes(busquedaTexto.toLowerCase()),
    );

  const base = `
    px-4
    py-2.5
    rounded-2xl
    font-medium
    transition-all
    duration-300
    active:scale-95
    border
    border-transparent
    `;

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
    <div className="flex flex-col w-full h-full text-white overflow-y-auto scrollbar-hide mt-0 pr-5 pl-5 md:p-0 ">
      <nav
        className="
            flex
            flex-col
            gap-6
            mb-8
            md:flex-row
            md:justify-between
            md:items-center
            md:w-11/12
            md:m-auto
            md:mt-10
            md:mb-10
            "
      >
        <h2
          className="
            text-3xl
            font-bold
            tracking-tight
            "
        >
          Transacciones
        </h2>
        <div className="flex flex-row w-full justify-between md:justify-end md:gap-5">
          <button
            onClick={() => setbotonActivo("todos")}
            className={`${base} ${
              botonActivo === "todos"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-slate-900/70 border-slate-700 text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => setbotonActivo("ingreso")}
            className={`${base} ${
              botonActivo === "ingreso"
                ? "bg-emerald-500 hover:opacity-90  border border-gray-600"
                : "bg-[#13132a] border border-gray-600 hover:bg-bg-active "
            }`}
          >
            Ingresos
          </button>

          <button
            onClick={() => setbotonActivo("gasto")}
            className={`${base} ${
              botonActivo === "gasto"
                ? "bg-red-500 hover:opacity-90  border border-gray-600"
                : "bg-[#13132a] border border-gray-600 hover:bg-bg-active "
            }`}
          >
            Gastos
          </button>
        </div>
      </nav>

      <input
        type="text"
        value={busquedaTexto}
        onChange={(e) => {
          setbusquedaTexto(e.target.value);
        }}
        placeholder="🔍 Buscar transaccion..."
        className="
            w-full
            h-12
            p-4
            bg-slate-900/70
            border
            border-slate-700
            rounded-2xl
            text-slate-200
            placeholder:text-slate-500
            focus:outline-none
            focus:border-cyan-500
            transition-colors
            mb-10
            md:w-11/12
            md:m-auto
            md:mb-10
            "
      />

      <div className={`${cardStyle} p-4 mb-10 md:w-11/12 md:m-auto`}>
        <div
          className="
            grid
            grid-cols-4
            pb-4
            border-b
            border-slate-700
            text-slate-400
            font-medium
            text-sm
            md:text-base
        "
        >
          <span>Descripción</span>
          <span className="text-center">Categoría</span>
          <span className="text-center">Fecha</span>
          <span className="text-right">Monto</span>
        </div>

        <div className="flex flex-col mt-2">
          {Filtrar.length === 0 ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-24
                text-slate-500
                "
            >
              <span className="text-4xl mb-3">📄</span>
              <span className="text-lg">No hay transacciones</span>
            </div>
          ) : (
            Filtrar.map((item) => (
              <div
                key={item.id}
                className="
                    grid
                    grid-cols-4
                    items-center
                    w-full
                    py-4
                    px-0
                    rounded-2xl
                    transition-all
                    duration-300
                    hover:bg-white/5
                    "
              >
                {/* Descripción */}
                <div className="flex items-center gap-3">
                  <div
                    className="
                        w-10
                        h-10
                        bg-slate-800
                        rounded-full
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                        "
                  >
                    <img
                      src={categoriasImg[item.categoriaTransaccion]}
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs md:text-base font-medium text-slate-200">
                      {item.descripcion}
                    </span>

                    <span className="text-xs text-slate-500">
                      {item.categoriaTransaccion}
                    </span>
                  </div>
                </div>

                {/* Categoría */}
                <div className="flex justify-center">
                  <span
                    className={`
                        md:px-3
                        md:º    
                        py-1
                        px-2
                        rounded-full
                        text-xs
                        md:text-sm
                        font-medium
              ${coloresCategoria[item.categoriaTransaccion]}
              `}
                  >
                    {item.categoriaTransaccion}
                  </span>
                </div>

                {/* Fecha */}
                <span
                  className="
                    text-center
                    text-xs
                    md:text-sm
                    text-slate-400
                    "
                >
                  {item.fecha}
                </span>

                {/* Monto */}
                <span
                  className={`
                    text-right
                    font-bold
                    text-sm
                    md:text-base
                ${
                item.transaccion === "ingreso"
                    ? "text-emerald-400"
                    : "text-red-400"
                }
            `}
                >
                  {item.transaccion === "ingreso" ? "+" : "-"}${item.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
