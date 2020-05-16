import { useState } from 'react';

const categoryList = [
  'Еда',
  'Гигиена',
  'Автомобиль и транспорт',
  'Бытовые товары',
  'Здоровье',
  'Связь',
  'Подарки',
  'Животные',
  'Одежда и обувь',
  'Услуги ЖКХ',
  'Другое',
];

export default function ProductAdd({
  change,
  remove,
  prod,
}: {
  change: (product) => void;
  remove: (id: string) => void;
  prod: any;
}) {
  const [product, setProduct] = useState(prod);

  function removeItem() {
    remove(product.id);
  }

  function changeItem(event) {
    const innerProduct = product;
    innerProduct[event.target.name] = event.target.value;
    change(innerProduct);
  }

  return (
    <>
      <div className='product-container'>
        <div className='product-form'>
          <div className='product-form-group'>
            <div className='form-row'>
              <label>Название</label>
              <input
                name='name'
                value={product.name}
                onChange={changeItem}
              ></input>
            </div>
            <div className='form-row'>
              <label>Единицы измерения</label>
              <select name='unit' onChange={changeItem}>
                <option value={'Шт'}>Шт</option>
                <option value={'Л'}>Л</option>
                <option value={'Кг'}>Кг</option>
                <option value={'М'}>М</option>
              </select>
            </div>
          </div>
          <div className='product-form-group'>
            <div className='form-row'>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div className='form-row' style={{ margin: '0', width: '49%' }}>
                  <label>Количество</label>
                  <input
                    name='count'
                    value={product.count}
                    onChange={changeItem}
                  ></input>
                </div>
                <div className='form-row' style={{ margin: '0', width: '49%' }}>
                  <label>Цена</label>
                  <input
                    name='cost'
                    value={product.cost}
                    onChange={changeItem}
                  ></input>
                </div>
              </div>
            </div>
            <div className='form-row'>
              <label>Категория</label>
              <select
                name='category'
                value={product.category}
                onChange={changeItem}
              >
                {categoryList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='product-form-footer'>
          <div>
            <strong>
              <span>Итого: </span>
              {product.count * product.cost || 0}
            </strong>
          </div>
          <button className='remove-button' onClick={removeItem}>
            Удалить
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-container {
          margin: 0.5em 0;
          border: 1px solid #bdbdbd;
        }

        .product-form-group {
          width: 49%;
        }

        .product-form {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          padding: 1em;
        }

        .product-form-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          padding: 0 1em 1em 1em;
          align-items: baseline;
        }
      `}</style>
    </>
  );
}
