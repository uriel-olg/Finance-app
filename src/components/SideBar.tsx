import { useState } from "react";
import { NavLink } from "react-router-dom";


type Props = {
    onTransaccion: () => void 
}

export const SideBar = ({onTransaccion}: Props) => {

    const navClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "translate-y-0 w-3/3  bg-[#1e1e3f] flex items-center justify-center p-3.5 rounded-3xl text-ms font-semibold text-white transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] md:text-l"
            : "translate-y-0 flex w-2/3   items-center justify-center p-3.5 rounded-3xl text-ms text-white transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] md:text-l";

    const [abierto, setAbierto] = useState(false);

    const cerrarMenu = () => setAbierto(false);

    return (
        <>
            {/* Botón hamburguesa - solo mobile */}
            
            {abierto === false ? <button className="flex flex-col mt-0 h-min w-min md:hidden text-3xl p-2 text-white z-50"
                onClick={() => setAbierto((prev) => !prev)} >☰</button>: "asdasd" }
            {/* Sidebar */}


            <aside
                className={`
                    fixed md:static top-0 left-0 h-full bg-[#13132a] border-r border-white/10 text-white p-7 flex flex-col gap-1 z-50
                    w-2/3 md:w-12/12

                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    
                    ${abierto
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"
                    }
                `}
            >   
                
                
                <div className="text-xl text-center md:text-xl font-semibold mt-2 mb-4 pb-7 border-b border-white/10">
                    💰 FinanceApp
                </div>

                <nav className="flex flex-col w-full h-full mt-10 items-center gap-10">
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
                    className="p-3 border hover:cursor-pointer border-sky-700 hover:bg-sky-600 transition-all duration-200 active:scale-95 active:bg-sky-600 text-l rounded-3xl md:text-l  font-semibold mb-5 "
                >
                + Transacción
                </button>
            </aside>
        </>
    );
};