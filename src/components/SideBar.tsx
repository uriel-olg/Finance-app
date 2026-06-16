import { useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  onTransaccion: () => void;
};

export const SideBar = ({ onTransaccion }: Props) => {
  const navClass = ({ isActive }: { isActive: boolean }) => `
  w-full
  border
  border-transparent
  flex
  items-center
  justify-center
  rounded-2xl
  py-3
  px-4
  font-medium
  outline-none
  focus:outline-none
  focus-visible:outline-none
  focus:ring-0
  active:outline-none
  transition-all
  duration-300
  ${
    isActive
      ? `
      bg-cyan-500
      border-cyan-500/20
      text-white
      shadow-lg shadow-cyan-500/20
      `
      : `
      text-slate-300
      hover:bg-white/5
      hover:text-white
      `
  }
`;
  const [abierto, setAbierto] = useState(false);

  const cerrarMenu = () => setAbierto(false);

  return (
    <>
      {/* Botón hamburguesa - solo mobile */}

      {abierto === false ? (
        <button
          className="flex flex-col mt-0 h-min w-min md:hidden text-3xl p-2 text-white z-50"
          onClick={() => setAbierto((prev) => !prev)}
        >
          ☰
        </button>
      ) : (
        "asdasd"
      )}
      {/* Sidebar */}

      <aside
        className={`
                    fixed md:static top-0 left-0 h-full
                    bg-gradient-to-b from-[#111827] to-[#0f172a]
                    backdrop-blur-xl
                    border-r border-cyan-500/10
                    text-white
                    p-6
                    flex flex-col
                    z-50
                    w-2/3 md:w-full
                    shadow-2xl
                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${
                      abierto
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"
                    }
                `}
      >
        <div
          className="
                            text-2xl
                            font-bold
                            text-center
                            pb-6 border-b border-white/10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-white"
        >
          💰FinanceApp
        </div>

        <nav className="flex flex-col w-full h-full mt-10 items-center gap-4 ">
          <NavLink to="/" className={navClass} onClick={cerrarMenu}>
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className={navClass} onClick={cerrarMenu}>
            Transacciones
          </NavLink>
          <NavLink to="/categories" className={navClass} onClick={cerrarMenu}>
            Categorías
          </NavLink>
          <NavLink to="/statistics" className={navClass} onClick={cerrarMenu}>
            Estadísticas
          </NavLink>
        </nav>

        <button
          onClick={onTransaccion}
          className="
                    mt-auto
                    w-full
                    rounded-2xl
                    py-3
                    font-semibold
                    text-white
                    bg-gradient-to-r
                    from-green-500
                    to-green-700 
                    hover:scale-[1.02]
                    hover:shadow-lg
                    hover:shadow-green-500/20
                    active:scale-95
                    transition-all
                    duration-300"
        >
          + Nueva Transacción
        </button>
      </aside>
    </>
  );
};
