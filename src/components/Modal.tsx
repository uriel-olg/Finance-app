import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../types";

type Props = {
  abierto: boolean;
  onCerrar: () => void;
};

const inputStyle = `
w-full
bg-slate-800/70
border
border-slate-700
rounded-2xl
px-4
py-3
text-slate-200
placeholder:text-slate-500
transition-colors
focus:outline-none
focus:border-cyan-500
`;

export const Modal = ({ abierto, onCerrar }: Props) => {
  const [tipo, setTipo] = useState<" " | "ingreso" | "gasto">(" ");

  const { addTransaction } = useTransactions();

  const schema = z.object({
    descripcion: z
      .string()
      .min(3, "La descripción debe tener al menos 4 caracteres"),

    categoria: z.enum(categories),

    fecha: z.string().min(1, "La fecha es obligatoria"),

    monto: z.coerce.number().positive("El monto debe ser mayor a 0"),
  });

  type FormData = z.output<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof schema>, any, z.output<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    addTransaction({
      id: crypto.randomUUID(),
      transaccion: tipo,
      categoriaTransaccion: data.categoria,
      descripcion: data.descripcion,
      amount: data.monto,
      fecha: data.fecha,
    });
    reset();
    setTipo(" ");
    onCerrar();
  };

  if (!abierto) return null;

  return (
    // Overlay que cubre toda la pantalla
    <div
      className="
  fixed
  inset-0
  bg-black/70
  backdrop-blur-sm
  flex
  justify-center
  items-center
  z-50
  p-4
  "
      onClick={onCerrar}
    >
      {/* Contenedor del modal */}
      <div
        className="
  bg-slate-900/95
  backdrop-blur-xl
  border
  border-slate-700/50
  text-white
  rounded-3xl
  shadow-2xl
  shadow-black/40
  w-full
  max-w-xl
  h-80%
  "
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="
  flex
  flex-col
  gap-6
  p-8
  "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Nueva Transacción</h2>

              <p className="text-sm text-slate-400">
                Registra un ingreso o gasto
              </p>
            </div>

            <button
              type="button"
              onClick={onCerrar}
              className="
    w-10
    h-10
    rounded-xl
    bg-slate-800
    hover:bg-red-500
    transition-all
    duration-300
    "
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTipo("ingreso")}
              className={`
    py-3
    rounded-2xl
    font-medium
    transition-all
    duration-300
    active:scale-95
    ${
      tipo === "ingreso"
        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }
    `}
            >
              💰 Ingreso
            </button>

            <button
              type="button"
              onClick={() => setTipo("gasto")}
              className={`
    py-3
    rounded-2xl
    font-medium
    transition-all
    duration-300
    active:scale-95
    ${
      tipo === "gasto"
        ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }
    `}
            >
              💸 Gasto
            </button>
          </div>

          <label
            htmlFor=""
            className="
flex
flex-col
gap-2
text-sm
font-medium
text-slate-300
"
          >
            Descripcion
            <input
              type="text"
              className={`${inputStyle}`}
              placeholder="Ej:Supermercado"
              {...register("descripcion")}
            ></input>
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descripcion.message}
              </p>
            )}
          </label>

          <label
            htmlFor=""
            className="
flex
flex-col
gap-2
text-sm
font-medium
text-slate-300
"
          >
            Categoria
            <select
              className="border-b border-gray-600 p-2 outline-none focus:border-sky-500 "
              {...register("categoria")}
            >
              {tipo === "ingreso" ? (
                <option value="ingreso">ingreso</option>
              ) : (
                categories.map((item) => (
                  <option key={item} value={item} className={`${inputStyle}`}>
                    {item}
                  </option>
                ))
              )}
              {errors.categoria && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.categoria.message}
                </p>
              )}
            </select>
          </label>

          <label
            htmlFor=""
            className="
flex
flex-col
gap-2
text-sm
font-medium
text-slate-300
"
          >
            Fecha
            <br />
            <input
              type="date"
              className={`${inputStyle}`}
              {...register("fecha")}
            ></input>
            {errors.fecha && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fecha.message}
              </p>
            )}
          </label>

          <label
            htmlFor=""
            className="
flex
flex-col
gap-2
text-sm
font-medium
text-slate-300
"
          >
            Monto
            <input
              type="number"
              className={`${inputStyle}`}
              placeholder="$2000"
              {...register("monto")}
            ></input>
            <p className="text-red-500 text-sm mt-1">
              {errors.monto && errors.monto.message}
            </p>
          </label>

          <button
            type="submit"
            className="
  mt-2
  py-3
  rounded-2xl
  bg-cyan-500
  text-white
  font-semibold
  transition-all
  duration-300
  hover:bg-cyan-600
  active:scale-95
  shadow-lg
  shadow-cyan-500/20
  "
          >
            Agregar Transacción
          </button>
        </form>
      </div>
    </div>
  );
};
