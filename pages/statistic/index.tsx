import Layout from '../../components/Layout';

import Tab from '../../components/Tab/Tab';
import CategoryStatistic from '../../components/Statistic/CategoryStatistic';
import ShopStatistic from '../../components/Statistic/ShopStatistic';
import uuid from '../../utils/uuid';
import { db } from '../../utils/db';

const getByCategory = (products: any[], category: string) => {
  return products
    .filter((product) => product.category === category)
    .reduce((acc, product) => acc + product.cost * product.count, 0)
    .toFixed(2);
};

export default function Statistic({ receipts, income, categories }) {
  let products = [];
  const preProducts = receipts.map((receipt) => receipt.products);

  for (let item of preProducts) {
    products = products.concat(...item);
  }

  const categoryList = categories
    .map((cat) => {
      return {
        id: uuid(),
        category: cat,
        value: getByCategory(products, cat),
      };
    })
    .sort((a, b) => b.value - a.value);

  const total = categoryList.reduce((acc, cat) => acc + +cat.value, 0);

  const tabContent = [
    {
      header: 'По категориям',
      content: (
        <CategoryStatistic
          categoryList={categoryList}
          total={total}
        ></CategoryStatistic>
      ),
    },
    {
      header: 'Статистика по чекам',
      content: receipts.map((item) => <div>{item.id}</div>),
    },
    {
      header: 'Статистика за период',
      content: <div>За период</div>,
    },
    {
      header: 'Статистика по магазину',
      content: <ShopStatistic receipts={receipts}></ShopStatistic>,
    },
    {
      header: 'Статистика по товару',
      content: <div>По товару</div>,
    },
    {
      header: 'Статистика по доходам',
      content: <div>По товару</div>,
    },
  ];

  return (
    <>
      <Layout title={'Статистика'}>
        <h1>Статистика</h1>
        <Tab items={tabContent}></Tab>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const receipts = db.get('receipts').value() || [];
  const income = db.get('income').value() || [];
  const categories = db.get('categories').value() || [];
  return {
    props: { receipts, income, categories },
  };
}
