    import { useTransactions } from "./useTransactions"
    import { useState } from "react"

    export const useStats = () => {

        const {transactions} = useTransactions()
        

        const [MesActivo,setMesActivo] = useState <"3M" | "6M" | "1Año"> ("6M")
        const mesActual = MesActivo === "3M" ? 3 : MesActivo === "6M" ? 6 : 12
        
        const mesfiltrado = (mes:number) =>{
        
            const hoy = new Date()
            const meses = new Date()
            meses.setMonth(hoy.getMonth() - mes)
        
            return transactions.filter(i => new Date(i.fecha) >= meses).reduce((acc,item) =>{

            const mes = item.fecha.slice(0,7)
            const existe = acc.find(t => t.mes === mes)
        
            if(existe){
                existe.total += item.amount
            }
            else{
                acc.push({mes, total:item.amount})
            }
            return acc
            }, [] as {mes: string , total: number} [])

        } 
        
        const mesesTotal= mesfiltrado(mesActual).reduce((acc,item) => acc+ item.total,0)
        
        const promedio = mesesTotal / mesfiltrado.length 

        const hoy = new Date()
        
        const totalMesAnterior = transactions.reduce((acc, item) => {
            const f = new Date(item.fecha)
            return f.getMonth() === hoy.getMonth() - 1 ? acc + item.amount : acc
        }, 0)
        
        const totalMesActual = transactions.reduce((acc, item) => {
            const f = new Date(item.fecha)
            return f.getMonth() === hoy.getMonth() ? acc + item.amount : acc
        }, 0)
        
        const variacion = totalMesAnterior !== 0
            ? ((totalMesActual - totalMesAnterior) / totalMesAnterior) * 100
            : 0

        const mesMasGastado = mesfiltrado(mesActual).length === 0 
            ? null 
                : mesfiltrado(mesActual).reduce((acc, item) => item.total > acc.total ? item : acc)            

        const mesAhorro = (mes:number) =>{

            const actual = new Date()
            const meses = new Date()
            meses.setMonth(actual.getMonth() - mes)


            return transactions.filter(i => new Date(i.fecha) >= meses).reduce((acc,item)=>{

                const fecha = item.fecha.slice(0,7)
                const existe = acc.find(i => i.fecha === fecha)

                if(existe){
                        
                if(item.transaccion === "ingreso"){
                    existe.ingreso += item.amount
                }

                else{
                    existe.gasto += item.amount
                }
                }else{
                    acc.push({fecha:mes.toString(), ingreso: item.transaccion === "ingreso" ? item.amount : 0
                    , gasto: item.transaccion === "gasto" ? item.amount : 0})
                }                
                return acc

                } ,[] as {fecha:string, gasto: number, ingreso: number}[])
            }       

        const mesMasAhorrado = mesAhorro(mesActual)

        const mesMasAhorradoFiltrado = mesMasAhorrado.length === 0 ? null : mesMasAhorrado.reduce((existe,actual)=> {

            const mesActual = actual.gasto - actual.ingreso
            const mesAnterior = existe.gasto - existe.ingreso

            return mesActual > mesAnterior ? actual : existe
        })


        const topCategorias = () => {

            const hoy = new Date()
            const fecha = new Date()
            fecha.setMonth(hoy.getMonth() - mesActual)

            const catogorias = transactions
            
            .filter(i => new Date(i.fecha) >= fecha )
            .reduce((existe,actual)=>{
                
                const existente = existe.find(item =>  item.categoriaTransaccion === actual.categoriaTransaccion) 
                
                if(existente){
                    existente.total += actual.amount
                }else{
                    existe.push({fecha: actual.fecha, categoriaTransaccion: actual.categoriaTransaccion, total : actual.amount})
                }
                
                return existe

            }, [] as {fecha: string, categoriaTransaccion: string, total : number}[])

            return catogorias.sort((a,b)=> b.total - a.total)
        }

        const topCategoriasTotal = topCategorias()

        const gastos = topCategoriasTotal.filter(
            item => item.categoriaTransaccion === "gasto"
        );

        const categoriaTop =
            gastos.length === 0
            ? null
            : gastos.reduce((existe, actual) =>
                actual.total > existe.total ? actual : existe
        );

        return {
            MesActivo,
            setMesActivo,
            mesesTotal,
            promedio,
            mesMasGastado,
            mesMasAhorradoFiltrado,
            categoriaTop,
            variacion,
        }
    }   