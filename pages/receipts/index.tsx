import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dateFormatter from '../../utils/formatters';
import calcTotal from '../../utils/calculation';

export default function Receipts(props) {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    setReceipts(props.receipts);
  }, []);

  return (
    <>
      <Layout title={'Главная'}>
        <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
          Покупки <Link href={'/receipt-add-container'}>Добавить</Link>
        </h1>

        {receipts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td>Дата</td>
                <td>Магазин</td>
                <td>Сумма</td>
                <td>#</td>
              </tr>
            </thead>
            <tbody>
              {receipts.map((item) => (
                <tr key={item.id} className={'peceipt'}>
                  <td>{dateFormatter(item.date)}</td>
                  <td>{item.shop}</td>
                  <td>{calcTotal(item.products)} руб.</td>
                  <td>
                    <Link href={`/receipts/${item.id}`}>Посмотреть</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>Нет записей, вы можете добавить новый чек</h3>
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

  const data = db.get('receipts').value() || [];
  return {
    props: { receipts: data },
  };
}
