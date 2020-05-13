import { useState } from 'react';
import Router from 'next/router';

import * as uuid from 'uuid';
import axios from 'axios';

import Layout from './Layout';

const initIncome = {
  date: new Date().toISOString(),
  amount: 0,
  description: '',
};

export default function IncomeAdd() {
  const [income, setIncome] = useState(initIncome);

  function save() {
    if (income.date && income.amount && income.description)
      axios
        .post('api/add-income', { id: uuid.v4(), ...income })
        .then(() => {
          Router.push('/income');
        })
        .catch(() => {
          alert('При сохранении произошла ошибка');
        });
  }

  function changeDate(event) {
    setIncome({ ...income, date: event.target.value });
  }

  function changeDescription(event) {
    setIncome({ ...income, description: event.target.value });
  }

  function changeAmount(event) {
    setIncome({ ...income, amount: event.target.value });
  }

  return (
    <>
      <Layout title='Добавление дохода'>
        <h1>Добавление дохода</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Дата</label>
            <input value={income.date} onChange={changeDate}></input>
          </div>
          <div>
            <label>Сумма</label>
            <input value={income.amount} onChange={changeAmount}></input>
          </div>
          <div>
            <label>Описание</label>
            <input
              value={income.description}
              onChange={changeDescription}
            ></input>
          </div>
          <div>
            <button onClick={save}>Save</button>
          </div>
        </form>
      </Layout>
    </>
  );
}
