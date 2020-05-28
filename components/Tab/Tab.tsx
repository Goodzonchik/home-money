import React, { useState, ReactNode } from 'react';
import TabHeader from './TabHeader';

export interface TabItem {
  header: string;
  content: ReactNode;
}

export default function Tab({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0);

  function setActiveTab(index: number) {
    setActive(index);
  }

  return (
    <div className='tab'>
      <TabHeader
        items={items}
        setActive={setActiveTab}
        activeIndex={active}
      ></TabHeader>
      <div className='tab__content'>{items[active].content}</div>
    </div>
  );
}
