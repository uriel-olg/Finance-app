export type TransactionType = " " | "ingreso" | "gasto"

export type Category =  'comida' | 'transporte' | 'servicios' | 'ocio' | 'salud' | 'ingreso' | 'otro' | string

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