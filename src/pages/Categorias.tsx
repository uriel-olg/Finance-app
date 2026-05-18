import { useTransactions } from "../hooks/useTransactions"



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

    return (   
        <div className="flex flex-col h-full justify-between p-5 pr-0 pl-0 text-white">
            <nav className="flex flex-row h-min justify-between items-center p-5 gap-10 md:p-10">
                <p className="w-min flex text-center text-lg md:text-2xl">Categorias</p>
                <button className="transition-all duration-200 hover:bg-emerald-600 active:scale-95 active:bg-emerald-500 border-3 border-emerald-600 w-max pr-4 pl-4 p-1 text-lg rounded-3xl  md:w-max md:h-min md:text-2xl md:pr-5 md:pl-5 md:p-1">+ categoria</button>
            </nav>
            <div className="flex flex-col h-full justify-center items-center ">
                {Filtrar.length === 0 ? <div className="flex items-center justify-center text-white m-auto text-3xl md:text-2xl"> no hay categorias</div> 
                : Filtrar.map((item) =>{
                    const porcentajesTotales = Math.round((item.total / gastosTotales)* 100)
                    return (
                        <div key={item.categoria}>
                        <p>categoria: {item.categoria}</p>
                        <p>{item.contador} transacciones</p>
                        <div className="w-full bg-bg-active rounded-full h-1">
                            <div style={{ width: `${porcentajesTotales}%` }} className="bg-mint h-1 rounded-full"></div>
                        </div>
                        <div>
                            <p>${item.total}</p>
                            <p>{porcentajesTotales}%</p>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}