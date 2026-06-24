export type TransactionType = " " | "ingreso" | "gasto"


export const categories = [
    'comida','transporte','servicios','ocio','salud','ingreso','otro' 
] as const  

export type Category = typeof categories[number]

export interface Transaction {
    id:string,
    transaccion: TransactionType,
    categoriaTransaccion:Category,
    descripcion:string,
    amount:number
    fecha: string
}

export interface MonthSummary {
    ingresosTotales:number,
    gastosTotales:number,
    balance:number
}