import { useState } from "react";
import { NavLink } from "react-router-dom";

export const SideBar = () => {

    const navClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "translate-y-0 bg-[#1e1e3f] flex items-center gap-2 p-4 rounded-lg text-xl font-semibold text-white"
            : "flex items-center gap-2 px-3 py-2 text-xl text-white/70";

    const [abierto, setAbierto] = useState(false);

    const cerrarMenu = () => setAbierto(false);

    return (
        <>
            {/* Botón hamburguesa - solo mobile */}
            <button
                className="flex md:hidden text-3xl p-2 text-white"
                onClick={() => setAbierto((prev) => !prev)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static top-0 left-0 h-full bg-[#13132a] border-r border-white/10 text-white p-4 flex flex-col gap-1 z-50
                    w-2/3 md:w-1/6

                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    
                    ${abierto
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"
                    }
                `}
            >
                <div className="md:text-3xl mt-2 mb-4 pb-4 border-b border-white/10">
                    💰 FinanceApp
                </div>

                <nav className="flex flex-col w-full h-full items-center gap-8">
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
                    onClick={cerrarMenu}
                    className=" bg-emerald-600 text-black text-xl p-10 rounded-lg hover:opacity-80 transition-opacity md:flex mt-auto bg-emerald-600 text-white text-xxlfont-medium py-2 px-3 rounded-lg hover:opacity-80 transition-opacity"
                >
                    + Nueva transacción
                </button>
            </aside>
        </>
    );
};