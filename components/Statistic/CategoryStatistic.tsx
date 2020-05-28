import React from 'react';

export default function CategoryStatistic({ categoryList, total }) {
  return (
    <div>
      {categoryList.map((item) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '0.5em 0px',
            alignItems: 'center',
            fontSize: '1.3em',
          }}
          key={item.id}
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
                width: `${+item.value / (+total / 100)}%`,
                backgroundColor: '#54da00',
                position: 'absolute',
                height: '100%',
              }}
            ></div>
          </div>
          {item.category}: {item.value}
        </div>
      ))}
    </div>
  );
}
