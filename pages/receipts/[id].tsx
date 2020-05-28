import Layout from '../../components/Layout';
import dateFormatter from '../../utils/formatters';
import calcTotal from '../../utils/calculation';

export default function Receipt({ data }) {
  return (
    <>
      <Layout title={'Главная'}>
        <h1>
          Чек от {dateFormatter(data.date)} из магазина "{data.shop}"
        </h1>
        <table className='table'>
          <thead>
            <tr className='table__head-row'>
              <td>№</td>
              <td>Название</td>
              <td>Количество</td>
              <td>Цена</td>
              <td>Стоимость</td>
            </tr>
          </thead>
          <tbody>
            {data.products.map((item, index) => (
              <tr key={item.id} className='table__body-row'>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{`${item.count} ${item.unit}.`}</td>
                <td>{item.cost} руб.</td>
                <td>{(item.cost * item.count).toFixed(2)} руб.</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='table__foot-cell' colSpan={5}>
                <strong>
                  <span>Итого: </span>
                  {calcTotal(data.products)}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </Layout>
    </>
  );
}

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

export async function getStaticPaths() {
  let paths = db.get('receipts').map('id').value();
  paths = paths
    ? paths.map((i) => {
        return { params: { id: i } };
      })
    : null;
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = db.get('receipts').find({ id: params.id }).value();
  return {
    props: {
      data,
    },
  };
}
