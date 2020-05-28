import { useState, useEffect } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';
import dateFormatter from '../utils/formatters';

export default function Receipts(props) {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    setIncome(props.income);
  }, []);

  return (
    <>
      <Layout title={'Главная'}>
        <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
          Доходы <Link href={'/income-add'}>Добавить</Link>
        </h1>

        {income.length > 0 ? (
          <table className='table'>
            <thead>
              <tr className='table__head-row'>
                <td>Дата</td>
                <td>Сумма</td>
                <td>Описание</td>
              </tr>
            </thead>
            <tbody>
              {income.map((item) => (
                <tr key={item.id} className='table__body-row'>
                  <td>{dateFormatter(item.date)}</td>
                  <td>{item.amount} руб.</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>Нет записей, вы можете добавить новую запись</h3>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const low = require('lowdb');
  const FileSync = require('lowdb/adapters/FileSync');
  const adapter = new FileSync('db.json');
  const db = low(adapter);

  const data = db.get('income').value() || [];
  return {
    props: { income: data },
  };
}
