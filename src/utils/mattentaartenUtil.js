export const calculatePrijs = (order) => {
    if(order.amountOfZakjes < 0) return 0;
    const pricePerZakje = 6; 
    let totalPrice = order.amountOfZakjes * pricePerZakje;
    if (order.amountOfZakjes >= 3) {
        const numberOfDiscountedZakjes = Math.floor(order.amountOfZakjes / 3);
        const discountedPricePerZakje = pricePerZakje / 2;
        totalPrice -= numberOfDiscountedZakjes * discountedPricePerZakje;
    }
    return totalPrice;
}