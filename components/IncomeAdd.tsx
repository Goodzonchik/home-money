import React, { useState } from 'react';
import Router from 'next/router';

import axios from 'axios';

import Layout from './Layout';
import uuid from '../utils/uuid';

const initIncome = {
  date: '',
  amount: 0,
  description: '',
};

export default function IncomeAdd() {
  const [income, setIncome] = useState(initIncome);

  function save() {
    if (income.date && income.amount && income.description)
      axios
        .post('api/add-income', { id: uuid(), ...income })
        .then(() => {
          Router.push('/income');
        })
        .catch(() => {
          alert('При сохранении произошла ошибка');
        });
  }

  function changeIncome(event) {
    const newIncome = { ...income };
    newIncome[event.target.name] = event.target.value;
    setIncome(newIncome);
  }

  function defaultSubmitHandler(event) {
    event.preventDefault();
  }

  return (
    <Layout title='Добавление дохода'>
      <h1>Добавление дохода</h1>

      <form onSubmit={defaultSubmitHandler}>
        <div className='form-row'>
          <label className='form-row__label'>Дата</label>
          <input
            type='date'
            className='form-row__field'
            name='date'
            value={income.date}
            onChange={changeIncome}
          ></input>
        </div>
        <div className='form-row'>
          <label className='form-row__label'>Сумма</label>
          <input
            name='amount'
            className='form-row__field'
            value={income.amount}
            onChange={changeIncome}
          ></input>
        </div>
        <div className='form-row'>
          <label className='form-row__label'>Описание</label>
          <textarea
            name='description'
            className='form-row__field form-row__field_textarea'
            value={income.description}
            onChange={changeIncome}
          ></textarea>
        </div>
        <div>
          <button className='button' onClick={save}>
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
}
