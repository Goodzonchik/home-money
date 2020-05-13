const calcTotal = (products: any[]) =>
  products
    .reduce((acc, product) => acc + product.cost * product.count, 0)
    .toFixed(2);
export default calcTotal;
