import { TabItem } from './Tab';

export default function TabHeader({
  items,
  activeIndex,
  setActive,
}: {
  items: TabItem[];
  activeIndex: number;
  setActive: (index: number) => void;
}) {
  return (
    <>
      <div className='tab__header'>
        {items.map((item, index) => (
          <div
            key={index}
            className={
              activeIndex === index
                ? 'tab__header-item tab__header-item_active'
                : 'tab__header-item'
            }
            onClick={() => {
              setActive(index);
            }}
          >
            {item.header}
          </div>
        ))}
      </div>
    </>
  );
}
