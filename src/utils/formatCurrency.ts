export const formatCurrency = (moneda:number) =>{

    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" ,compactDisplay: "short", notation: "compact",}).format(
    moneda
    )

}