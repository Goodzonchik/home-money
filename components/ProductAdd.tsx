import { useState } from 'react';

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
      <div className={'product-form'}>
        <label>Название</label>
        <input name='name' value={product.name} onChange={changeItem}></input>
        <br />
        <label>Единицы измерения</label>
        <select name='unit' onChange={changeItem}>
          <option value={'Шт'}>Шт</option>
          <option value={'Л'}>Л</option>
          <option value={'Кг'}>Кг</option>
          <option value={'М'}>М</option>
        </select>
        <br />
        <label>Количество</label>
        <input name='count' value={product.count} onChange={changeItem}></input>
        <label>Цена</label>
        <input name='cost' value={product.cost} onChange={changeItem}></input>
        <label>Итого</label>
        <strong>{product.count * product.cost || 0}</strong>
        <button onClick={removeItem}>Удалить</button>
      </div>

      <style jsx>{`
        .product-form {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          padding: 1em;
        }
      `}</style>
    </>
  );
}
