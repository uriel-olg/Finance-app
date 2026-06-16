import { useTransactions } from "../hooks/useTransactions";
import ingreso from "../assets/ingreso.png";
import comidaImg from "../assets/comida.png";
import transporteImg from "../assets/transporte.png";
import serviciosImg from "../assets/servicios.png";
import ocioImg from "../assets/ocio.png";
import saludImg from "../assets/salud.png";
import otroImg from "../assets/otros.png";

export const Categorias = () => {
  const { transactions } = useTransactions();

  const Filtrar = transactions
    .filter((t) => t.transaccion === "gasto")
    .reduce(
      (acc, item) => {
        const existe = acc.find(
          (i) => i.categoria === item.categoriaTransaccion,
        );

        if (existe) {
          existe.total += item.amount;
          existe.contador++;
        } else {
          acc.push({
            categoria: item.categoriaTransaccion,
            total: item.amount,
            contador: 1,
          });
        }
        return acc;
      },
      [] as { categoria: string; total: number; contador: number }[],
    );

  const gastosTotales = Filtrar.reduce((acc, item) => acc + item.total, 0);

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
    comida: "bg-cyan-500",
    transporte: "bg-green-500",
    servicios: "bg-amber-500",
    ocio: "bg-violet-500",
    salud: "bg-pink-500",
    ingreso: "bg-emerald-500",
    otro: "bg-slate-500",
  };

  const cardStyle = `
    bg-slate-900/70
    backdrop-blur-xl
    border border-slate-700/50
    rounded-3xl
    shadow-lg shadow-black/20
    transition-all duration-300
    hover:border-slate-600
    hover:-translate-y-1
    `;

  return (
    <div className="flex flex-col h-full text-white p-4 md:p-8">
      {/* Header */}
      <nav className="flex justify-between items-center mb-8 md:mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
      </nav>

      {Filtrar.length === 0 ? (
        <div
          className="
        flex
        flex-col
        items-center
        justify-center
        h-full
        text-slate-500
        "
        >
          <span className="text-5xl mb-4">📊</span>
          <span className="text-xl">No hay categorías registradas</span>
        </div>
      ) : (
        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        "
        >
          {Filtrar.map((item) => {
            const porcentajesTotales = Math.round(
              (item.total / gastosTotales) * 100,
            );

            return (
              <div key={item.categoria} className={`${cardStyle} p-6`}>
                {/* Header card */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-slate-800
                  flex
                  items-center
                  justify-center
                  "
                  >
                    <img
                      src={
                        categoriasImg[
                          item.categoria as keyof typeof categoriasImg
                        ]
                      }
                      className="w-8 h-8 object-contain"
                      alt={item.categoria}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg capitalize text-slate-200">
                      {item.categoria}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {item.contador} transacciones
                    </p>
                  </div>
                </div>

                {/* Barra */}
                <div
                  className="
                w-full
                h-3
                bg-slate-800
                rounded-full
                overflow-hidden
                mt-6
                mb-5
                "
                >
                  <div
                    className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-700
                  ${
                    coloresCategoria[
                      item.categoria as keyof typeof coloresCategoria
                    ]
                  }
                  `}
                    style={{
                      width: `${porcentajesTotales}%`,
                    }}
                  />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <span
                    className="
                  text-2xl
                  font-bold
                  text-slate-200
                  "
                  >
                    ${item.total.toLocaleString()}
                  </span>

                  <span
                    className="
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-500/10
                  text-cyan-400
                  text-sm
                  font-medium
                  "
                  >
                    {porcentajesTotales}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
