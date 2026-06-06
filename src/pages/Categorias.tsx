import { useTransactions } from "../hooks/useTransactions"
import ingreso from "../assets/ingreso.png"
import comidaImg from "../assets/comida.png"
import transporteImg from "../assets/transporte.png"
import serviciosImg from "../assets/servicios.png"
import ocioImg from "../assets/ocio.png"
import saludImg from "../assets/salud.png"
import otroImg from "../assets/otros.png"


export const Categorias = ()=>{

    const { transactions } = useTransactions();

    const Filtrar = transactions.filter(t => t.transaccion === "gasto")
    .reduce((acc,item) =>{
        const existe = acc.find(i => i.categoria === item.categoriaTransaccion)

        if(existe){
            existe.total += item.amount
            existe.contador++
        }else{
            acc.push({categoria: item.categoriaTransaccion, total : item.amount, contador:1})
        }
        return acc
    },[] as {categoria: string ; total:number ; contador: number ;}[])

    const gastosTotales = Filtrar.reduce((acc,item) => acc + item.total,0)

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
        comida: "bg-blue-500",
        transporte: "bg-green-500",
        servicios: "bg-yellow-500",
        ocio: "bg-purple-500",
        salud: "bg-pink-500",
        ingreso: "bg-emerald-500",
        otro: "bg-gray-500",
    };


    return (   
        <div className="flex flex-col h-full justify-between text-white">

            <nav className="flex flex-row h-min justify-between items-center pl-5 pr-5 gap-10 md:p-10">
                <p className="w-min flex text-center text-lg md:text-2xl">Categorias</p>
                <button className="transition-all duration-200 hover:bg-emerald-600 active:scale-95 active:bg-emerald-500 border-2 border-emerald-600 w-max pr-4 pl-4 p-1 text-lg rounded-3xl  md:w-max md:h-min md:text-l md:pr-5 md:pl-5 md:p-1">+ categoria</button>
            </nav>
            
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  p-10 m-auto">
                {Filtrar.length === 0 ? <div className="flex items-center justify-center text-white m-auto text-3xl md:text-2xl"> no hay categorias</div> 
                : Filtrar.map((item) =>{
                    const porcentajesTotales = Math.round((item.total / gastosTotales)* 100)
                    return (
                        <div key={item.categoria} className="flex flex-col w-full h-full  bg-[#13132a] border border-gray-800 rounded-3xl p-7">
                            <div className="gap-5 ">
                                <img src={`${categoriasImg[item.categoria]}`} className="w-12 h-12 mb-2"/>
                                <div className="flex flex-col">
                                    <p className="font-semibold md:text-xl">{item.categoria}</p>
                                    <p className="text-gray-500/90 md:text-lg">{item.contador} transacciones</p>
                                </div>
                            </div>
                            <div className="flex bg-gray-700 w-full h-2 rounded-2xl mt-5 mb-5" >
                                <div className={`h-2 bg-blue-500 rounded-3xl ${coloresCategoria[item.categoria as keyof typeof coloresCategoria]}`} style={{width:`${porcentajesTotales}%`}}></div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="font-semibold md:text-lg">${item.total}</p>
                                <p className="text-sky-300 md:text-lg ">{porcentajesTotales}%</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}