import Layout from '../components/Layout';

export default function Receipt() {
  const items = [
    'Статистика по чекам',
    'Статистика за период',
    'Статистика по магазину',
    'Статистика по товару',
    'Статистика по категории',
    'Сравнение цены на товар в разных магазинах',
    'Поправить генерацию новой страницы',
    'Добавить возможность редактирования чека и прихода',
    'Статистика по категориям. категория кликабельна и показывает на товары в рамках категории',
  ];

  return (
    <Layout title={'Главная'}>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </Layout>
  );
}
