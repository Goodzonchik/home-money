import { useState } from 'react';
import Router from 'next/router';

import axios from 'axios';
import ProductAdd from './ProductAdd';
import Layout from './Layout';
import calcTotal from '../utils/calculation';
import uuid from '../utils/uuid';

const initReceipt = {
  id: uuid(),
  date: new Date().toString(),
  shop: '',
  products: [],
};

const initProduct = () => {
  return {
    id: uuid(),
    category: '',
    name: '',
    unit: '',
    cost: 0,
    count: 1,
  };
};

export default function ReceiptAdd({ categories, units }) {
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
    products.push(initProduct());
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

  function changeReceipt(event) {
    const innerReceipt = receipt;
    innerReceipt[event.target.name] = event.target.value;
    setReceipt({ ...innerReceipt });
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
            <label className='form-row__label'>Дата</label>
            <input
              className='form-row__field'
              type='date'
              name='date'
              value={receipt.date}
              onChange={changeReceipt}
            ></input>
          </div>
          <div className='form-row'>
            <label className='form-row__label'>Название магазина</label>
            <input
              className='form-row__field'
              value={receipt.shop}
              name='shop'
              onChange={changeReceipt}
            ></input>
          </div>
          {receipt.products.map((product) => (
            <ProductAdd
              key={product.id}
              categories={categories}
              units={units}
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
            <button className='button' onClick={save}>
              Сохранить
            </button>
            <button className='button' onClick={addProduct}>
              Добавить продукт
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}
