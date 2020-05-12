import Layout from '../../components/Layout';
import dateFormatter from '../../utils/formatters';

export default function Receipt({ data }) {
  return (
    <>
      <Layout title={'Главная'}>
        <h1>
          Чек от {dateFormatter(data.date)} из магазина "{data.shop}"
        </h1>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Название</td>
              <td>Количество</td>
              <td>Цена</td>
              <td>Стоимость</td>
            </tr>
          </thead>
          <tbody>
            {data.products.map((item, index) => (
              <tr key={item.id} className={'peceipt'}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{`${item.count} ${item.unit}.`}</td>
                <td>{item.cost}</td>
                <td>{(item.cost * item.count).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <strong>
                  <span>Итого: </span>
                  {data.products
                    .reduce(
                      (acc, product) => acc + product.cost * product.count,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </Layout>

      <style jsx>{`
        table {
          width: 100%;
        }

        td {
          border: 1px solid black;
        }
      `}</style>
    </>
  );
}

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

export async function getStaticPaths() {
  let paths = db.get('receipts').map('id').value();
  if (paths) {
    paths = paths.map((i) => {
      return { params: { id: i } };
    });
  } else {
    paths = null;
  }

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
