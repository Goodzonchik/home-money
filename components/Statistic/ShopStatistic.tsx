import React from 'react';

export default function ShopStatistic({ receipts }) {
  const shops = [...new Set(receipts.map((receipt) => receipt.shop))];

  const shopList = shops.map((shop) => {
    return {
      shomName: shop,
      total: receipts.filter((reseipt) => reseipt.shop === shop),
    };
  });
  return (
    <div>
      {shopList.map((item) => (
        <div
          //key={item.shomName}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '0.5em 0px',
            alignItems: 'center',
            fontSize: '1.3em',
          }}
        >
          <div
            style={{
              width: '500px',
              border: '1px solid black',
              position: 'relative',
              height: '1em',
              marginRight: '0.5em',
            }}
          >
            <div
              style={{
                //  width: `${+item.value / (+total / 100)}%`,
                backgroundColor: '#54da00',
                position: 'absolute',
                height: '100%',
              }}
            ></div>
          </div>
          {item.shomName}: {JSON.stringify(item.total)}
        </div>
      ))}
    </div>
  );
}
