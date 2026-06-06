import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transacciones } from "../pages/Transacciones";


type Props = {
    abierto: boolean;
    onCerrar: () => void;
};

export const Modal = ({ abierto, onCerrar }: Props) => {
    
    if (!abierto) return null;

    const tipos:string [] = ['ingreso','comida', 'transporte', 'servicios', 'ocio', 'salud',  'otro'] 
    
    const [tipo,setTipo] = useState< "ingreso" | "gasto">("ingreso")
    
    const {addTransaction} = useTransactions()

    const schema = z.object({
    descripcion: z
        .string()
        .min(3, "La descripción debe tener al menos 4 caracteres"),

    categoria: z
        .string()
        .min(1, "Debes seleccionar una categoría"),

    fecha: z
        .string()
        .min(1, "La fecha es obligatoria"),

    monto: z
        .coerce
        .number()
        .positive("El monto debe ser mayor a 0"),
    });

    type FormData = z.inter<typeof schema>


    const {register,handleSubmit, formState: {errors},} = useForm<FormData>({
        resolver:zodResolver(schema)
    })

    const onSubmit = (data:FormData) => {

        addTransaction({
            id:crypto.randomUUID(),
            transaccion:tipo,
            categoriaTransaccion:data.categoria,
            descripcion:data.descripcion,
            amount:data.monto,
            fecha:data.fecha
        })
        onCerrar()
    }


    return (
        // Overlay que cubre toda la pantalla
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onCerrar}>

            {/* Contenedor del modal */}
            <div className="bg-[#13132a] border-r border-white/10 text-white rounded-xl p-6 w-11/12 max-w-lg m-auto" onClick={(e) => e.stopPropagation()}>
                
                <form action="" className="flex flex-col gap-5 p-5" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="flex flex-row justify-between items-center mb-5">
                        <h2 className="text-xl font-semibold items-center ">Nueva Transaccion</h2>
                        <button onClick={onCerrar} className="border border-gray-500 text-white p-1 pl-3 pr-3 rounded-lg cursor-pointer active:bg-red-500 transition-all duration-300 ease-in-out active:scale-95 hover:bg-red-500 active:border-red-500" >X</button>   
                    </div>
                    
                    <div className="flex flex-row justify-center items-center gap-5 mb-5 ">
                        <button type="button" className={`${tipo === "ingreso" ? "bg-green-500 border-green-500" : "border border-green-500 text-green-500" } shadow w-full rounded-lg p-1 transition-all duration-300 ease-in-out active:scale-95 hover:cursor-pointer`} onClick={()=> setTipo("ingreso")}> Ingreso</button>
                        <button type="button" className={`${tipo === "gasto" ? "bg-red-500 border-red-500": "border border-red-500 text-red-500"} w-full rounded-lg p-1 transition-all duration-300 ease-in-out active:scale-95 hover:cursor-pointer `} onClick={()=> setTipo("gasto")}> Gasto</button>
                    </div>

                    <label htmlFor="" className="flex flex-col text-gray-200/80">
                        Descripcion
                        <input type="text" className="border-b border-gray-600 p-2 outline-none focus:border-sky-500 "  placeholder="Ej:Supermercado" {...register("descripcion")}></input>
                        {errors.descripcion && (
                            <p className="text-red-500 text-sm mt-1">
                            {errors.descripcion.message}
                            </p>
                        )}
                    </label>
                    
                    <label htmlFor="" className="flex flex-col text-gray-200/80">
                        Categoria
                        <select className="border-b border-gray-600 p-2 outline-none focus:border-sky-500 "  {...register("categoria")}>    
                            {tipos.map((item)=> (
                                <option key={item} value={item} className="bg-gray-800 rounded-4xl p-1">
                                    {item}
                                </option>
                            ))}
                        {errors.categoria && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors.categoria.message}
                        </p>
                        )}            
                        </select>
                    </label>

                    <label htmlFor="">
                        Fecha
                        <br />
                        <input type="date" className="w-full border-b border-gray-600 p-2 outline-none focus:border-sky-500 "  {...register("fecha")}></input>
                        {errors.fecha && (
                            <p className="text-red-500 text-sm mt-1">
                            {errors.fecha.message}
                            </p>
                        )}
                    </label>

                    <label htmlFor="" className="flex flex-col text-gray-200/80">
                        Monto
                        <input type="number" className="border-b border-gray-600 p-2 outline-none focus:border-sky-500 " placeholder="$2000" {...register("monto")}></input>
                        {errors.monto && (
                            <p className="text-red-500 text-sm mt-1">
                            {errors.monto.message}
                            </p>
                        )}
                    </label>
                    
                    <button className="mt-4 border-2 border-sky-500  text-white p-4 py-2 rounded-xl cursor-pointer active:bg-sky-500 transition-all duration-300 ease-in-out active:scale-95 hover:cursor-pointer" > Agregar</button>
                    
                </form>
            </div>
        </div>
    );
};

