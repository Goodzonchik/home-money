import Layout from '../components/Layout';

export default function Receipt() {
  const items = [
    'Статистика по чекам',
    'Статистика за период',
    'Статистика по магазину',
    'Статистика по товару',
    'Статистика по категории',
    'Сравнение цены на товар в разных магазинах',
  ];

  return (
    <Layout title={'Главная'}>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Layout>
  );
}
