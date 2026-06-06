import type {Transaction} from "../types/index"



export const calSummary = (transaccion:Transaction[]) =>{

    const ingresos = transaccion.filter(transaccionactual =>{
        return transaccionactual.transaccion === "ingreso"
    })

    const ingresosTotales = ingresos.reduce((acumulador, transaccionActual) => acumulador + transaccionActual.amount, 0)

    const gasto = transaccion.filter(transaccionactual =>{
        return transaccionactual.transaccion === "gasto"
    })

    const gastosTotales = gasto.reduce((acumulador, transaccionActual) => acumulador + transaccionActual.amount, 0)

    const balance = ingresosTotales - gastosTotales

    return {
        ingresosTotales,
        gastosTotales,
        balance
    }
}