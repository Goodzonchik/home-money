import { useState } from 'react';

import * as uuid from 'uuid';

import axios from 'axios';
import ProductAdd from './ProductAdd';
import Layout from './Layout';

const initReceipt = {
  id: uuid.v4(),
  date: new Date().toISOString(),
  shop: '',
  products: [],
};

export default function ReceiptAdd() {
  const [receipt, setReceipt] = useState(initReceipt);

  function save() {
    if (
      receipt.products.reduce(
        (acc, product) => acc + product.cost * product.count,
        0
      ) > 0
    )
      axios.post('api/add-receipt', receipt);
  }

  function addProduct() {
    const products = receipt.products;
    products.push({
      id: uuid.v4(),
      category: 'Еда',
      name: '',
      unit: 'Шт',
      cost: 0,
      count: 1,
    });
    setReceipt({ ...receipt, products });
  }

  function changeProduct(prod) {
    const products = receipt.products.map((product) =>
      product.id === prod.id ? prod : product
    );
    setReceipt({ ...receipt, products });
  }

  function removeProduct(id) {
    const products = receipt.products.filter((product) => product.id !== id);
    setReceipt({ ...receipt, products });
  }

  function changeShop(event) {
    setReceipt({ ...receipt, shop: event.target.value });
  }

  function changeDate(event) {
    setReceipt({ ...receipt, date: event.target.value });
  }

  return (
    <>
      <Layout title='Добавление чека'>
        <h1>Добавление чека</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Дата</label>
            <input value={receipt.date} onChange={changeDate}></input>
          </div>
          <div>
            <label>Название магазина</label>
            <input value={receipt.shop} onChange={changeShop}></input>
          </div>
          <div>
            <button onClick={addProduct}>Add product</button>
          </div>
          {receipt.products.map((product) => (
            <ProductAdd
              key={product.id}
              prod={product}
              change={changeProduct}
              remove={removeProduct}
            ></ProductAdd>
          ))}
          <div>
            <button onClick={save}>Save</button>
          </div>
        </form>
      </Layout>
    </>
  );
}
