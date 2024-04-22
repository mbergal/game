export function currency(sum: number) {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(sum)
}
