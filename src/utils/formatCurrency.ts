export const formatCurrency = (moneda:number) =>{

    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
    moneda
    )

}