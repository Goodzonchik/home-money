import { useState } from 'react';
import Router from 'next/router';

import * as uuid from 'uuid';

import axios from 'axios';
import ProductAdd from './ProductAdd';
import Layout from './Layout';
import calcTotal from '../utils/calculation';

const initReceipt = {
  id: uuid.v4(),
  date: new Date().toString(),
  shop: '',
  products: [],
};

export default function ReceiptAdd() {
  const [receipt, setReceipt] = useState(initReceipt);

  function save() {
    if (calcTotal(receipt.products) > 0)
      axios
        .post('api/add-receipt', receipt)
        .then(() => {
          Router.push(`/receipt/${receipt.id}`);
        })
        .catch(() => {
          alert('При сохранении произошла ошибка');
        });
  }

  function addProduct() {
    const products = receipt.products;
    products.push({
      id: uuid.v4(),
      category: '',
      name: '',
      unit: '',
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

  function removeProduct(id: string) {
    const products = receipt.products.filter((product) => product.id !== id);
    setReceipt({ ...receipt, products });
  }

  function changeShop(event) {
    setReceipt({ ...receipt, shop: event.target.value });
  }

  function changeDate(event) {
    setReceipt({ ...receipt, date: event.target.value });
  }

  function defaultSubmitHandler(event) {
    event.preventDefault();
  }

  return (
    <>
      <Layout title='Добавление чека'>
        <h1>Добавление чека</h1>

        <form onSubmit={defaultSubmitHandler}>
          <div className='form-row'>
            <label>Дата</label>
            <input
              type='date'
              value={receipt.date}
              onChange={changeDate}
            ></input>
          </div>
          <div className='form-row'>
            <label>Название магазина</label>
            <input value={receipt.shop} onChange={changeShop}></input>
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
            <strong>
              <span>Итого: {calcTotal(receipt.products)}</span>
            </strong>
          </div>
          <div
            style={{
              marginTop: '0.5em',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <button onClick={save}>Сохранить</button>
            <button onClick={addProduct}>Добавить продукт</button>
          </div>
        </form>
      </Layout>
    </>
  );
}
