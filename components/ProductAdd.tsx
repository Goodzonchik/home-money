import { useState } from 'react';

export default function ProductAdd({
  change,
  remove,
  prod,
  categories,
  units,
}: {
  change: (product) => void;
  remove: (id: string) => void;
  prod: any;
  categories: string[];
  units: string[];
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
              <label className='form-row__label'>Название</label>
              <input
                name='name'
                className='form-row__field'
                value={product.name}
                onChange={changeItem}
              ></input>
            </div>
            <div className='form-row'>
              <label className='form-row__label'>Единицы измерения</label>
              <select
                name='unit'
                className='form-row__field'
                onChange={changeItem}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
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
                <div className='form-row double-mode'>
                  <label className='form-row__label'>Количество</label>
                  <input
                    name='count'
                    className='form-row__field'
                    value={product.count}
                    onChange={changeItem}
                  ></input>
                </div>
                <div className='form-row double-mode'>
                  <label className='form-row__label'>Цена</label>
                  <input
                    name='cost'
                    className='form-row__field'
                    value={product.cost}
                    onChange={changeItem}
                  ></input>
                </div>
              </div>
            </div>
            <div className='form-row'>
              <label className='form-row__label'>Категория</label>
              <select
                name='category'
                className='form-row__field'
                value={product.category}
                onChange={changeItem}
              >
                {categories.map((cat) => (
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
          <button className='button button_mode-alert' onClick={removeItem}>
            Удалить
          </button>
        </div>
      </div>
    </>
  );
}
